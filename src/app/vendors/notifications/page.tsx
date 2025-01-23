import { createClient } from '@/utils/supabase/server';
import prisma from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Bell, Package, Star, ShoppingBag } from 'lucide-react';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'ORDER_STATUS': return ShoppingBag;
    case 'REVIEW': return Star;
    case 'PRODUCT_UPDATE': return Package;
    default: return Bell;
  }
};

const Page = async () => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.id) return null;

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = getNotificationIcon(notification.type);
          return (
            <div
              key={notification.id}
              className={`
                relative overflow-hidden rounded-xl backdrop-blur-md 
                ${notification.read ? 'bg-white/20' : 'bg-white/30'} 
                border border-white/20 shadow-sm p-4
              `}
            >
              <div className="flex items-start gap-4">
                <div className={`
                  p-2 rounded-full 
                  ${notification.read ? 'bg-gray-100' : 'bg-rose-100'}
                `}>
                  <Icon className={`
                    w-5 h-5 
                    ${notification.read ? 'text-gray-600' : 'text-rose-600'}
                  `} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDistanceToNow(notification.createdAt, { 
                      addSuffix: true,
                      locale: fr 
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page; 