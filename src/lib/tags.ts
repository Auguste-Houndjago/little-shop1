import {
    CheckCircle,
    DollarSign,
    Truck,
    Wrench,
    PackageOpen,
    MessagesSquare,
  } from 'lucide-react';
  import { TagCategory } from '@prisma/client';
  
  export const categoryIcons = {
    PRODUCT_QUALITY: CheckCircle,
    SHIPPING_SERVICE: Truck,
    CUSTOMER_SERVICE: MessagesSquare,
    PRICE_VALUE: DollarSign,
    AUTHENTICITY: PackageOpen,
    CUSTOM: Wrench,
  };
  
  export function getTagCategoryIcon(category: TagCategory) {
    return categoryIcons[category] || Wrench; 
  }