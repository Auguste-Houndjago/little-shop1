import Image from "next/image"
import { CalendarDays, MapPin, VerifiedIcon } from "lucide-react"


import { Vendor } from "@/types/vendor";


const coverbg= "/images/cover.webp"

export function VendorHeader({ vendor }:{vendor:Vendor}) {



  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <div className="relative h-24 md:h-48 w-full bg-gray-200 rounded-t-xl">
        {vendor.businessLogo && (
          <Image
            src={vendor.businessLogo || vendor.banner! || coverbg}
            alt={vendor.businessName}
            layout="fill"
        className="object-cover rounded-t-md"
       
          />
        )}
      </div>

   

<div className="px-4 pb-2 relative">
          <div className="-mt-16 flex items-end">
          <div className="relative">
  <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden">
    <Image
      src={vendor.businessLogo || "/placeholder.svg"}
      alt={vendor.businessName}
      width={128}
      height={128}
      className="object-cover"
    />
  </div>
  <span className="absolute top-0 right-0">
    <VerifiedIcon className="text-blue-500 bg-background rounded-full" size={20} />
  </span>
</div>


              
              <div className="ml-4 ">
       <h1 className="text-2xl font-bold mb-2">
                  {vendor.businessName}
                  {vendor.isVerified && <VerifiedIcon className=" text-blue-500" size={20} />}
                </h1>
                <div className="flex items-center text-gray-600 font-semibold dark:text-gray-300 mt-1">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span> {vendor.country}, {vendor.region} {vendor.city}</span>
                </div>
              
                
              </div>
          </div>
          <div className="flex my-4  flex-col text-gray-600">
        
          <p className="text-black font-bold">{vendor.description}</p>
     
           <span className="flex gap-x-2">
           <CalendarDays /> {new Date(vendor.createdAt).toDateString()}
            </span>

            
          </div>
        </div>
      </div>


  )
}

