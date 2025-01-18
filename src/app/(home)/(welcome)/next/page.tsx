

import TransitionEffect from "@/components/animations/TransitionEffect";
import HLogo from "@/components/ux/HomeLogo";
import GlobalStyles from "@/styles/GlobalStyles";
import Link from "next/link";
import { Button } from '@/components/ui/button';
import { ArrowDownNarrowWideIcon, ArrowDownToDot, ArrowDownWideNarrowIcon } from "lucide-react";



export default function Page() {
  return (
    <div className="w-full">
      <main className="flex min-h-screen flex-col items-center justify-center ">
     <HLogo/> 
      <h1 className="mt-4 text-2xl font-bold">Bienvenue sur smart</h1>


<Button variant={"ghost"} className="absolute bottom-20 bg-bg/80">
  <Link href={'/introduction'}><ArrowDownToDot/> </Link>
</Button>


    </main>
    
    </div>
  )
}

