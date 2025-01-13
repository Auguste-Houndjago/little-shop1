

import HLogo from "@/components/ux/HomeLogo";
import Link from "next/link";



export default function Page() {
  return (
    <div className="w-full">
      <main className="flex min-h-screen flex-col items-center justify-center ">
     <HLogo/> 
      <h1 className="mt-4 text-2xl font-bold">Bienvenue sur smart</h1>
<Link href={"/intro"}> intro</Link>
    </main>
    </div>
  )
}

