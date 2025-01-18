import HLogo from "@/components/ux/HomeLogo";
import SearchBar from "@/components/home/SearchBar";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function Page() {
  const [searchResults, setSearchResults] = useState([]);

  const getLocations = async () => {
    const { data, error } = await supabase.from('locations').select('*');
    return error ? [] : data;
  };

  const getSellers = async () => {
    const { data, error } = await supabase.from('sellers').select('*');
    return error ? [] : data;
  };

  const getSuggestions = async () => {
  
    return [];
  };

  const handleSearch = (results: any[]) => {
    if (results) {
        // setSearchResults(results);
    }
  
    console.log('Search Results:', results);
  };

  return (
    <div className="w-full">
      <main className="flex min-h-screen flex-col items-center justify-center space-y-6">
        <HLogo/> 
        <h1 className="mt-4 text-2xl font-bold">Bienvenue sur smart</h1>
        
        <SearchBar 
          getLocations={getLocations}
          getSellers={getSellers}
          getSuggestions={getSuggestions}
          onSearch={handleSearch}
        />

   
        {searchResults.length > 0 && (
          <div className="w-full max-w-4xl">
            <h2 className="text-xl font-semibold mb-4">Résultats de recherche</h2>
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {searchResults.map((product) => (
                <div key={product.id} className="border p-4 rounded-lg">
                  <h3 className="font-bold">{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="text-primary">{product.price} Fcfa</p>
                </div>
              ))}
            </div> */}
          </div>
        )}
      </main>
    </div>
  )
}
