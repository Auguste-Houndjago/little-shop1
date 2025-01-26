// src/components/home/CollectionsSection.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const collectionsData = [
  {
    id: 1,
    title: 'Sac Élégant',
    description: 'Collection légère et elegante',
    image: '/images/bag2.png',
    backgroundColor: 'bg-yellow-50'
  },
  {
    id: 2,
    title: 'Robes Chic',
    description: 'Style moderne ',
    image: '/images/clothing.png',
    backgroundColor: 'bg-gray-100'
  },
  {
    id: 3,
    title: 'Chaussure de luxe',
    description: 'Avec une texture elegante',
    image:     '/images/shoes.png',
    backgroundColor: 'bg-green-50'
  }
]

export default function CollectionsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 my-2 gap-6">
      {collectionsData.map((collection) => (
        <motion.div 
          key={collection.id}
          className={`rounded-lg overflow-hidden shadow-lg p-2 ${collection.backgroundColor}`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative h-64 w-full">
            <Image 
              src={collection.image} 
              alt={collection.title} 
              fill 
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{collection.title}</h3>
            <p className="text-gray-600">{collection.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}