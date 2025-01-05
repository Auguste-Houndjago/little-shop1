
import Logo from "@/components/Logo";
import HLogo from "@/components/ux/HomeLogo";
import LogoLoader from "@/components/ux/test";


export default function Page() {
  return (
    <div className="w-full">
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
     <HLogo/> 
      <h1 className="mt-4 text-2xl font-bold">Bienvenue sur notre site</h1>
    </main>
    </div>
  )
}

