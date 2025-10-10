'use client';

import { useEffect, useMemo, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/shadcn/ui/label';
import { Input } from '@/components/shadcn/ui/input';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/PhoneInput';

type Role = 'hacker' | 'judge' | 'mentor';
type Mode = 'signup' | 'login';

// Table name in one place
const PROFILE_TABLE = 'user_profiles';

// Enforce 18+ by this event date
const EVENT_CUTOFF_YMD = '2026-02-14';

function parseYMDToUTCDate(ymd: string): Date {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
}
function is18By(dobYMD: string, cutoffYMD = EVENT_CUTOFF_YMD): boolean {
  const dob = parseYMDToUTCDate(dobYMD);
  const cutoff = parseYMDToUTCDate(cutoffYMD);
  let age = cutoff.getUTCFullYear() - dob.getUTCFullYear();
  const monthDelta = cutoff.getUTCMonth() - dob.getUTCMonth();
  if (monthDelta < 0 || (monthDelta === 0 && cutoff.getUTCDate() < dob.getUTCDate())) age--;
  return age >= 18;
}
function todayYMD(): string {
  return new Date().toISOString().slice(0, 10);
}
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  try {
    return JSON.stringify(error);
  } catch {
    return 'Unknown error';
  }
}




function LoginPageInner() {
  const router = useRouter();
  const search = useSearchParams();
  const supabase = createClient();

  // Mode toggle: signup (collect more fields) vs login (email only)
  const [mode, setMode] = useState<Mode>('signup');

  const prefillEmail = search.get('email') || '';
  const [email, setEmail] = useState(prefillEmail);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Collected only in signup mode
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState(''); // YYYY-MM-DD

  const [otp, setOtp] = useState('');
  const [phase, setPhase] = useState<'request' | 'verify'>('request');

  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [role, setRole] = useState<Role | null>(null);

  // Read role from query or localStorage for routing after auth
  useEffect(() => {
    const fromQuery = (search.get('role') as Role | null) ?? null;
    if (fromQuery) {
      setRole(fromQuery);
      try {
        localStorage.setItem('pendingRole', fromQuery);
      } catch {
        // ignore
      }
      return;
    }
    try {
      const ls = localStorage.getItem('pendingRole') as Role | null;
      if (ls) setRole(ls);
    } catch {
      // ignore
    }
  }, [search]);

  function roleToPath(r?: Role) {
    switch (r) {
      case 'judge':
        return '/judge/application';
      case 'mentor':
        return '/mentor/application';
      case 'hacker':
        return '/application';
      default:
        return '/application';
    }
  }

  async function routeByAuthRole() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.replace('/application');
      return;
    }
    const metaRole = user.user_metadata?.role as Role | undefined;
    router.replace(roleToPath(metaRole));
  }

  // Send OTP (validations depend on mode)
  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setMessage(null);
    try {
      if (!email) throw new Error('Enter an email');

      if (mode === 'signup') {
        const first = firstName.trim();
        const last = lastName.trim();
        const pn = typeof phoneNumber === 'string' ? phoneNumber.trim() : '';
        const dobStr = dob.trim();

        if (!first) throw new Error('Enter first name');
        if (!last) throw new Error('Enter last name');
        if (!pn) throw new Error('Enter phone number');
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dobStr)) throw new Error('Enter date of birth (YYYY-MM-DD)');
        if (!is18By(dobStr)) throw new Error('I must be at least 18 by Feb 14, 2026');

        const fullName = `${first} ${last}`;
        const { error: sendErr } = await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: true, // create new account if missing
            data: {
              first_name: first,
              last_name: last,
              full_name: fullName,
              phone_number: pn,
              dob: dobStr,
              ...(role ? { role } : {}),
            },
          },
        });
        if (sendErr) throw sendErr;
      } else {
        // LOGIN mode: email only; do not create a new user
        const { error: sendErr } = await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: false,
          },
        });
        if (sendErr) throw sendErr;
      }

      setMessage('A 6-digit code was emailed. Enter it below.');
      setPhase('verify');
    } catch (err: unknown) {
      setError(getErrorMessage(err) || 'Could not send code');
    } finally {
      setPending(false);
    }
  }

  // Verify OTP (in signup mode we upsert profile + metadata; in login we just route)
  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setMessage(null);
    try {
      if (!otp || otp.length < 6) throw new Error('Enter the 6-digit code');

      const { data: verifyData, error: verifyErr } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });
      if (verifyErr) throw verifyErr;

      const userId = verifyData.user?.id;

      if (mode === 'signup' && userId) {
        const first = firstName.trim();
        const last = lastName.trim();
        const fullName = `${first} ${last}`;
        const pn = typeof phoneNumber === 'string' ? phoneNumber.trim() : '';
        const dobStr = dob.trim();

        // Persist profile fields
        const { error: upErr } = await supabase
          .from(PROFILE_TABLE)
          .upsert(
            {
              id: userId,
              first_name: first,
              last_name: last,
              phone_number: pn,
              dob: dobStr,
            },
            { onConflict: 'id' }
          );
        if (upErr) setError(`Profile save failed: ${upErr.message}`);

        // Keep auth metadata aligned (optional but handy)
        const { error: metaErr } = await supabase.auth.updateUser({
          data: {
            ...(role ? { role } : {}),
            first_name: first,
            last_name: last,
            full_name: fullName,
            phone_number: pn,
            dob: dobStr,
          },
        });
        if (metaErr) setMessage(`Signed in, but profile metadata update failed: ${metaErr.message}`);
      }

      await routeByAuthRole();
    } catch (err: unknown) {
      setError(getErrorMessage(err) || 'Verification failed');
    } finally {
      setPending(false);
    }
  }

  async function handleResend() {
    setPending(true);
    setError(null);
    setMessage(null);
    try {
      if (!email) throw new Error('Enter an email');

      if (mode === 'signup') {
        const first = firstName.trim();
        const last = lastName.trim();
        const pn = typeof phoneNumber === 'string' ? phoneNumber.trim() : '';
        const dobStr = dob.trim();
        const fullName = `${first} ${last}`;

        const { error: resendErr } = await supabase.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: true,
            data: {
              first_name: first,
              last_name: last,
              full_name: fullName,
              phone_number: pn,
              dob: dobStr,
              ...(role ? { role } : {}),
            },
          },
        });
        if (resendErr) throw resendErr;
      } else {
        const { error: resendErr } = await supabase.auth.signInWithOtp({
          email,
          options: { shouldCreateUser: false },
        });
        if (resendErr) throw resendErr;
      }

      setMessage('A new code was sent.');
    } catch (err: unknown) {
      setError(getErrorMessage(err) || 'Could not resend code');
    } finally {
      setPending(false);
    }
  }

  const titleByPhase = useMemo(() => {
    if (phase === 'verify') return 'Enter the code';
    return mode === 'signup' ? 'Create account' : 'Sign in';
  }, [phase, mode]);

  const oppositeModeLabel = mode === 'signup' ? 'Sign in instead' : 'Create an account';
  const switchTo = mode === 'signup' ? 'login' : 'signup';

  function switchMode(next: Mode) {
    setMode(next);
    setPhase('request'); // go back to first step if switching during verify
    setMessage(null);
    setError(null);
  }

  return (
    <main className="mx-auto flex min-h-[80vh] w-full max-w-md items-center px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{titleByPhase}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {role ? `Continuing as ${role}.` : 'Choose a role to personalize the portal.'}
          </p>
        </CardHeader>
        <CardContent>
          {phase === 'request' ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              {mode === 'signup' ? (
                <>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input
                        id="first-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        autoComplete="given-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input
                        id="last-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        autoComplete="family-name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <PhoneInput
                      value={phoneNumber}
                      onChange={(val: string) => setPhoneNumber(typeof val === 'string' ? val : '')}
                      defaultCountry="US"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      max={todayYMD()}
                      min="1900-01-01"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Must be at least 18 by Feb 14, 2026.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? 'Sending…' : mode === 'signup' ? 'Create account & send code' : 'Send sign-in code'}
              </Button>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => switchMode(switchTo as Mode)}
                  className="text-xs underline underline-offset-2 text-muted-foreground"
                  disabled={pending}
                >
                  {oppositeModeLabel}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">6-digit code</Label>
                <Input
                  id="otp"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    const next = e.target.value.replace(/\D/g, '').slice(0, 6);
                    setOtp(next);
                  }}
                  className="text-center font-mono tracking-[0.5em]"
                  placeholder="••••••"
                />
              </div>

              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? 'Verifying…' : mode === 'signup' ? 'Verify & finish sign-up' : 'Verify & sign in'}
              </Button>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <button
                  type="button"
                  onClick={() => setPhase('request')}
                  className="underline underline-offset-2"
                  disabled={pending}
                >
                  Edit {mode === 'signup' ? 'details' : 'email'}
                </button>
                <button
                  type="button"
                  onClick={handleResend}
                  className="underline underline-offset-2"
                  disabled={pending}
                >
                  Resend code
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => switchMode(switchTo as Mode)}
                  className="text-xs underline underline-offset-2 text-muted-foreground"
                  disabled={pending}
                >
                  {oppositeModeLabel}
                </button>
              </div>
            </form>
          )}

          {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
          {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
        </CardContent>
      </Card>
    </main>
  );
}

export default function LoginPage(){
  return (
    <Suspense fallback = {<main className="mx-auto w-full max-w-md p-6 text-sm text-muted-foreground">Loading…</main>}>
      <LoginPageInner />
    </Suspense>



  )
}
