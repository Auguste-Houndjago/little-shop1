'use client'

import { useAuth } from '@/contexts/AuthContext';
import React from 'react';


const GoogleSignInButton: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <button
      onClick={signInWithGoogle}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
