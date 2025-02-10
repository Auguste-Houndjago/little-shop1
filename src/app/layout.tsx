

import { Toaster } from 'sonner';

import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/components/theme-provider';
import {HeroUIProvider} from "@heroui/react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en'>
			<body className='
			
		
			bg-[#e8e8e8]
	
			dark:bg-[#18181c]'>
			<ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

		<AuthProvider>


		<HeroUIProvider>
			{children}

			</HeroUIProvider>
				</AuthProvider>

				</ThemeProvider>
				<Toaster
					position='top-center'
					richColors
				/>
			</body>
		</html>
	);
};

export default RootLayout;
