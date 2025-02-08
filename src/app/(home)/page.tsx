import React, { Suspense } from 'react';

import CardProduct from '@/components/home/CardProduct';

import Billboard from '@/components/home/Billboard';

import type { Color, Image, Product, Size } from '@prisma/client';
import { createClient } from '@/utils/supabase/server';
import { fetchAllProducts, fetchFeaturedProducts, fetchProducts, fetchUsualProducts, fetchProductsWithReviews } from '@/lib/products';
import { fetchCategoriesWithProducts } from '@/lib/categories';

import ProductSlider from '@/components/products/ProductSlider';
import { CategorySlider } from '@/components/home/CategorySlider';
import Slider from '@/components/home/Slider';
import ProductHero from '@/components/home/ProductHero';
import HeadingTitle from '@/components/home/HeadingTitle';
import CategoryList from './CategoryList';
import VendorList from '../vendors/ui/VendorList';
import VendorsSection from '@/components/home/VendorsSection';
import Banner from '@/components/home/ProductHero copy';
import { CategorySliders } from '@/components/home/CategorySliders';
import { CategorySliderx } from '@/components/home/CategorySlider copy';

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
		img: '/images/hero/peach.jpg',
		title: 'Collection Exclusive',
		subtitle: 'Découvrez notre nouvelle collection de vêtements tendance',
		actionLabel: 'Découvrir',
		actionUrl: '/products'
	},
	{
		img: '/images/hero/beauty.jpg',
		title: 'Offres Spéciales',
		subtitle: 'Jusqu\'à -50% sur une sélection d\'articles',
		actionLabel: 'Voir les offres',
		actionUrl: '/sales'
	},
	{
		img: '/images/hero/parfum.jpg',
		title: 'Nouveautés',
		subtitle: 'Les dernières tendances de la saison',
		actionLabel: 'Explorer',
		actionUrl: '/new'
	},
	{
		img: '/images/hero/accessoirs.jpg',
		title: 'Nouveautés',
		subtitle: 'des accessoires de mode',
		actionLabel: 'Explorer',
		actionUrl: '/new'
	}
]

const Page = async () => {
	const supabase = createClient();
	const products_feature = await fetchFeaturedProducts();
	const products = await fetchAllProducts();
	const products_usual = await fetchUsualProducts();
	const products_with_reviews = await fetchProductsWithReviews();
	
	const categories = await fetchCategoriesWithProducts();
	const { data: { user } } = await supabase.auth.getUser();

	return (
		<div
		 className='max-w-7xl mx-auto px-2 md:px-4 2xl:px-0'>
			<div className='mt-0'>
				<Billboard items={items} />
			</div>


			<div className='flex mt-8 justify-center bg-background/50 border-2 rounded-lg items-center dark:border-black w-full  h-24
    border-primary/40'>
				<h1 className='text-3xl font-bold'>
					Bienvenue {user?.user_metadata.full_name || user?.email || 'cher client'}
				</h1>
			</div>
{/* <Banner/> */}

<div className=''>

	<CategorySlider/>
</div>
<CategorySliders categories={categories}/>

<CategoryList/>
<div className='flex flex-col gap-5 mt-16 mb-8'>	

	
				<HeadingTitle title='featured products' />

			

				<Suspense fallback={<div>Loading products...</div>}>
					<ProductHero products={products_feature} />
				</Suspense>

					
		
			</div>
<div className='relative'>
<Slider/>
</div>

<div className='flex flex-col gap-5 mt-16 mb-8'>	

	
				<HeadingTitle title='Nos divers produits...' />

			

				<Suspense fallback={<div>Loading products...</div>}>
					<ProductHero products={products} />
				</Suspense>

					
		
			</div>


			<ProductSlider />

			
			<div className=" flex flex-col justify-center space-y-4 mt-24 ">
			<HeadingTitle title='Explorez nos boutiques...' />
<span>
	<VendorList/>
</span>

<VendorsSection/>


				<div className='flex justify-center items-center mt-2 flex-wrap flex-col md:flex-row gap-y-16 gap-5 '>
						{products.slice(0, 4).map((product, productIndex) => (
							<CardProduct
								key={productIndex}
								product={product}
							/>
						))}
					</div>
				
					{/* <div className='flex justify-center flex-wrap flex-col md:flex-row mt-16  gap-y-8 gap-5'>
						{products_usual.slice(0, 4).map((product, productIndex) => (
							<CardProduct
								key={productIndex}
								product={product}
							/>
						))}
					</div> */}
			</div>
		</div>
	);
};

export default Page;
