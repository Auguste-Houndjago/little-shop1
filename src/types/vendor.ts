

export interface Vendor {
  id: string
  businessName: string
  businessLogo?: string
  description?: string
  banner?: string
  whatsappNumber: string
  dateOfBirth?: Date
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
  country:string
  region:string
  city:string
  user: User
  products: Product[]
}

export interface Address {
  id: string
  country?: string
  region?: string
  city?: string
  postalCode?: string
}

export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  phone?: string
}

export interface Product {
  id: string
  title: string
  description?: string
  price: number
  images: ProductImage[]
  category: {
    name: string
  }
  color: {
    name: string
    color: string
  }
  size: {
    name: string
    value: string
  }
}

export interface ProductImage {
  id: string
  url: string
}

