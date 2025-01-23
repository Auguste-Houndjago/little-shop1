import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import VendorHeader from './ui/VendorHeader';
import { VendorProvider } from '@/providers/VendorProvider';
import VendorSidebar from './ui/VendorSidebar';
import { getVendorData } from './vendor';

const Layout = async ({ children }: { children: React.ReactNode }) => {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user?.id) {
		return redirect("/auth");
	}

	const vendorData = await getVendorData(user.id);

	if (!vendorData) {
		return redirect("/");
	}

	return (
		<VendorProvider>
			<div className="h-full relative">
				<div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-100">
					<VendorSidebar />
				</div>
				<main className="md:pl-72">
					<VendorHeader 
						vendor={vendorData.vendor}
						unreadNotifications={vendorData.unreadNotifications}
					/>
					<div className="p-8">
						{children}
					</div>
				</main>
			</div>
		</VendorProvider>
	);
};

export default Layout;
