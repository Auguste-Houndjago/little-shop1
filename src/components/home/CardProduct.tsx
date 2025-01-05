'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Recursive } from 'next/font/google';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { cn, formatPrice, addItemToStorage } from '@/lib/utils';

import type { ProductFeatured } from '@/app/(home)/page';

import useTriggerUseEffect from '@/hooks/useTriggerUseEffect';
import { ProductModal } from '@/components/products/ProductModal';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

const recursive = Recursive({ subsets: ['latin'] });

export interface ProductStorage {
	product: ProductFeatured;
	amount: number;
	total: number;
}

const CardProduct = ({ product }: { product: ProductFeatured }) => {
	const [isPending, startTransition] = React.useTransition();
	const { setTriggerUseEffect } = useTriggerUseEffect();

	return (
		<Card className='group h-fit'>
			<CardHeader className='p-2'>
				<div className='relative'>
					<Image
						src={product.images[0].url}
						alt='product img'
						width={300}
						height={260}
						className='w-full h-[260px] object-cover rounded-lg'
						priority
					/>

					<div className='absolute hidden inset-0 group-hover:lg:flex items-end justify-center pb-5 px-5'>
						<Button
							className={cn(
								recursive.className,
								'tracking-[.1rem] rounded-sm w-full'
							)}
							disabled={isPending}
							isLoading={isPending}
							loadingText='Adding to cart'
							onClick={() =>
								addItemToStorage(product, startTransition, setTriggerUseEffect)
							}
						>
							Ajouter au panier
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className='p-2'>
				<CardContent className='flex gap-x-2 justify-between'>
					<Link
						href={`/p/${product.id}`}
						className='hover:underline'
					>
						<CardTitle className='text-xl'>{product.title}</CardTitle>
					</Link>
					<ProductModal 
						product={{
							name: product.title,
							description: product?.description || '',
							price: product.price,
							images: product.images.map(img => img.url),
							category: product.category.name,
							localisation: product.localisation ? (product.localisation as unknown as Location) : undefined,
						}}
					/>
				</CardContent>
	
				<CardDescription className='capitalize'>
					{product.category.name}
				</CardDescription>
			</CardContent>
			<CardFooter className='p-2'>
				<CardTitle className='text-lg'>{formatPrice(product.price)}</CardTitle>
			</CardFooter>
		</Card>
	);
};

export default CardProduct;
