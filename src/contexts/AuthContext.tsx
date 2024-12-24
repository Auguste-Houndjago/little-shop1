'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import prisma from '@/lib/prisma';

const supabase = createClient();


interface UserMetadata {
  name?: string;
  phone?: string;
  avatar_url?: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signUp: (email: string, password: string, metadata?: UserMetadata) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: UserMetadata) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  error: null,
  signIn: async () => {},
  signInWithGoogle: async () => {},
  signInWithGitHub: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  updateProfile: async () => {},
  clearError: () => {},
});


// cree user via l'API
const createPrismaUser = async (user: User) => {
  // try {
  //   await fetch('/api/register', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ user }),
  //   });
  // } catch (error) {
  //   console.error('Failed to create Prisma user:', error);
  // }
};


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    error: null
  });


  useEffect(() => {
    const initializeAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setState((prev) => ({
        ...prev,
        user: data.session?.user || null,
        session: data.session || null,
        isLoading: false,
      }));
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_, session) => {
      setState((prev) => ({
        ...prev,
        user: session?.user || null,
        session: session || null,
      }));

      if (session?.user) {
        await createPrismaUser(session.user);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);




  const signIn = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      setState((prev) => ({
        ...prev,
        user: data.user,
        session: data.session,
        isLoading: false,
      }));
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        error: err.message || 'Sign-in failed',
        isLoading: false,
      }));
    }
  };

  const signInWithGoogle = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        error: err.message || 'Google sign-in failed',
        isLoading: false,
      }));
    }
  };



  // Sign Up + Prisma User Creation
  const signUp = async (email: string, password: string, metadata?: UserMetadata) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: metadata?.name,
            phone: metadata?.phone,
            avatar_url: metadata?.avatar_url
          }
        }
      });

      if (signUpError) throw signUpError;
      
   
      if (data.user) {
        await createPrismaUser(data.user);
      }

      setState(prev => ({
        ...prev,
        user: data.user,
        session: data.session,
        isLoading: false
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        error: err.message || 'Sign up failed',
        isLoading: false
      }));
      throw err;
    }
  };

  
  const signInWithGitHub = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
      if (error) throw error;
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        error: err.message || 'GitHub sign-in failed',
        isLoading: false,
      }));
    }
  };
 

 
  const signOut = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;

      setState({
        user: null,
        session: null,
        isLoading: false,
        error: null
      });
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        error: err.message || 'Sign out failed',
        isLoading: false
      }));
    }
  };

  const resetPassword = async (email: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`
      });

      if (error) throw error;

      setState(prev => ({ 
        ...prev, 
        isLoading: false 
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        error: err.message || 'Password reset failed',
        isLoading: false
      }));
    }
  };

  const updateProfile = async (data: UserMetadata) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      if (!state.user) throw new Error('No authenticated user');

      const { data: updateData, error } = await supabase.auth.updateUser({
        data: {
          name: data.name,
          phone: data.phone,
          avatar_url: data.avatar_url
        }
      });

      if (error) throw error;

      // Update user
      await prisma.user.update({
        where: { id: state.user.id },
        data: {
          name: data.name,
          phone: data.phone,
          avatar_url: data.avatar_url
        }
      });

      setState(prev => ({
        ...prev,
        user: updateData.user,
        isLoading: false
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        error: err.message || 'Profile update failed',
        isLoading: false
      }));
    }
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

 
  const contextValue = {
    ...state,
    signIn,
    signInWithGitHub,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    clearError,
    signInWithGoogle
    
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};