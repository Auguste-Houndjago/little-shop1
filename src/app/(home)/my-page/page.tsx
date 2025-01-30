"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardTitle } from '@/components/ui/card';

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

import { Image, Product } from "@prisma/client";
import { ProductCard } from "../../dashboard/products/Product-Card";
import { OrderCard } from "../../dashboard/orders/order-card";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { WishCard } from "@/components/user/WishCard";
import SocialCard from "./Social";

interface Order {
  id: string;
  isPaid: boolean;
  total: number;
  createdAt: string;
  orderItems: Array<{
    id: string;
    amount: number;
    product: {
      title: string;
      images: Array<{
        url: string;
      }>;
    };
  }>;
};


interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  phone: string | null;
  roles: string[];
  createdAt: string;
  vendorProfile?: {
    businessName: string | null;
    description: string | null;
    whatsappNumber: string;
    address: string | null;
    isVerified: boolean;
  };
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface ProductWithImages extends Product {
  images: Image[];
}

export default function MyPage() {
  const { user, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [wishlist, setWishlist] = useState<ProductWithImages[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const [profileRes, wishlistRes, ordersRes] = await Promise.all([
          fetch("/api/user/profile"),
          fetch("/api/wishlist"),
          fetch("/api/orders"),
        ]);

        if (!profileRes.ok || !wishlistRes.ok || !ordersRes.ok)
          throw new Error("Failed to fetch data");

        const [profileData, wishlistData, ordersData] = await Promise.all([
          profileRes.json(),
          wishlistRes.json(),
          ordersRes.json(),
        ]);

        setUserProfile(profileData);
        setWishlist(wishlistData);
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container flex min-h-[600px] items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">Please sign in to view your account</h2>
            <Button asChild>
              <a href="/login">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      className="container py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Account</h1>
        <Button variant="outline" onClick={() => signOut()} className="gap-2">
          <LogOut size={16} />
          Sign Out
        </Button>
      </div>
      <SocialCard/>

      <Card>
        <CardTitle>

 
        </CardTitle>

      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User size={16} />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          {userProfile?.roles.includes("VENDOR") && (
            <TabsTrigger value="vendor">Vendor Profile</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardContent className="p-6">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-[200px]" />
                  <Skeleton className="h-8 w-[300px]" />
                  <Skeleton className="h-8 w-[250px]" />
                </div>
              ) : (
                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="flex items-center gap-4">
                    {userProfile?.avatar_url ? (
                      <img
                        src={userProfile.avatar_url}
                        alt={userProfile.name || "Profile"}
                        className="h-20 w-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
                        <User size={40} className="text-gray-500" />
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-semibold">{userProfile?.name || "No name set"}</h2>
                      <p className="text-gray-500">{userProfile?.email}</p>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p>{userProfile?.phone || "Pas de numero defini"}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Type de Compte</h3>
                      <p>{userProfile?.roles.join(", ")}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Membre depuis</h3>
                      <p>{new Date(userProfile?.createdAt || "").toLocaleDateString()}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendor">
          {userProfile?.vendorProfile && (
            <Card>
              <CardContent className="p-6">
                <motion.div variants={itemVariants} className="space-y-4">
                  <div>
                    <Link href={userProfile.vendorProfile ? "/vendors" : "#"}>
                      <h2 className="text-2xl font-semibold">
                        {userProfile.vendorProfile?.businessName || "Pas de boutique"}
                      </h2>
                    </Link>


                    {userProfile.vendorProfile.isVerified && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="font-medium">Description</h3>
                      <p>{userProfile.vendorProfile.description || "No description set"}</p>
                    </div>
                    <div>
                      <h3 className="font-medium flex "> <FaWhatsapp className="align-middle mt-1 mx-1" /> WhatsApp </h3>
                      <p>{userProfile.vendorProfile.whatsappNumber}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p>{userProfile.vendorProfile.address || "Pas d'address"}</p>
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="orders">
          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-[200px] w-full" />
              ))
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <motion.div key={order.id} variants={itemVariants}>
                  <OrderCard order={order} />
                </motion.div>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  No orders found
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="wishlist">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-[300px] w-full" />
              ))
            ) : wishlist.length > 0 ? (
              wishlist.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                <WishCard 
  product={product} 
  onRemoveFromWishlist={()=>{}} 
/>
                </motion.div>
              ))
            ) : (
              <Card className="col-span-full">
                <CardContent className="p-6 text-center text-gray-500">
                  No items in wishlist
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}