'use client';

import React from 'react';
import { Open_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import {  ShoppingCart } from 'lucide-react';

import { cn, formatPrice } from '@/lib/utils';

import type { ProductStorage } from './CardProduct';
import CartProduct from './CartProduct';

import useTriggerUseEffect from '@/hooks/useTriggerUseEffect';

import { getProductIsArchived } from '@/app/(home)/p/[id]/actions';

import { toast } from 'sonner';

import { createCheckoutSession } from '@/app/(home)/actions';
import { useAuth } from '@/contexts/AuthContext';

const openSans = Open_Sans({ subsets: ['latin'] });

const SheetBody = ({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) => {
	return <div className={cn('!mt-5', className)}>{children}</div>;
};

const AStraightLine = () => {
	return <div className='w-full h-px bg-gray-200' />;
};

const Cart = () => {
	const router = useRouter();
const {user} = useAuth()


	const { triggerUseEffect } = useTriggerUseEffect();
	const [cart, setCart] = React.useState<ProductStorage[]>([]);
	const [isPending, startTransition] = React.useTransition();

	React.useEffect(() => {
		try {
		  const cartData = localStorage.getItem('cart');
		  if (!cartData) {
			setCart([]);
			return;
		  }
		  
		  const parsedCart = JSON.parse(cartData);
		  
		 
		  if (!Array.isArray(parsedCart)) {
			console.error('Cart data is not an array:', parsedCart);
			setCart([]);
			return;
		  }
	  
		 
		  const validCart = parsedCart.filter(item => 
			item?.product && 
			typeof item.amount === 'number' && 
			typeof item.total === 'number'
		  );
	  
		  setCart(validCart);
		} catch (error) {
		  console.error('Error parsing cart data:', error);
		  setCart([]);
		}
	  }, [triggerUseEffect]);

	const totalPrice: number =
		cart?.reduce((total, curr) => total + curr.amount, 0) || 0;

	const handleCheckout = async () => {
		try {
			if (!user) {
				router.push('/login');
				return;
			}

			for (const cartItem of cart) {
				const product = await getProductIsArchived(cartItem.product.id);

				if (product?.isArchived) {
					const updatedCart = cart.filter(
						(item) => item.product.id !== product.id
					);
					setCart(updatedCart);
					localStorage.setItem('cart', JSON.stringify(updatedCart));

					toast.info(
						`Product "${product.title}" is not available at this time`
					);
				}
			}

			const res = await createCheckoutSession(cart);
			if (res?.url) {
				router.push(res.url);
			}
		} catch (err) {
			console.error(`[ERROR_HANDLE_CHECKOUT]: ${err}`);
		}
	};

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
				variant={"secondary"}
					size='sm'
					className='rounded-xl w-12 px-2 h-10 bg-background/50 border-2'
				>
					       <ShoppingCart className="w-5 h-5 mr-2" />
			
					<span className='font-bold text-xs'>{cart?.length || 0}</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side='right'
				className={cn(
					openSans.className,
					'w-full sm:w-[600px]  sm:max-w-none flex flex-col space-y-1 p-[30px]',
					
				)}
			>
				<SheetHeader>
					<SheetTitle className='tracking-[.3rem] font-[600] uppercase'>
				Pannier
					</SheetTitle>
				</SheetHeader>

				<AStraightLine />

				<ScrollArea className='flex-1'>
					<SheetBody className='w-full'>
						<ul className='w-full flex flex-col space-y-5'>
							{cart?.map((product, productIndex) => (
								<React.Fragment key={productIndex}>
									<CartProduct product={product} />

									<AStraightLine />
								</React.Fragment>
							))}
						</ul>
					</SheetBody>
				</ScrollArea>

				<SheetFooter>
					<div className='flex flex-col space-y-5 w-full'>
						<span
							aria-hidden='true'
							className='text-[13px] tracking-[.04rem]'
						>
						Prix Calculer
						</span>
						<Button
							type='button'
							className='py-[10px] px-[30px] rounded-none h-[49px] w-full uppercase text-white tracking-[.3rem] font-[600] flex flex-row items-center justify-center gap-x-4'
							disabled={isPending}
							isLoading={isPending}
							loadingText='Processing'
							onClick={() => {
								if (!cart.length) {
									toast.error('Cart is empty.');
									return;
								}

								startTransition(() => {
									handleCheckout();
								});
							}}
						>
							Achetez
							<div
								aria-hidden='true'
								className='w-[14px] h-[2px] bg-white'
							/>
							<span className='tracking-widest'>
								{formatPrice(totalPrice)} 
							</span>
						</Button>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default Cart;
