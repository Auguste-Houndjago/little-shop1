import { HeroProduct } from "@/components/home/ProductHero"
import { Product } from "@/types/vendor"


export function ProductGrid({ products }:{products:Product[]}) {
  return (


<div className="grid grid-cols-2 my-8 sm:grid-cols-3 md:grid-cols-3 gap-6">
{products && products.map((product) => (
  <HeroProduct key={product.id} product={product} />
))}
</div>
  )
}

