'use client'
import { createClient } from "@/utils/supabase/client";


export default function TestGoogle() {

    const supabase = createClient();
    const signInWithGoogle = async () => {
    

        try {
          const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
          if (error) throw error;
        } catch (err: any) {
            console.log(err.message || 'Google sign-in failed')
        }
      };
    
  return (
    <div>
        <button onClick={signInWithGoogle}>
sign in
        </button>
    </div>
  )
}
