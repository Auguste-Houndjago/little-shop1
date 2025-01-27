import React from 'react';
import { Inter } from 'next/font/google';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '../ui/button';



const inter = Inter({ subsets: ['latin'] });

const Footer = () => {
	return (
		<footer className={cn(inter.className, 'py-8 border-t border-t-gray-200')}>
			<div className='flex justify-center items-center'>
				<p className='text-sm'>&copy; 2024 smart-Shop.</p>

			</div>
		</footer>
	);
};

export default Footer;
