import GoogleSignInButton from '@/components/auth/Google';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, LogIn } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import SLogo from '@/components/ux/SLogo';

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if (session) {
  //   return redirect('/');
  // }

  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/');
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
    
        <h1 className="text-3xl font-bold">Connexion</h1>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className='flex justify-center'>
             <SLogo/>
         </CardTitle>
          
          <CardDescription className='bg-transparent border-2 rounded-md p-4 text-2xl font-bold text-black flex align-middle justify-center'>
         Smart - Shop
          </CardDescription>


        </CardHeader>
        <CardContent className="space-y-4">
          <form action={signIn} className="space-y-4">
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
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Mot de passe</Label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
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
              Se connecter
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continuer avec
              </span>
            </div>
          </div>

          <GoogleSignInButton />
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground text-center">
            Pas encore de compte ?{' '}
            <Link href="/signup" className="text-primary hover:underline">
              Créer un compte
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}