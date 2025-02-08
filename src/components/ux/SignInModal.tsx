"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import GoogleSignInButton from "@/components/auth/Google";
import SLogo from "@/components/ux/SLogo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";


export default function SignInModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Échec de l'authentification. Vérifiez vos identifiants.");
      return;
    }

    router.push("/");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">login</Button>
      </DialogTrigger>
      <DialogContent className="w-96 rounded-md bg-background/80">
        <div className="flex flex-col items-center px-10 gap-2">
          <div
            className="flex size-8 md:size-10 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <SLogo />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Smart Shop</DialogTitle>
            <DialogDescription className="sm:text-center">
              Connectez-vous à votre compte pour continuer.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                placeholder="vous@example.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </form>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          <span className="text-xs text-muted-foreground">Ou continuer avec</span>
        </div>

        <GoogleSignInButton />

        <p className="text-center text-xs text-muted-foreground">
          Pas encore de compte ?{" "}
          <a className="underline hover:no-underline" href="/signup">
            Créer un compte
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
