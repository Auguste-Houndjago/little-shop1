"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export function useVendorNotifications(vendorId: string) {
  const [unreadCount, setUnreadCount] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    // Fetch initial unread count
    const fetchUnreadCount = async () => {
      const { count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact' })
        .eq('userId', vendorId)
        .eq('read', false);
      
      setUnreadCount(count || 0);
    };

    // Subscribe to new notifications
    const channel = supabase
      .channel('notifications')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'notifications',
        filter: `userId=eq.${vendorId}`,
      }, () => {
        fetchUnreadCount();
      })
      .subscribe();

    fetchUnreadCount();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [vendorId]);

  return { unreadCount };
} 