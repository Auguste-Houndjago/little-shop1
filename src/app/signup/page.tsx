import Link from 'next/link';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default async function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {data:{user}} = await supabase.auth.getUser();

  if (user?.email) {
    return redirect('/');
  }

  const signUp = async (formData: FormData) => {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const supabase = createClient();

    if (password !== confirmPassword) {
      return redirect('/signup?message=Passwords do not match');
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect('/signup?message=Could not authenticate user');
    }

    return redirect(
      `/confirm?message=Check email(${email}) to continue sign in process`
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6 bg-gray-50">
      <Button 
        variant="ghost" 
        className="absolute top-4 left-4"
        asChild
      >
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Link>
      </Button>

      <div className="flex flex-col items-center space-y-2">
        <UserPlus className="h-12 w-12 text-primary" />
        <h1 className="text-3xl font-bold">Créer un compte</h1>
        <p className="text-muted-foreground">
          Entrez vos informations pour créer votre compte
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Inscription</CardTitle>
          <CardDescription>
        <p> Remplissez le formulaire ci-dessous pour vous inscrire</p>   
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signUp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="vous@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            {searchParams?.message && (
              <Alert variant="destructive">
                <AlertDescription>
                  {searchParams.message}
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              S'inscrire
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Connectez-vous
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}