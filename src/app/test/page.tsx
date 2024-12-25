'use client';


import { createClient } from "@/utils/supabase/client";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";



export default function Page() {
  const [allProducts, setAllProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
const supabase = createClient()


  useEffect(() => {
    async function fetchProducts() {

      const {data:user} = await supabase.auth.getUser() ;
      try {
        const { data, error } = await supabase.rpc("AllProducts"); 
        if (error) {
          console.error("Erreur lors de la récupération des produits :", error.message);
          setError(error.message);
        } else {
          console.log("Produits récupérés :", data);
          setAllProducts(data as Product[]); 
        }

        if (user) {
          console.log(user, 'user yop')
        }
      } catch (error) {
        console.error("Erreur inattendue :", error);
        setError("Une erreur inattendue s'est produite.");
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Liste des produits</h1>

      {error && <p style={{ color: "red" }}>Erreur : {error}</p>} 

      <ul>
        {allProducts ? (
          allProducts.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))
        ) : (
          <li>Chargement des produits...</li>
        )}
      </ul>
    </div>
  );
}
