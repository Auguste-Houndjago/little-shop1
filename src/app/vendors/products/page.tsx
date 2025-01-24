import { createClient } from "@/utils/supabase/server"
import prisma from "@/lib/prisma"
import { getVendorProducts } from "../vendor"
import ProductGrid from "../ui/ProductGrid"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Archive, AlertCircle } from "lucide-react"



export default async function ProductsPage() {

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user?.id) {
    return null
  }

  const products = await getVendorProducts(user.id)
  const archivedProducts = await prisma.product.findMany({
    where: {
      userId: user.id,
      isArchived: true,
    },
    include: {
      images: true,
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  }).then(products => products.map(product => ({
    ...product,
    averageRating: product.reviews.length > 0
      ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
      : 0
  })))

  const lowStockProducts = products.filter(p => p.stock < 5)

  return (
    <div className="space-y-6 py-6">
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
          <TabsTrigger value="active" className="gap-2">
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline">Actifs</span>
          </TabsTrigger>
          <TabsTrigger value="archived" className="gap-2">
            <Archive className="w-4 h-4" />
            <span className="hidden sm:inline">Archivés</span>
          </TabsTrigger>
          <TabsTrigger value="low-stock" className="gap-2">
            <AlertCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Stock Bas</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <ProductGrid products={products} />
        </TabsContent>

        <TabsContent value="archived" className="mt-6">
          <ProductGrid products={archivedProducts} />
        </TabsContent>

        <TabsContent value="low-stock" className="mt-6">
          <ProductGrid products={lowStockProducts} />
        </TabsContent>
      </Tabs>


    </div>
  )
} 