'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  ArrowRightIcon,
  Menu,
  Home,
  ShoppingCart,
  Package,
  Palette,
  Ruler,
  LayoutGrid,
  Settings
} from 'lucide-react';
import NavbarParent from '@/components/NavbarParent';
import Logo from '@/components/Logo';
import Barrier from '@/components/Barrier';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { buttonVariants } from '@/components/ui/button';
import EngravedNavbar from './EngravedNavbar';

const lists = [
  {
    name: 'Overview',
    path: '/dashboard',
    href: '/dashboard',
    icon: Home
  },
  {
    name: 'Orders',
    path: '/dashboard/orders',
    href: '/dashboard/orders?page=1',
    icon: ShoppingCart
  },
  {
    name: 'Products',
    path: '/dashboard/products',
    href: '/dashboard/products?page=1',
    icon: Package
  },
  {
    name: 'Colors',
    path: '/dashboard/colors',
    href: '/dashboard/colors?page=1',
    icon: Palette
  },
  {
    name: 'Sizes',
    path: '/dashboard/sizes',
    href: '/dashboard/sizes?page=1',
    icon: Ruler
  },
  {
    name: 'Categories',
    path: '/dashboard/categories',
    href: '/dashboard/categories?page=1',
    icon: LayoutGrid
  },
];

const NavListMobile = ({ pathname }: { pathname: string }) => {
  return (
    <div aria-hidden='true' className='lg:hidden'>
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
          className='flex flex-col space-y-4 bg-white/80 backdrop-blur-lg border border-white/20'
        >
          <SheetHeader>
            <ul className='flex flex-col items-start space-y-4'>
              {lists.map((list) => {
                const Icon = list.icon;
                const isOverview = list.name === 'Overview';
                const isActive =
                  pathname.startsWith(list.path) ||
                  (isOverview && pathname === '/dashboard');

                return (
                  <li key={list.name} className="w-full">
                    <Link
                      href={list.href}
                      className={cn(
                        'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200',
                        'hover:bg-white/30',
                        isActive ? 'bg-white/40 font-semibold' : 'font-normal'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{list.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SheetHeader>
          <SheetFooter className='!mt-0 !pt-0'>
            <Link
              className={buttonVariants({
                size: 'default',
                variant: 'default',
                className: 'w-full backdrop-blur-sm bg-white/80',
              })}
              href='/'
            >
              Home
              <ArrowRightIcon className='ml-1.5 h-5 w-5' />
            </Link>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full fixed top-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-xl border-b border-white/20" />
      <NavbarParent className="relative">
        <div className='flex items-center space-x-8'>
          <Logo />

          <ul className='hidden lg:flex items-center space-x-2'>
            {lists.map((list) => {
              const Icon = list.icon;
              const isOverview = list.name === 'Overview';
              const isActive =
                pathname.startsWith(list.path) ||
                (isOverview && pathname === '/dashboard');

              return (
                <li key={list.name}>
                  <Link
                    href={list.href}
                    className={cn(
                      'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200',
                      'hover:bg-white/30',
                      isActive ? 'bg-white/40 font-semibold' : 'font-normal'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{list.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className='flex items-center space-x-4'>
          <Link
            href='/dashboard/settings'
            className={cn(
              buttonVariants({
                size: 'sm',
                className: ' rounded-full px-5 backdrop-blur-sm border-slate-00 bg-gradient-to-b from-sky-200 to-slate-200 shadow-inner',
              })
            )}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Link>

          <Barrier />

          <Link
            href='/'
            className={cn(
              buttonVariants({
                size: 'sm',
                variant: 'ghost',
                className: 'hidden lg:inline-flex hover:bg-white/30',
              })
            )}
          >
            Home <ArrowRightIcon className='ml-1.5 h-5 w-5' />
          </Link>

          <NavListMobile pathname={pathname} />
        </div>
      </NavbarParent>
    </div>
  );
};

export default Navbar;