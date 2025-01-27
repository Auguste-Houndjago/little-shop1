import Image from "next/image"
import { Star, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface VendorProductProps {
  name: string
  price: number
  rating: number
  imageUrl: string
}

export default function VendorProduct({
  name = "Himalayan hood",
  price = 850.0,
  rating = 4.6,
  imageUrl = "https://images.thenorthface.com/is/image/TheNorthFace/NF0A4R2W_70M_hero",
}: VendorProductProps) {
  return (
    <Card className="relative w-48 border-1 border-secondary/20 h-48 group overflow-hidden rounded-3xl">
      <Image
        src={imageUrl || "/placeholder.svg"}
        alt={name}
        fill
        className="object-contain transition-transform group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

      <CardContent className="relative h-full p-4 flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-white">{rating}</span>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:text-pink-500 p-0">
            archiver
          </Button>
        </div>

        
        <div className="absolute bottom-0 left-0 right-0 rounded-3xl m-1 space-y-1 p-2 backdrop-blur-sm bg-white/10">
  <h3 className="font-medium text-white">{name}</h3>
  <p className="text-lg font-semibold text-white">${price.toFixed(2)}</p>
</div>
      </CardContent>
    </Card>
  )
}

