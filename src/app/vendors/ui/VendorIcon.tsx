  "use client";

  import { MapPin } from "lucide-react";
  import { Badge } from "@/components/ui/badge";
  import Image from "next/image";

  interface VendorIconProps {
    businessName: string;
    businessLogo: string | null;
    isVerified: boolean;
    address: {
      country: string | null;
      region: string | null;
      city: string | null;
    } | null;
  }

  export default function VendorIcon({ businessName, businessLogo, isVerified, address }: VendorIconProps) {
    return (
      <div 

        className="text-center "
      >
        <div className="relative  inline-block">
          <div className="relative  rounded-full shadow-md">
            <Image
              src={businessLogo || "/placeholder.svg"}
              alt={businessName}
              width={128}
              height={128}
              className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 rounded-full border-4 border-background ] shadow-[0px_0px_10px_rgba(0,0,0,0.3)]"
            />
            {isVerified && (
              <span className="absolute bg-gray-200/50 -right-2 -top-2  rounded-full">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </div>
        </div>

     
      </div>
    );
  } 