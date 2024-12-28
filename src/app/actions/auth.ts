'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function signIn(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/')
}

export async function signUp(formData: FormData) {
 
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/confirm')
}

export async function logOut() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error.message }
  }

  redirect('/login')
}

export async function signOut() {
  const supabase = createClient();
  
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Invalider le cache pour forcer un rechargement des données
    revalidatePath('/', 'layout');
    
    // Rediriger vers la page de connexion
    redirect('/login');
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return { error: 'Failed to sign out' };
  }
}

// Exemple d'utilisation dans un composant form
export async function updateProfile(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient()

  const name = formData.get('name') as string
  const phone = formData.get('phone') as string

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase.auth.updateUser({
    data: { name, phone }
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/profile')
}