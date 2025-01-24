"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from 'sonner'

export default function TagCreator() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('CUSTOM')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/vendor/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          category,
          description,
        }),
      })

      if (!response.ok) throw new Error('Failed to create tag')

      toast.success('Tag créé avec succès')
      setName('')
      setDescription('')
      setCategory('CUSTOM')
    } catch (error) {
      console.error('Error creating tag:', error)
      toast.error('Erreur lors de la création du tag')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Nom du tag"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PRODUCT_QUALITY">Qualité du produit</SelectItem>
            <SelectItem value="SHIPPING_SERVICE">Service de livraison</SelectItem>
            <SelectItem value="CUSTOMER_SERVICE">Service client</SelectItem>
            <SelectItem value="PRICE_VALUE">Rapport qualité-prix</SelectItem>
            <SelectItem value="AUTHENTICITY">Authenticité</SelectItem>
            <SelectItem value="CUSTOM">Personnalisé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Input
          placeholder="Description (optionnel)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Création...' : 'Créer le tag'}
      </Button>
    </form>
  )
} 