import React from 'react';

import CardProduct from '@/components/home/CardProduct';
import HeadingTitle from '@/components/home/HeadingTitle';
import Billboard from '@/components/home/Billboard';

import type { Color, Image, Product, Size } from '@prisma/client';
import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';

export type ProductFeatured = {
	images: Image[];
	category: {
		name: string;
	};
	color: Color;
	size: Size;
} & Product;

const Page = async () => {
	const supabase = createClient();

	const products: ProductFeatured[] = await prisma.product.findMany({
		where: {
			isArchived: false,
			isFeatured: true,
			images: {
				some: {},
			},
		},
		include: {
			images: true,
			category: {
				select: {
					name: true,
				},
			},
			color: true,
			size: true,
		},
	});

	const {data: { user } } = await supabase.auth.getUser();

	return (
		<div className='max-w-7xl mx-auto px-6 2xl:px-0'>
			<Billboard
				title='Explore the Featured Collection!'
				img='/featured-2.jpg'
			/>

<div>
	{user ? (
		<div>
			<h1>hello {user.email}</h1>
		</div>
	) : (
		<div>
			<h1>hello guest</h1>
		</div>
	)}

</div>

			<div className='flex flex-col gap-5 mt-16 mb-8'>
				<HeadingTitle title='featured products' />

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
					{products.map((product, productIndex) => (
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
