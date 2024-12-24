import { z } from 'zod';

export const saveProductValidation = z.object({
  title: z.string().min(1, { message: 'Title is required' }).max(100),
  price: z.string().min(1, { message: 'Price is required' }),
  categoryId: z.string().uuid({ message: 'Category is required' }),
  colorId: z.string().uuid({ message: 'Color is required' }),
  sizeId: z.string().uuid({ message: 'Size is required' }),
  isFeatured: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  whatsappNumber: z.string().optional(),
  whatsappMessage: z.string().optional(),
  localisation: z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string()
  }).optional(),
}).refine(({ price }) => {
  const parsedPrice = parseFloat(price);
  return !isNaN(parsedPrice);
}, {
  message: 'Price must be a number.',
  path: ['price']
});

export const updateProductValidation = z.object({
  id: z.string().uuid({ message: 'Invalid ID.' }),
  title: z.string().min(1, { message: 'Title is required' }).max(100),
  price: z.string().min(1, { message: 'Price is required' }),
  categoryId: z.string().uuid({ message: 'Category is required' }),
  colorId: z.string().uuid({ message: 'Color is required' }),
  sizeId: z.string().uuid({ message: 'Size is required' }),
  isFeatured: z.boolean().default(false),
  isArchived: z.boolean().default(false),
}).refine(({ price }) => {
  const parsedPrice = parseFloat(price);
  return !isNaN(parsedPrice);
}, {
  message: 'Price must be a number.',
  path: ['price']
});
