"use client"

import React, { useState, FormEvent } from 'react';
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {

      router.push(`/search?productName=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <div className="flex items-end transition-all duration-500 mx-auto">
      <form onSubmit={handleSearch} className="search-container border-2 border-gray-300 group">
        <div className="relative flex items-center">
          <Search className="absolute text-black pointer-events-none transition-all duration-300 ease-in-out 
            left-1/2 -translate-x-1/2 group-focus-within:left-4 group-focus-within:translate-x-0 w-4 h-4 md:w-5 md:h-5" />
          <Input
            type="search"
            placeholder="Rechercher des produits"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 md:pl-12 md:pr-4 md:py-3 bg-transparent border-0 text-black font-bold 
              placeholder-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 
              opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"
          />
        </div>
      </form>

      <style jsx>{`
        .search-container {
          background: #EFE3E4;
          backdrop-filter: blur(10px);
          border-radius: 9999px;
          width: 48px;
          overflow: hidden;
           transition: width 5s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-container:focus-within {
        transform: scaleX(1.05);
          width: 100%;
           transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .search-container:not(:focus-within) input::placeholder {
          opacity: 0;
        }

        .search-container input {
          cursor: pointer;
        }

        .search-container:focus-within input {
          cursor: text;
        }
      `}</style>
    </div>
  )
}
