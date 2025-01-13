import React from 'react';

import { useRouter } from 'next/router';
import PageTransition from '@/components/welocome/WelcomeTransition';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="w-full h-full">
      {/* Navbar ou autres éléments fixes */}
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Mon Site de Commerce</h1>
      </header>

      {/* Transition entre les pages */}
      <PageTransition key={router.pathname}>
        <main className="min-h-screen">{children}</main>
      </PageTransition>

      {/* Footer ou autres éléments fixes */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; 2025 Mon Commerce. Tous droits réservés.
      </footer>
    </div>
  );
};

export default Layout;
