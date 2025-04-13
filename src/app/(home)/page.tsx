import React, { Suspense } from 'react';



import Billboard from '@/components/home/Billboard';

import type { Color, Image, Product, Size } from '@prisma/client';
import { createClient } from '@/utils/supabase/server';
import { fetchAllProducts, fetchFeaturedProducts, fetchProducts, fetchUsualProducts, fetchProductsWithReviews } from '@/lib/products';
import { fetchCategoriesWithProducts } from '@/lib/categories';

import ProductSlider from '@/components/products/ProductSlider';
import { CategorySlider } from '@/components/home/CategorySlider';

import HeadingTitle from '@/components/home/HeadingTitle';

import VendorList from '../vendors/ui/VendorList';


import { CategorySliders } from '@/components/home/CategorySliders';

import dynamic from 'next/dynamic';

import HomeHero from './ui/HomeHero';
import Overlay from './ui/Overlay';

import { getVendorByProductId } from '../../lib/vendors';
import VendorIcon from '../vendors/ux/VendorIcon';


export type ProductFeatured = {
	images: Image[];
	category: {
		name: string;
	};
	color: Color;
	size: Size;
} & Product;


const Page = async () => {


	const [
		products_feature, 
		products, 
		products_usual, 
		products_with_reviews, 
		categories,
	  ] = await Promise.all([
		fetchFeaturedProducts(),
		fetchAllProducts(),
		fetchUsualProducts(),
		fetchProductsWithReviews(),
		fetchCategoriesWithProducts()
	
	  ]);
	  
	  const featuredProducts = products.slice(0, 4);

	  const vendors = await Promise.all(
		featuredProducts.map((product) => getVendorByProductId(product.id))
	  );
	  


	const supabase = createClient();
	const { data: { user } } = await supabase.auth.getUser();


	const CardProduct = dynamic(() => import('@/components/home/CardProduct'), { ssr: false });
	const ProductHero = dynamic(() => import('@/components/home/ProductHero'), { ssr: false });
	return (
		<div
		 className='max-w-full mx-auto px-2 md:px-4 2xl:px-12 '>
<div className="flex w-full"><Overlay/></div>


	<HomeHero/>



{/* <div className='flex justify-center flex-col gap-5 mt-16 mb-8'>	

				<HeadingTitle title='Produits en vedettes' />
				<Suspense fallback={<div>...</div>}>
					<ProductHero products={products_feature} />
				</Suspense>	
			</div> */}


{/* <div className='flex flex-col gap-5 mt-16 mb-8'>	

	
				<HeadingTitle title='Nos divers produits...' />

				<Suspense fallback={<div>...</div>}>
					<ProductHero products={products} />
				</Suspense>
	
			</div> */}

			{/* <HeadingTitle  title='PRODUITS VEDETTES...' /> */}
				<ProductSlider />
			
			<div className=" flex flex-col justify-center space-y-4 mt-24 ">

			<HeadingTitle title='Explorez nos boutiques...' />

	<div className={"flex justify-center"}><VendorList/></div>


{/* <h1 className="text-center text-xl" >Categorie lsite 2</h1> */}
<CategorySliders categories={categories}/>

<HeadingTitle title='Nos Divers Produits ...' />

				<div className='flex justify-center items-center my-20 lg:my-40 flex-wrap flex-col md:flex-row lg:px-4 gap-y-16 gap-5 lg:gap-x-8 '>
				{featuredProducts.map((product, index) => {
      const vendor = vendors[index];

      return (
        <div className="flex items-start gap-4" key={product.id}>
          {/* Vendeur en haut */}
          {vendor && (
			
  <VendorIcon
              id={vendor.id}
              businessName={vendor.businessName}
              businessLogo={vendor.businessLogo}
              isVerified={vendor.isVerified}
            />
		
          
          )}

          {/* Produit en dessous */}
          <CardProduct product={product} />
        </div>
      );
    })}
					</div>
				

					{/* <HeadingTitle title='Nos divers produits...' /> */}
	<CategorySlider/>

					<div className='flex justify-center items-center flex-wrap flex-col md:flex-row mt-24  gap-y-8 gap-5'>
						{products_usual.slice(0, 4).map((product, productIndex) => (
							<CardProduct
								key={productIndex}
								product={product}
							/>
						))}
					</div>

					
			</div>
		</div>
	);
};

export default Page;
