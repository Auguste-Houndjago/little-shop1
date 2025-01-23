'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

interface VendorProfile {
  id: string;
  businessName: string | null;
  businessLogo: string | null;
  description: string | null;
  whatsappNumber: string;
  isVerified: boolean;
}

interface VendorContextType {
  vendorProfile: VendorProfile | null;
  isLoading: boolean;
  refreshVendorProfile: () => Promise<void>;
}

const VendorContext = createContext<VendorContextType | undefined>(undefined);

export function VendorProvider({ children }: { children: React.ReactNode }) {
  const [vendorProfile, setVendorProfile] = useState<VendorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  const fetchVendorProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/vendors/profile', {
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch vendor profile');
      }

      const data = await response.json();
      setVendorProfile(data.vendorProfile);
    } catch (error) {
      console.error('Error fetching vendor profile:', error);
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorProfile();
  }, []);

  const refreshVendorProfile = async () => {
    await fetchVendorProfile();
  };

  return (
    <VendorContext.Provider value={{ vendorProfile, isLoading, refreshVendorProfile }}>
      {children}
    </VendorContext.Provider>
  );
}

export function useVendor() {
  const context = useContext(VendorContext);
  if (context === undefined) {
    throw new Error('useVendor must be used within a VendorProvider');
  }
  return context;
} 