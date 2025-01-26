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
import { X, Search, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SearchFilters } from '../_actions/search-actions';

interface SearchFiltersProps {
  searchFilters: {
    categories: any[];
    tags: any[];
    vendorProfiles: any[];
    locations: {
      countries: string[];
      regions: string[];
      cities: string[];
    }
  };
  filters: any;
  updateFilter: (key: keyof SearchFilters, value: string | number | undefined) => void;
  clearAllFilters: () => void;
  performSearch: () => void;
  isLoading: boolean;
}

export function  SearchSidebar({
  searchFilters, 
  filters, 
  updateFilter, 
  clearAllFilters,
  performSearch,
  isLoading
}: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

  return (
    <div className={cn(
      "fixed left-0 top-0 h-screen transition-all duration-300 ease-in-out",
      "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg",
      "border-r border-gray-200 dark:border-gray-800",
      "shadow-xl",
      isExpanded ? "w-80" : "w-20"
    )}>
      <div className="h-full flex flex-col p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={cn(
            "font-semibold transition-all duration-300",
            isExpanded ? "text-xl" : "text-sm rotate-90 mt-8"
          )}>
            {isExpanded ? "Search Filters" : "Filters"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Content - Only show when expanded */}
        <div className={cn(
          "flex-1 overflow-y-auto space-y-4",
          isExpanded ? "opacity-100" : "opacity-0 hidden"
        )}>
          {/* Search Input */}
          <div className="relative">
            <Input 
              placeholder="Search products..."
              value={filters.productName || ''}
              onChange={(e) => updateFilter('productName', e.target.value)}
              className="pl-9"
            />
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {filters.productName && (
              <button  about='ddd' title='ddd'
                onClick={() => updateFilter('productName', undefined)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              onClick={clearAllFilters}
              className="w-full justify-between"
            >
              Clear All Filters
              <X className="h-4 w-4" />
            </Button>
          )}

          {/* Category Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
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
          </div>

          {/* Location Filters */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <div className="space-y-2">
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
            </div>
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

          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Price Range</label>
            <div className="grid grid-cols-2 gap-2">
              <Input 
                type="number" 
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) => updateFilter('minPrice', Number(e.target.value) || undefined)}
              />
              <Input 
                type="number" 
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e) => updateFilter('maxPrice', Number(e.target.value) || undefined)}
              />
            </div>
          </div>

          {/* Search Button */}
          <Button 
            onClick={performSearch} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Searching...' : 'Apply Filters'}
          </Button>
        </div>

        {/* Minimized View */}
        {!isExpanded && (
          <div className="flex flex-col items-center space-y-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateFilter('productName', undefined)}
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Search className="h-5 w-5" />
            </Button>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearAllFilters}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}