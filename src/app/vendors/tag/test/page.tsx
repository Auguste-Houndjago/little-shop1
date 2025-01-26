"use client"
import { useState, useEffect } from 'react'
import TagCreator from '../../components/TagCreator'
import { toast } from 'sonner'
import ProductTagManager from '../../components/ProductTagManager'

export default function TestTagPage() {
  const [tags, setTags] = useState<any[]>([])
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  const loadTags = async () => {
    try {
      const response = await fetch('/api/vendor/tags')
      if (!response.ok) throw new Error('Failed to fetch tags')
      const data = await response.json()
      setTags(data)
    } catch (error) {
      toast.error("Erreur lors du chargement des tags")
    }
  }

  useEffect(() => {
    loadTags()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="max-w-md">
        <h2 className="text-lg font-semibold mb-4">Créer un nouveau tag</h2>
        <TagCreator onSuccess={loadTags} />
      </div>

      <div className="max-w-md">
        <h2 className="text-lg font-semibold mb-4">Tester l'assignation de tags</h2>
        <input 
          type="text"
          placeholder="Entrez l'ID du produit"
          className="w-full p-2 border rounded mb-4"
          onChange={(e) => setSelectedProductId(e.target.value)}
        />
        {selectedProductId && (
          <ProductTagManager productId={selectedProductId} />
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Tags existants</h2>
        <div className="grid grid-cols-2 gap-4">
          {tags.map((tag) => (
            <div 
              key={tag.id} 
              className="p-4 border rounded-lg"
            >
              <p className="font-medium">{tag.name}</p>
              <p className="text-sm text-gray-500">{tag.category}</p>
              {tag.description && (
                <p className="text-sm mt-2">{tag.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 