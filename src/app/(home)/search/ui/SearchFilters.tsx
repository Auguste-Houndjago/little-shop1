import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { X } from 'lucide-react'; // Import X icon for clear buttons

import { 
  Category, 
  Tag, 
  VendorProfile 
} from '@prisma/client';
import { SearchFilters } from '../_actions/search-actions';

interface SearchFiltersProps {
  searchFilters: {
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
  };
  filters: SearchFilters;
  updateFilter: (key: keyof SearchFilters, value: string | number | undefined) => void;
  clearAllFilters: () => void; 
  performSearch: () => void;
  isLoading: boolean;
}

export function SearchFiltersComponent({
  searchFilters, 
  filters, 
  updateFilter, 
  clearAllFilters, 
  performSearch,
  isLoading
}: SearchFiltersProps) {
  // Helper function to check if any filters are applied
  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

  return (
    <div className="space-y-4">
      {/* Clear All Filters Button - Only show if there are active filters */}
      {hasActiveFilters && (
        <div className="mb-4">
          <Button 
            variant="outline" 
            onClick={clearAllFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" /> Clear All Filters
          </Button>
        </div>
      )}

      {/* New Sorting Select */}
      <div className="flex items-center space-x-2">
        <label className="text-sm text-gray-600">Sort by:</label>
        <Select 
          value={filters.sortBy || 'featured'}
          onValueChange={(value) => {
            updateFilter('sortBy', value);
            performSearch();
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort Products" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Product Name Filter with Clear Button */}
        <div className="relative">
          <Input 
            placeholder="Search by product name" 
            value={filters.productName || ''}
            onChange={(e) => updateFilter('productName', e.target.value)}
          />
          {filters.productName && (
            <button 
              onClick={() => updateFilter('productName', undefined)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear product name filter"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Filter with Clear Button */}
        <div className="relative">
          <Select 
            onValueChange={(value) => updateFilter('categoryId', value)}
            value={filters.categoryId || ''}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {searchFilters.categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {filters.categoryId && (
            <button 
              onClick={() => updateFilter('categoryId', undefined)}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear category filter"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Vendor Name Filter with Clear Button */}
        <div className="relative">
          <Select 
            onValueChange={(value) => updateFilter('vendorBusinessName', value)}
            value={filters.vendorBusinessName || ''}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Vendor" />
            </SelectTrigger>
            <SelectContent>
              {searchFilters.vendorProfiles.map((vendor) => (
                <SelectItem key={vendor.id} value={vendor.businessName || ''}>
                  {vendor.businessName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {filters.vendorBusinessName && (
            <button 
              onClick={() => updateFilter('vendorBusinessName', undefined)}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear vendor name filter"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Location Filters (Country, Region, City) with Clear Buttons */}
        <div className="relative">
          <Select 
            onValueChange={(value) => updateFilter('vendorCountry', value)}
            value={filters.vendorCountry || ''}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              {searchFilters.locations.countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {filters.vendorCountry && (
            <button 
              onClick={() => updateFilter('vendorCountry', undefined)}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear country filter"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="relative">
          <Select 
            onValueChange={(value) => updateFilter('vendorRegion', value)}
            value={filters.vendorRegion || ''}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              {searchFilters.locations.regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {filters.vendorRegion && (
            <button 
              onClick={() => updateFilter('vendorRegion', undefined)}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear region filter"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="relative">
          <Select 
            onValueChange={(value) => updateFilter('vendorCity', value)}
            value={filters.vendorCity || ''}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              {searchFilters.locations.cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {filters.vendorCity && (
            <button 
              onClick={() => updateFilter('vendorCity', undefined)}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear city filter"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Tag Filter with Clear Button */}
        <div className="relative">
          <Select 
            onValueChange={(value) => updateFilter('tagName', value)}
            value={filters.tagName || ''}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Tag" />
            </SelectTrigger>
            <SelectContent>
              {searchFilters.tags.map((tag) => (
                <SelectItem key={tag.id} value={tag.name}>
                  {tag.name} ({tag.category})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {filters.tagName && (
            <button 
              onClick={() => updateFilter('tagName', undefined)}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear tag filter"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Price Range Filters with Clear Buttons */}
        <div className="flex gap-2 relative">
          <div className="relative w-full">
            <Input 
              type="number" 
              placeholder="Min Price" 
              value={filters.minPrice || ''}
              onChange={(e) => updateFilter('minPrice', Number(e.target.value) || undefined)}
            />
            {filters.minPrice !== undefined && (
              <button 
                onClick={() => updateFilter('minPrice', undefined)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear minimum price filter"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="relative w-full">
            <Input 
              type="number" 
              placeholder="Max Price" 
              value={filters.maxPrice || ''}
              onChange={(e) => updateFilter('maxPrice', Number(e.target.value) || undefined)}
            />
            {filters.maxPrice !== undefined && (
              <button 
                onClick={() => updateFilter('maxPrice', undefined)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear maximum price filter"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <Button 
          onClick={performSearch} 
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </div>
  );
}