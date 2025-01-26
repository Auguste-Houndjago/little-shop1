"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { SearchFiltersComponent } from './SearchFilters';
import { ProductResultsGrid } from './ProductResultsGrid';
import { fetchSearchFilters, SearchFilters, searchProducts } from '../_actions/search-actions';
import { ProductWithRelations } from '../types';
import { Category, Tag, VendorProfile } from '@prisma/client';
import { SearchSidebar } from './SearchSideBar';
 // You'll need to create this type file

export default function SearchPage() {
  const [searchFilters, setSearchFilters] = useState<{
    categories: (Category & { billboard: string; title: string })[];
    tags: (Tag & { category: string; description: string | null; certified: number })[];
    vendorProfiles: (VendorProfile & { 
      user: { 
        address?: {
          country?: string | null;
          region?: string | null;
          city?: string | null;
        } | null;
      }
    })[];
    locations: {
      countries: string[];
      regions: string[];
      cities: string[];
    }
  }>({
    categories: [],
    tags: [],
    vendorProfiles: [],
    locations: {
      countries: [],
      regions: [],
      cities: []
    }
  });

  const [filters, setFilters] = useState<SearchFilters>({});
  const [searchResults, setSearchResults] = useState<ProductWithRelations[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial filter data
  useEffect(() => {
    async function loadFilters() {
      try {
        const data = await fetchSearchFilters();
        setSearchFilters(data);
      } catch (error) {
        toast.error('Failed to load search filters');
      }
    }
    loadFilters();
  }, []);

  // Perform search
  const performSearch = async () => {
    setIsLoading(true);
    try {
      const results = await searchProducts(filters);
      setSearchResults(results as ProductWithRelations[]);
      
      if (results.length === 0) {
        toast.info('No products found matching your search criteria');
      }
    } catch (error) {
      toast.error('Failed to perform search');
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update filter state
  const updateFilter = (key: keyof SearchFilters, value: string | number | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Advanced Product Search</h1>
      
      <SearchFiltersComponent 
        searchFilters={searchFilters}
        filters={filters}
        updateFilter={updateFilter}
        clearAllFilters={clearAllFilters}
        performSearch={performSearch}
        isLoading={isLoading}
      />

{/* <SearchSidebar
        searchFilters={searchFilters}
        filters={filters}
        updateFilter={updateFilter}
        clearAllFilters={clearAllFilters}
        performSearch={performSearch}
        isLoading={isLoading}
      /> */}


      <ProductResultsGrid searchResults={searchResults} />
    </div>
  );
}
