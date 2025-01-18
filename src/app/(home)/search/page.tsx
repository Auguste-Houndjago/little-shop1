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
import { createClient } from '@/utils/supabase/client';

export default function SearchPage() {
  const supabase = createClient();
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
    
      let query = supabase.from('products').select('*');

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      if (category) {
        query = query.eq('category_id', category);
      }

      if (location) {
        query = query.eq('location_id', location);
      }

      if (seller) {
        query = query.eq('seller_id', seller);
      }

      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        query = query.gte('price', minPrice).lte('price', maxPrice);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error searching products:', error);
        return;
      }

      setSearchResults(data || []);
    } catch (error) {
      console.error('Error in search:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Advanced Product Search</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <Input 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select onValueChange={setCategory} value={category}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setLocation} value={location}>
          <SelectTrigger>
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((loc) => (
              <SelectItem key={loc.id} value={loc.id}>
                {loc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSeller} value={seller}>
          <SelectTrigger>
            <SelectValue placeholder="Select Seller" />
          </SelectTrigger>
          <SelectContent>
            {sellers.map((sel) => (
              <SelectItem key={sel.id} value={sel.id}>
                {sel.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setPriceRange} value={priceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-50">$0 - $50</SelectItem>
            <SelectItem value="50-100">$50 - $100</SelectItem>
            <SelectItem value="100-500">$100 - $500</SelectItem>
            <SelectItem value="500-1000">$500 - $1000</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSearch}>
          Search
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Search Results</h2>
        {searchResults.length === 0 ? (
          <p>No results found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map((product) => (
              <div 
                key={product.id} 
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="w-full h-48 object-cover mb-2 rounded"
                />
                <h3 className="font-bold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}