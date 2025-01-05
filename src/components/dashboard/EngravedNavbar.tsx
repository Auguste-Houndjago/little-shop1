'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

const EngravedNavbar = () => {
  // Style de base pour l'effet gravé
  const engravedLinkStyle = cn(
    'relative overflow-hidden group',
    'rounded-xl px-5 py-2',
    // Effet de base creusé
    'bg-white/80 backdrop-blur-md',
    'border border-white/20',
    // Ombre intérieure pour l'effet creusé
    'shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]',
    // Dégradé subtil
    'bg-gradient-to-b from-white/50 to-transparent',
    // État hover
    'hover:shadow-[inset_0_3px_6px_rgba(0,0,0,0.15)]',
    'hover:from-white/60 hover:to-transparent',
    // État actif (pressed)
    'active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.2)]',
    'active:from-white/70 active:to-transparent',
    // Transition
    'transition-all duration-200',
    'hover:bg-primary/50'
  );

  // Style pour l'icône
  const iconStyle = cn(
    'w-4 h-4 mr-2',
    'transition-transform duration-200',
    'group-hover:scale-105',
    'group-active:scale-95'
  );

  // Style pour le texte
  const textStyle = cn(
    'relative',
    'font-medium text-black',
    'text-shadow-[0_1px_1px_rgba(255,255,255,0.5)]'
  );

  return (
    <div className="p-4 bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-xl">
      <Link
        href='/dashboard/settings'
        className={cn(
          buttonVariants({
            size: 'sm',
            className: engravedLinkStyle,
          })
        )}
      >
        <div className="flex items-center justify-center">
          <Settings className={iconStyle} />
          <span className={textStyle}>Settings</span>
        </div>
      </Link>
    </div>
  );
};

export default EngravedNavbar;