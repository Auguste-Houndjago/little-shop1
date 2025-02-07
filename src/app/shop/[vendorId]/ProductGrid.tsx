import { HeroProduct } from "@/components/home/ProductHero"
import { Product } from "@/types/vendor"
import Image from "next/image"
import Link from "next/link"

export function ProductGrid({ products }:{products:Product[]}) {
  return (


<div className="grid grid-cols-1 my-8 sm:grid-cols-2 md:grid-cols-3 gap-6">
{products && products.map((product) => (
  <HeroProduct key={product.id} product={product} />
))}
</div>
  )
}

