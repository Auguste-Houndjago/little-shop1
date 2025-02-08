import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { buildRedirectUrl } from '@/lib/utils';

import Billboard from '@/components/home/Billboard';
import CardProduct from '@/components/home/CardProduct';
import { buttonVariants } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import { SlidersHorizontal } from 'lucide-react';
import prisma from '@/lib/prisma';

const Page = async ({
	params,
	searchParams,
}: {
	params: { categoryId: string };
	searchParams: {
		[key: string]: string | undefined;
	};
}) => {
	const { categoryId } = params;
	const { color: colorFilter, size: sizeFilter } = searchParams;

	try {
		// Ensure categoryId is a valid UUID
		if (!categoryId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
			return notFound();
		}

		// Récupérer la catégorie et ses produits
		const category = await prisma.category.findUnique({
			where: {
				id: categoryId,
			},
			include: {
				products: {
					where: {
						isArchived: false,
						images: { some: {} },
						color: {
							name: colorFilter?.toLowerCase(),
						},
						size: {
							value: sizeFilter?.toUpperCase(),
						},
					},
					include: {
						images: true,
						category: true,
						color: true,
						size: true,
					},
				},
			},
		});

		if (!category) {
			return notFound();
		}

		const colors = await prisma.color.findMany();

		const sizes = await prisma.size.findMany();

		return (
			<div className='max-w-7xl mx-auto px-6 2xl:px-0'>
				<Billboard
					items={[
						{
							title: category.title,
							img: category.billboard,
						},
					]}
				/>
				<div className='grid grid-cols-5 gap-5 xl:gap-8 mb-8'>
					{/* Filter large desktop */}
					<div className='col-span-1 hidden xl:flex flex-col gap-8'>
						<div className='flex flex-col gap-2'>
							<h2 className='font-semibold'>Colors</h2>
							<hr />
							<div className='flex flex-wrap gap-2'>
								<Link
									href={buildRedirectUrl(categoryId, undefined, sizeFilter)}
									className={buttonVariants({
										variant: colorFilter === undefined ? 'default' : 'outline',
									})}
								>
									All
								</Link>
								{colors.map((color, colorIndex) => (
									<Link
										href={buildRedirectUrl(categoryId, color.name, sizeFilter)}
										key={colorIndex}
										className={buttonVariants({
											variant:
												colorFilter?.toLowerCase() === color.name
													? 'default'
													: 'outline',
											className: 'capitalize',
										})}
									>
										{color.name}
									</Link>
								))}
							</div>
						</div>
						<div className='flex flex-col gap-2'>
							<h2 className='font-semibold'>Sizes</h2>
							<hr />
							<div className='flex flex-wrap gap-2'>
								<Link
									href={buildRedirectUrl(categoryId, colorFilter, undefined)}
									className={buttonVariants({
										variant: sizeFilter === undefined ? 'default' : 'outline',
										className: 'capitalize',
									})}
								>
									All
								</Link>
								{sizes.map((size, sizeIndex) => (
									<Link
										href={buildRedirectUrl(categoryId, colorFilter, size.value)}
										key={sizeIndex}
										className={buttonVariants({
											variant:
												sizeFilter?.toUpperCase() === size.value
													? 'default'
													: 'outline',
											className: 'capitalize',
										})}
									>
										{size.name}
									</Link>
								))}
							</div>
						</div>
					</div>

					{/* Filter mobile - desktop */}
					<div className='col-span-full block xl:hidden'>
						<Sheet>
							<SheetTrigger
								className={buttonVariants({
									variant: 'secondary',
									size: 'sm',
								})}
							>
								<SlidersHorizontal className='w-4 h-4' />
							</SheetTrigger>
							<SheetContent side='left'>
								<SheetHeader className='mb-8 text-start'>
									<SheetTitle>Filter</SheetTitle>
									<SheetDescription>
										Use filters to refine the results according to your
										preferences.
									</SheetDescription>
								</SheetHeader>
								<div className='flex flex-col gap-8'>
									<div className='flex flex-col gap-2'>
										<h2 className='font-semibold'>Colors</h2>
										<hr />
										<div className='flex flex-wrap gap-2'>
											<Link
												href={buildRedirectUrl(categoryId, undefined, sizeFilter)}
												className={buttonVariants({
													variant:
														colorFilter === undefined ? 'default' : 'outline',
												})}
											>
												All
											</Link>
											{colors.map((color, colorIndex) => (
												<Link
													href={buildRedirectUrl(
														categoryId,
														color.name,
														sizeFilter
													)}
													key={colorIndex}
													className={buttonVariants({
														variant:
															colorFilter?.toLowerCase() === color.name
																? 'default'
																: 'outline',
														className: 'capitalize',
													})}
												>
													{color.name}
												</Link>
											))}
										</div>
									</div>
									<div className='flex flex-col gap-2'>
										<h2 className='font-semibold'>Sizes</h2>
										<hr />
										<div className='flex flex-wrap gap-2'>
											<Link
												href={buildRedirectUrl(
													categoryId,
													colorFilter,
													undefined
												)}
												className={buttonVariants({
													variant:
														sizeFilter === undefined ? 'default' : 'outline',
													className: 'capitalize',
												})}
											>
												All
											</Link>
											{sizes.map((size, sizeIndex) => (
												<Link
													href={buildRedirectUrl(
														categoryId,
														colorFilter,
														size.value
													)}
													key={sizeIndex}
													className={buttonVariants({
														variant:
															sizeFilter?.toUpperCase() === size.value
																? 'default'
																: 'outline',
														className: 'capitalize',
													})}
												>
													{size.name}
												</Link>
											))}
										</div>
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>

					<div className='col-span-full xl:col-span-4 flex-1 grid grid-cols-1 mt-8 sm:grid-cols-2 md:grid-cols-3 gap-5'>
						{category.products.map((product, productIndex) => (
							<CardProduct
								key={productIndex}
								product={product}
							/>
						))}
					</div>
				</div>
			</div>
		);
	} catch (error) {
		console.error(error);
		return notFound();
	}
};

export default Page;
