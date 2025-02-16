import React from 'react';
import { notFound } from 'next/navigation';



import type {
	Color,
	Image,
	Product as ProductPrisma,
	Size,
} from '@prisma/client';

import Product from './Product';

import CardProduct from '@/components/home/CardProduct';
import HeadingTitle from '@/components/home/HeadingTitle';
import { getProduct } from './actions';
import prisma from '@/lib/prisma';

export type TSingleProduct = {
	images: Image[];
	category: {
		name: string;
	};
	color: Color;
	size: Size;
} & ProductPrisma;

const Page = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const product: TSingleProduct | null = await getProduct(id);
	if (!product) {
		return notFound();
	}

	const relatedProducts = await prisma.product.findMany({
		where: {
			id: { not: id },
			isArchived: false,
			category: {
				name: product.category.name,
			},
			images: {
				some: {},
			},
		},
		include: {
			category: {
				select: {
					name: true,
				},
			},
			images: true,
			color: true,
			size: true,
		},
		take: 4,
	});

	return (
		<div className='my-8 max-w-7xl mx-auto px-6 2xl:px-0'>
			<div className='flex flex-col gap-16'>
				<Product product={product} />

				<hr />

				<div className='flex flex-col gap-5'>
					<HeadingTitle title='related items' />

					<div className='flex justify-center space-y-4 flex-wrap sm:gap-4 flex-row'>
						{relatedProducts.map((product, productIndex) => (
							<CardProduct
								key={productIndex}
								product={product}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
