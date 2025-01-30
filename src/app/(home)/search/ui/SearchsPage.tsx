"use client"

import React, { useState, useEffect } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { Search, ShoppingCart, Heart } from "lucide-react"

import { SearchFiltersComponent } from "./SearchFilters"
import { ProductResultsGrid } from "./ProductResultsGrid"
import { fetchSearchFilters, SearchFilters, searchProducts } from "../_actions/search-actions"
import { ProductWithRelations } from "../types"
import { Category, Tag, VendorProfile } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductResults } from "./ProductResults"

import Image from "next/image"
import VendorList from "@/app/vendors/ui/VendorList"

export default function SearchsPage() {
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
    <div className="min-h-screen">
      {/* Main Search Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Categories Sidebar */}
          <div className="max-w-48 flex items-center flex-col border-4 flex-shrink-0">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-2 mx-auto border-4">
              <button className="text-purple-700 font-medium w-full ">All Products</button>
              {searchFilters.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => updateFilter("categoryId", category.id)}
                  className="w-full text-center hover:text-purple-700"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar and Filters */}
            <div className="mb-8">
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full pl-10"
                    value={filters.productName || ""}
                    onChange={(e) => updateFilter("productName", e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <Button onClick={performSearch} disabled={isLoading}>
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </div>

              {/* Category Icons */}
              <div className="flex gap-4 mb-6">
                <VendorList/>
              </div>

              <SearchFiltersComponent
                searchFilters={searchFilters}
                filters={filters}
                updateFilter={updateFilter}
                clearAllFilters={clearAllFilters}
                performSearch={performSearch}
                isLoading={isLoading}
              />
            </div>

            <ProductResults searchResults={searchResults} />
          </div>
        </div>
      </div>
    </div>
  )
}

