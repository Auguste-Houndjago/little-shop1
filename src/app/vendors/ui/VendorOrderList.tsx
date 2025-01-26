
'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface OrderItem {
  id: string;
  product: {
    title: string;
    images: Array<{ url: string }>;
  };
}

interface Order {
  id: string;
  total: number;
  createdAt: string;
  orderItems: OrderItem[];
  user: {
    name?: string;
    email: string;
  };
}

export default function VendorOrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/vendor/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store', // Ensure fresh data
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erreur lors de la récupération des commandes');
        }

        const data = await response.json();
        
        // Add some logging for debugging
        console.log('Fetched orders:', data);

        if (!Array.isArray(data)) {
          throw new Error('Les données reçues ne sont pas un tableau de commandes');
        }

        setOrders(data);
      } catch (error) {
        console.error('Erreur de récupération des commandes:', error);
        
        // More specific error handling
        if (error instanceof Error) {
          setError(error.message);
          toast.error(error.message);
        } else {
          setError('Une erreur inattendue est survenue');
          toast.error('Une erreur inattendue est survenue');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array means this runs once on mount

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        <span className="ml-2">Chargement des commandes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Erreur: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        Aucune commande pour le moment
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div 
          key={order.id} 
          className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            {order.orderItems[0]?.product?.images?.[0] && (
              <Image 
                src={order.orderItems[0].product.images[0].url} 
                alt={order.orderItems[0].product.title || 'Produit'}
                width={80} 
                height={80} 
                className="rounded-md object-cover"
              />
            )}
            <div>
              <h3 className="font-semibold">
                Commande #{order.id.slice(-6)}
              </h3>
              <p className="text-sm text-gray-500">
                Client: {order.user.name || order.user.email}
              </p>
              <p className="text-sm text-gray-500">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">
              Total: {order.total.toLocaleString()} €
            </Badge>
            <Button variant="outline">
              Détails
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}