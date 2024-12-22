import React from 'react';

import { Toaster } from 'sonner';

import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en'>
			<body>

		<AuthProvider>
				{children}
				</AuthProvider>
				<Toaster
					position='top-center'
					richColors
				/>
			</body>
		</html>
	);
};

export default RootLayout;
