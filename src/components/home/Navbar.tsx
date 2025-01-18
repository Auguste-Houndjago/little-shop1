'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Urbanist } from 'next/font/google';

import { ArrowRight, ArrowRightIcon, Menu, Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import NavbarParent from '@/components/NavbarParent';
import Cart from '@/components/home/Cart';

import Barrier from '../Barrier';


import { User } from '@supabase/supabase-js';
import { useAuth } from '@/contexts/AuthContext';
import { ModeToggle } from '../ux/ModeToggle';
import { signOut } from '@/app/actions/auth';
import { Category } from '@prisma/client';
import Logo from '../Logo';



const urbanist = Urbanist({ subsets: ['latin'] });

const NavListMobile = ({
  pathname,
  user,
  lists,
}: {
  pathname: string;
  user: User | null;
  lists: Category[];
}) => {
  return (
    <div
      aria-hidden='true'
      className='lg:hidden'
    >
      <Sheet>
        <SheetTrigger
          className={buttonVariants({
            size: 'sm',
            variant: 'ghost',
          })}
        >
          <Menu className='w-5 h-5' /> 
        </SheetTrigger>
        <SheetContent
          side='top'
          className={cn(urbanist.className, 'flex flex-col space-y-4')}
        >
          <SheetHeader>

            <ul className='flex flex-col items-start space-y-4'>
              {lists.map((list) => (
                <li key={list.id}>
                  <Link
                    href={`/${encodeURIComponent(list.id)}`}
                    className={cn(
                      'text-zinc-900 tracking-tight text-sm capitalize',
                      pathname === `/${encodeURIComponent(list.id)}`
                        ? 'font-semibold'
                        : 'font-normal'
                    )}
                  >
                    {list.name}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetHeader>

          {user ? null : (
            <SheetFooter className='!mt-0 !pt-0'>

              <Link
                href='/login'
                className='text-zinc-900 tracking-wide'
              >
                Login
                <ArrowRightIcon className='ml-1.5 h-5 w-5' />
              </Link>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

const Navbar = ({
  user: initialUser,
  isAdmin: initialIsAdmin,
  lists,
  userIcon: initialUserIcon,

}: {
  user: User | null;
  isAdmin: boolean;
  lists: Category[];
  userIcon?: string | null;
}) => {
  const { user: authUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  
  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  useEffect(() => {
    if (authUser?.id !== initialUser?.id) {
      router.refresh();
    }
  }, [authUser, initialUser, router]);

  const isAuthenticated = Boolean(initialUser);

  return (
    <NavbarParent isSticky>
      <nav className='container flex items-center '>
        <div className='flex items-center lg:gap-16'>
      
         <Logo/>
          <ul className='hidden lg:flex items-center gap-8'>
            {lists.map((list) => (
              <li key={list.id}>
                <Link
                  href={`/${encodeURIComponent(list.id)}`}
                  className={cn(
                    'text-zinc-900 tracking-tight text-sm capitalize',
                    pathname === `/${encodeURIComponent(list.id)}`
                      ? 'font-semibold'
                      : 'font-normal'
                  )}
                >
                  {list.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex items-center gap-x-2  md:gap-4 ml-auto'>

          <ModeToggle />
          <Cart />
          <NavListMobile
            user={initialUser}
            lists={lists}
            pathname={pathname}
          />
          <Barrier/>
          {!isAuthenticated ? (
            <Link
              href='/login'
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'text-zinc-900'
              )}
            >
              Login
              <ArrowRight className='ml-1.5 h-5 w-5' />
            </Link>
          ) : (
            <DropdownMenu >
              <DropdownMenuTrigger  className='rounded-full ring-0'>
                {initialUser === undefined ? (
                  <Loader2 className="h-9 w-9 animate-spin text-muted-foreground" />
                ) : (
                  <img
                    src={initialUserIcon || '/Logo.svg'}
                    alt='user icon'
                    className='w-9 h-9 rounded-full hover:ring-4  transition-all'
                  />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                sideOffset={10}
                className={cn(urbanist.className, 'me-6 2xl:me-0')}
              >
                {initialIsAdmin ? (
                  <DropdownMenuItem>0
                    <Link
                      href='/dashboard'
                      className='w-full flex items-center'
                    >
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                ) : null}

                <DropdownMenuItem>
                  <Link
                    href='/profile'
                    className='w-full flex items-center'
                  >
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </NavbarParent>
  );
};

export default Navbar;
