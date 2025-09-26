'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/shadcn/ui/label';
import { Input } from '@/components/shadcn/ui/input';
import { Button } from '@/components/ui/button';

type Role = 'hacker' | 'judge' | 'mentor';

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const supabase = createClient();

  const prefillEmail = search.get('email') || '';
  const [email, setEmail] = useState(prefillEmail);
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [phase, setPhase] = useState<'request' | 'verify'>('request');

  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [role, setRole] = useState<Role | null>(null);
  useEffect(() => {
    const fromQuery = (search.get('role') as Role | null) ?? null;
    if (fromQuery) {
      setRole(fromQuery);
      try {
        localStorage.setItem('pendingRole', fromQuery);
      } catch {}
      return;
    }
    try {
      const ls = localStorage.getItem('pendingRole') as Role | null;
      if (ls) setRole(ls);
    } catch {}
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
        return '/dashboard';
    }
  }

  async function routeByProfileRole() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.replace('/dashboard');
      return;
    }
    const metaRole = user.user_metadata?.role as Role | undefined;
    if (metaRole) {
      router.replace(roleToPath(metaRole));
      return;
    }
    const { data: profile } = await supabase
      .from('profiles') // change to 'user_profiles' if needed
      .select('role')
      .eq('id', user.id)
      .maybeSingle();
    const r = (profile?.role as Role | undefined) ?? undefined;
    router.replace(roleToPath(r));
  }

 
  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setMessage(null);
    try {
      if (!email) throw new Error('Enter an email');
      if (!fullName.trim()) throw new Error('Enter full name');

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          data: { full_name: fullName, ...(role ? { role } : {}) },
         
        },
      });
      if (error) throw error;

      setMessage('A 6-digit code was emailed. Enter it below.');
      setPhase('verify');
    } catch (err: any) {
      setError(err?.message || 'Could not send code');
    } finally {
      setPending(false);
    }
  }

  // verify the OTP, upsert profile, then route
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
        type: 'email', // email OTP verification
      });
      if (verifyErr) throw verifyErr;

      const userId = verifyData.user?.id;
      if (userId) {
        const { error: upErr } = await supabase
          .from('user_profiles') 
          .upsert(
            {
              id: userId,
              email,
              full_name: fullName,
              ...(role ? { role } : {}),
            },
            { onConflict: 'id' }
          );
        if (upErr) {
          
          
          console.warn('Profile upsert failed:', upErr.message);
        }
      }

      if (role) {
        await supabase.auth.updateUser({ data: { role } });
      }

      await routeByProfileRole();
    } catch (err: any) {
      setError(err?.message || 'Verification failed');
    } finally {
      setPending(false);
    }
  }

  // I resend a 6-digit email OTP (still no redirect)
  async function handleResend() {
    setPending(true);
    setError(null);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          data: { full_name: fullName, ...(role ? { role } : {}) },
          // no emailRedirectTo here
        },
      });
      if (error) throw error;
      setMessage('A new code was sent.');
    } catch (err: any) {
      setError(err?.message || 'Could not resend code');
    } finally {
      setPending(false);
    }
  }

  const titleByPhase = useMemo(
    () => (phase === 'request' ? 'Sign in or Create account' : 'Enter the code'),
    [phase]
  );

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
              <div className="space-y-2">
                <Label htmlFor="full-name">Full name</Label>
                <Input
                  id="full-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  autoComplete="name"
                />
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
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? 'Sending…' : 'Send code'}
              </Button>
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
                {pending ? 'Verifying…' : 'Verify and continue'}
              </Button>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <button
                  type="button"
                  onClick={() => setPhase('request')}
                  className="underline underline-offset-2"
                  disabled={pending}
                >
                  Edit email or name
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
            </form>
          )}

          {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
          {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
        </CardContent>
      </Card>
    </main>
  );
}
