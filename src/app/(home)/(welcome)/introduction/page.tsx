import Can from "@/components/3d/cannettes/Can";
import ParallaxSection from "@/components/3d/cannettes/ParalaxeSection";
import RevealEffect from "@/components/animations/RevealEffect";

import TransitionEffect from "@/components/animations/TransitionEffect";
import VerticalRevealWrapper from "@/components/animations/VerticalRevealWrapper";
import HLogo from "@/components/ux/HomeLogo";
import { Link } from "lucide-react";


export default function Home() {
  return (
    <main className=" p-0 ">

      {/* <div className="flex border-4 h-screen flex-col items-center blurxl py-52">
      <h1 className="text-3xl font-bold text-center mb-4 ">Votre boutique de vente en ligne </h1>
      <HLogo/> 
      <h1 className="mt-4 text-2xl font-bold blurx">Bienvenue sur smart</h1>
      </div> */}

<TransitionEffect/>


      {/* <RevealEffect text="WHERE DIFFERENT IS THE STANDARD. CHOOSE US." />

      <VerticalRevealWrapper>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Contenu Révélé</h2>
          <p className="mb-4">
            Ce contenu est révélé lorsque vous faites défiler la page vers le bas. Les rideaux noirs
            s'ouvrent verticalement, révélant le contenu en dessous.
          </p>
          <p>
            L'animation est fluide, avec le rideau supérieur se déplaçant vers le haut et le rideau
            inférieur se déplaçant vers le bas.
          </p>
          <p className="mt-4">
            Le composant reste en place pendant le défilement, et l'animation se produit sans avoir
            besoin d'ajouter des divs d'espacement supplémentaires.
          </p>
        </div>
      </VerticalRevealWrapper> */}
      
      {/* <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Contenu supplémentaire</h2>
        <p>
          Ce contenu est affiché après le composant VerticalRevealWrapper pour démontrer que
          le défilement continue normalement après l'animation.
        </p>
      </div> */}
    </main>
  )
}

