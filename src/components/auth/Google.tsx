'use client'

import { useAuth } from '@/contexts/AuthContext';
import React from 'react';
import { Button } from '../ui/button';
import { FcGoogle } from "react-icons/fc";

const GoogleSignInButton: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <Button
      onClick={signInWithGoogle}
      className=" px-4 py-2 rounded border-2 border-black/20 hover:border-[#2d79f36f] bg-primary/60 transition "
    >
      <FcGoogle className='h-4 w-4 absolute' />
       Google
    </Button>
  );
};

export default GoogleSignInButton;
