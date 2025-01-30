  "use client"

  import { Bell, ShoppingBag, PhoneIcon as WhatsApp } from "lucide-react"
  import Link from "next/link"

  import { Button } from "@/components/ui/button"

  import VendorStats from "./VendorStats"
  import VendorIcon from "./VendorIcon"

  interface VendorHeaderProps {
    vendor: {
      id: string
      businessName: string
      businessLogo: string
      description: string
      whatsappNumber: string
      isVerified: boolean
      address: {
        country: string | null
        region: string | null
        city: string | null
      } | null
    }
    unreadNotifications: number
  }

  export default function VendorHeader({ vendor, unreadNotifications }: VendorHeaderProps) {
    return (
      <div className="min-h-[200px] max-h-[350px] md:max-h-full relative w-full  bg-gradient-to-br from-red-100 to-red-200">
   
        <div 
          className="absolute inset-0 w-full h-1/2 opacity-50"
          style={{
            backgroundImage:`url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='%23000000ff'/><path d='M0 0h10v20H0zM30 0v10H10V0zM10 10h10v20H10zM40 10v10H20V10zM20 20h10v20H20zM50 20v10H30V20zM30 30h10v20H30zM20 30v10H0V30zM10 20v10h-20V20zM30-10h10v20H30z'  stroke-width='1' stroke='%2303f4e6ff' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")`,
            // backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.1'%3E%3Cpath d='M50 50.12L0 0h50l50 50-50 50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10 pb-2 md:pb-4">
          <div className="mx-auto max-w-3xl">

            <div className="relative md:absolute md:left-16 md:mt-10">

              <VendorIcon
                businessName={vendor.businessName}
                businessLogo={vendor.businessLogo}
                isVerified={vendor.isVerified}
                address={vendor.address}
              />
            </div>

            <p className="my-1  text-sm sm:text-base text-gray-700 text-center [word-spacing:5px] max-w-xl mx-auto">
              {vendor.description}
            </p>

      
            <div className="md:my-2 flex justify-center gap-3">
              <Button 
                size="sm" 
                className="bg-white text-gray-800 hover:bg-gray-50 shadow-md transition-all duration-300 gap-2"
              >
                <WhatsApp className="h-4 w-4" />
                <span className="hidden sm:inline">Contact</span>
              </Button>
              
              <Link href="/orders">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 gap-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden sm:inline">Orders</span>
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="relative bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300"
              >
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

