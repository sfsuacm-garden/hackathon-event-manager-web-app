
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn/ui/tabs';
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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    const { data: profile, error: profileErr } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();
    if (profileErr) {
      router.replace('/dashboard');
      return;
    }
    const r = profile?.role as Role | undefined;
    router.replace(roleToPath(r));
  }

  function roleToPath(r?: Role) {
    switch (r) {
      case 'judge':
        return '/judge/apply';
      case 'mentor':
        return '/mentor/apply';
      case 'hacker':
        return '/apply';
      default:
        return '/dashboard';
    }
  }

  async function handlePasswordSignIn(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      await routeByProfileRole();
    } catch (err: any) {
      setError(err?.message || 'Authentication failed');
    } finally {
      setPending(false);
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {

          emailRedirectTo: `${window.location.origin}/(auth)/callback`,
          
          data: role ? { role } : undefined,
        },
      });
      if (error) throw error;
      setMessage('Magic link sent. Check email to finish signing in.');
    } catch (err: any) {
      setError(err?.message || 'Could not send magic link');
    } finally {
      setPending(false);
    }
  }

  async function handleSignUp(e: React.FormEvent) {
  e.preventDefault();
  setPending(true);
  setError(null);
  setMessage(null);

  try {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: role ? { role } : undefined,
      },
    });
    if (error) throw error;

    
    if (data.user?.id && role) {
      await supabase
        .from("profiles")
        .upsert(
          { id: data.user.id, email, full_name: "", role },
          { onConflict: "id" }
        );
    }

    
    if (data.session) {
      router.replace("/application");
    } else {
      // fallback in case session isn’t returned for some reason
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInErr) throw signInErr;
      router.replace("/application");
    }
  } catch (err: any) {
    setError(err?.message || "Signup failed");
  } finally {
    setPending(false);
  }
}

  return (
    <main className="mx-auto flex min-h-[80vh] w-full max-w-md items-center px-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Welcome to SF Hacks</CardTitle>
          <p className="text-sm text-muted-foreground">
            {role ? `Continuing as ${role}.` : 'Choose a role to personalize your portal.'}
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="magic">Magic Link</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>

            {/* Password login */}
            <TabsContent value="password" className="mt-6">
              <form onSubmit={handlePasswordSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-pass">Email</Label>
                  <Input
                    id="email-pass"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending ? 'Signing in…' : 'Sign in'}
                </Button>
              </form>
            </TabsContent>

            {/* Magic link login */}
            <TabsContent value="magic" className="mt-6">
              <form onSubmit={handleMagicLink} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-magic">Email</Label>
                  <Input
                    id="email-magic"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending ? 'Sending…' : 'Send magic link'}
                </Button>
                <p className="text-xs text-muted-foreground">
                  A one-time sign-in link will be sent to the email above.
                </p>
              </form>
            </TabsContent>

            {/* Email + password signup */}
            <TabsContent value="signup" className="mt-6">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-new">Password</Label>
                  <Input
                    id="password-new"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-confirm">Confirm password</Label>
                  <Input
                    id="password-confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={pending}>
                  {pending ? 'Creating…' : 'Create account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
          {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
        </CardContent>
      </Card>
    </main>
  );
}
