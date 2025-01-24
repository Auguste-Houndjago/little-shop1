import React from 'react';

import CardProduct from '@/components/home/CardProduct';
import HeadingTitle from '@/components/home/HeadingTitle';
import Billboard from '@/components/home/Billboard';

import type { Color, Image, Product, Size } from '@prisma/client';
import { createClient } from '@/utils/supabase/server';
import { fetchFeaturedProducts } from '@/lib/products';
import { fetchCategoriesWithProducts } from '@/lib/categories';

import ProductSlider from '@/components/products/ProductSlider';

import CategorySection from '@/components/home/CategorySection';
import Chat from '@/components/products/Chat';
import ChatBotComponent from '@/components/products/ChatComponent';
import UserCard from '@/components/products/UserCard';

export type ProductFeatured = {
	images: Image[];
	category: {
		name: string;
	};
	color: Color;
	size: Size;
} & Product;

const items = [
	{
		img: '/background1.jpg',
		title: 'Collection Exclusive',
		subtitle: 'Découvrez notre nouvelle collection de vêtements tendance',
		actionLabel: 'Découvrir',
		actionUrl: '/products'
	},
	{
		img: '/background1.jpg',
		title: 'Offres Spéciales',
		subtitle: 'Jusqu\'à -50% sur une sélection d\'articles',
		actionLabel: 'Voir les offres',
		actionUrl: '/sales'
	},
	{
		img: '/background1.jpg',
		title: 'Nouveautés',
		subtitle: 'Les dernières tendances de la saison',
		actionLabel: 'Explorer',
		actionUrl: '/new'
	}
]

const Page = async () => {
	const supabase = createClient();
	const products = await fetchFeaturedProducts();
	const categories = await fetchCategoriesWithProducts();
	const { data: { user } } = await supabase.auth.getUser();

	return (
		<div className='max-w-7xl mx-auto px-6 2xl:px-0'>
			<div className='mt-4'>
				<Billboard items={items} />
			</div>

			<div className='flex justify-center'>
				<h1 className='text-2xl font-bold'>
					Bienvenue {user?.user_metadata.full_name || user?.email || 'cher client'}
				</h1>
			</div>

			<div className="mt-16 space-y-8">
				<HeadingTitle title='Nos Collections' />
				
				{/* <div className="relative">
					<div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl" />
					
					<div className="relative space-y-8">
						{categories.map((category) => (
							<CategorySection 
								key={category.id} 
								category={category}
							/>
						))}
					</div>
				</div> */}
				<UserCard/>
<ChatBotComponent/>
				<Chat productId='1'/>
			</div>

			<div className='flex flex-col gap-5 mt-16 mb-8'>
				<HeadingTitle title='featured products' />

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
					{products.slice(0, 4).map((product, productIndex) => (
						<CardProduct
							key={productIndex}
							product={product}
						/>
					))}
				</div>

				<ProductSlider />
			</div>
		</div>
	);
};

export default Page;
