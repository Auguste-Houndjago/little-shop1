"use client";

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
const supabase = createClient();

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [seller, setSeller] = useState('');

  const [locations, setLocations] = useState<any[]>([]);
  const [sellers, setSellers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [locationsResponse, sellersResponse, categoriesResponse] = await Promise.all([
          supabase.from('locations').select('*'),
          supabase.from('sellers').select('*'),
          supabase.from('categories').select('*')
        ]);

        setLocations(locationsResponse.data || []);
        setSellers(sellersResponse.data || []);
        setCategories(categoriesResponse.data || []);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  const handleSearch = async () => {
    try {
      // Parse price range
      const [priceMin, priceMax] = priceRange 
        ? priceRange.split('-').map(p => parseFloat(p.replace('Fcfa', ''))) 
        : [null, null];

      const { data, error } = await supabase.rpc('search_products', {
        search_query: searchQuery || null,
        category_id: category || null,
        price_min: priceMin,
        price_max: priceMax,
        location: location || null,
        seller_id: seller || null
      });

      if (error) throw error;

      setSearchResults(data || []);
      console.log('Search Results:', data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 w-full max-w-4xl">
        <div className="relative flex-grow">
          <Input 
            type="text" 
            placeholder="Recherchez des produits..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4"
          />
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={20} 
          />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Localisation" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((loc) => (
              <SelectItem key={loc.id} value={loc.name}>
                {loc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Prix" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-5000">0-5000 Fcfa</SelectItem>
            <SelectItem value="5000-10000">5000-10000 Fcfa</SelectItem>
            <SelectItem value="10000-20000">10000-20000 Fcfa</SelectItem>
            <SelectItem value="20000-50000">20000-50000 Fcfa</SelectItem>
          </SelectContent>
        </Select>

        <Select value={seller} onValueChange={setSeller}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Vendeur" />
          </SelectTrigger>
          <SelectContent>
            {sellers.map((sel) => (
              <SelectItem key={sel.id} value={sel.id}>
                {sel.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleSearch}>
          Rechercher
        </Button>
      </div>

      {/* Optional: Display search results */}
      {searchResults.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Résultats de recherche</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((product) => (
              <div key={product.id} className="border p-4 rounded">
                <h3 className="font-semibold">{product.title}</h3>
                <p>Prix: {product.price} Fcfa</p>
                <p>Catégorie: {product.category_name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;