"use client"

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import VendorProduct from './VendorProduct'

interface Product {
  id: string
  title: string
  price: number
  averageRating: number
  images: { url: string }[]
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Vos Produits</h2>
          <p className="text-muted-foreground">Gérez vos produits et leurs disponibilités</p>
        </div>
        <Link href="/vendors/products/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className=" flex flex-col flex-wrap gap-4 sm:flex-row"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={item}>
            <VendorProduct
              name={product.title}
              price={product.price}
              rating={product.averageRating}
              imageUrl={product.images[0]?.url}
            />
          </motion.div>
        ))}
      </motion.div>

    </div>
  )
}
