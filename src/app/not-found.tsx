
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

import React from "react";

export default function NotFound() {
  return (
    <section className="py-40 w-full flex flex-col items-center h-screen">
     <h1 className="text-center"> Hello tu es perdu ?</h1>

     <div>
     <Link className="btn btn-primary border" href="/">
     <Button>
      Retourner a l'accueil
     </Button>
</Link>
     </div>
   
    </section>
  );
}

export const metadata: Metadata = {
  title: "Not Found - shop",
  description:
    "Shop Online Ecommerce.",
  icons: {
    icon: "/assets/images/logo.svg",
  },


};
