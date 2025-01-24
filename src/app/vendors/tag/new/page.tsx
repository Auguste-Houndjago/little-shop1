"use client"
import { useSearchParams } from 'next/navigation'

import { useRouter } from 'next/navigation'
import ProductTagManager from '../../components/ProductTagManager'
import TagCreator from '../../components/TagCreator'


export default function TagManagerPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

const handleManageTags = (productId: string) => {
  router.push(`/vendors/tag?productId=${productId}`)
}

  const productId = searchParams.get('productId')

  if (!productId) {
    return <div className="p-4">Produit non trouvé</div>
  }

  return (
    <div className="max-w-md mx-auto p-6">
    <h1 className="text-2xl font-bold mb-6">Créer un nouveau tag</h1>
    <TagCreator />
  </div>
  )
}
