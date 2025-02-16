
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { DollarSign, PackageSearch, Weight } from 'lucide-react';

import { formatPrice } from '@/lib/utils';
import prisma from '@/lib/prisma';
import { getVendorProducts } from './vendor';
import VendorProduct from './ui/VendorProduct';
import { createClient } from '@/utils/supabase/server';



const Page = async () => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.id) {
    return null;
  }

  

  // Fetch vendor stats
  const activeListings = await prisma.product.count({
    where: {
      userId: user.id,
      isArchived: false,
      images: {
        some: {},
      },
    },
  });

  // Get all orders containing products from this vendor
  const orderItems = await prisma.orderItem.findMany({
    where: {
      product: {
        userId: user.id,
      },
      order: {
        isPaid: true,
      },
    },
    include: {
      order: true,
    },
  });

  // Calculate total sales (number of orders)
  const sales = new Set(orderItems.map(item => item.orderId)).size;

  // Calculate total revenue from all order items
  const totalRevenue = orderItems.reduce((total, item) => total + item.amount, 0);

  // Fetch vendor products
  const products = await getVendorProducts(user.id);


  return (
    <div className="space-y-6">
      {/* Stats Overview */}


      <div className="grid grid-cols-3 my-2 gap-2 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm hidden md:inline font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-base md:text-2xl font-bold">{formatPrice(totalRevenue)}</div>
          </CardContent> 
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm hidden md:inline  font-medium">Products</CardTitle>
            <PackageSearch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-base md:text-2xl font-bold">{activeListings}</div>
          </CardContent>
        </Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="text-sm hidden md:inline  font-medium">Total Sales</CardTitle>
						<Weight className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-base md:text-2xl font-bold">{sales}</div>
					</CardContent>
				</Card>
			</div>

      {/* Products Grid */}
      <div className="p-0 m-0">
        <h2 className="text-xl font-semibold mb-4">Vos Produits</h2>
        <div className="flex justify-center flex-wrap md:gap-6 gap-0 ">
          {products.map((product) => (
            <VendorProduct
              key={product.id}
              name={product.title}
              price={product.price}
              rating={product.averageRating}
              imageUrl={product.images[0]?.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
