import React from 'react';

import CardProduct from '@/components/home/CardProduct';
import HeadingTitle from '@/components/home/HeadingTitle';
import Billboard from '@/components/home/Billboard';

import type { Color, Image, Product, Size } from '@prisma/client';
import { createClient } from '@/utils/supabase/server';
import { fetchFeaturedProducts } from '@/lib/products';
import { fetchCategoriesWithProducts } from '@/lib/categories';

import ProductSlider from '@/components/products/ProductSlider';

import RevealWrapper from '@/components/animations/RevealWrapper';
import GalleryParallax from '@/components/3d/galery/GalleryParallax';
import CollectionsSection from '@/components/home/CollectionsSection';
import { FeaturedReveal } from '@/components/home/FeatursReveal';
import { CategorySlider } from '@/components/home/CategorySlider';

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

			<div className="mt-16 md-h-full h-40 space-y-8">
			<HeadingTitle title='Nos Collections' />
			<RevealWrapper delay={0}>
			<CollectionsSection />
			</RevealWrapper>

		

			</div>
			{/* <div className='h-[400px]'>
			<RevealWrapper delay={0}>
<GalleryParallax/>
			</RevealWrapper>

		
			</div> */}

<div className=''>
	<CategorySlider/>
</div>

<FeaturedReveal/>
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
