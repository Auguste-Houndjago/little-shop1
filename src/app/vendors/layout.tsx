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
		return redirect("/login");
	}

	const vendorData = await getVendorData(user.id);

	if (!vendorData) {
		return redirect("/vendor");
	}

	return (
		<VendorProvider>
			<div className="flex h-screen bg-[#F9F9F9]  ">

				<VendorSidebar />
				
				<div className="flex-1 m-2 rounded-md overflow-auto">
					<VendorHeader 
						vendor={vendorData.vendor}
						unreadNotifications={vendorData.unreadNotifications}
					/>
					<div className=" md:p-8">
						{children}
					</div>
				</div>
			</div>
		</VendorProvider>
	);
};

export default Layout;
