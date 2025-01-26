"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function SearchBar() {
  return (
    <div className="flex justify-center w-full max-w-3xl mx-auto">
      <div className="search-container group">
        <div className="relative flex items-center">
          <Search className="absolute text-gray-300 pointer-events-none transition-all duration-300 ease-in-out 
            left-1/2 -translate-x-1/2 group-focus-within:left-4 group-focus-within:translate-x-0 w-5 h-5" />
          <Input
            type="search"
            placeholder="Rechercher des produits"
            className="w-full pl-12 pr-4 py-3 bg-transparent border-0 text-gray-100 placeholder-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <style jsx>{`
        .search-container {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 9999px;
          width: 50px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

 
  input[type="search"]::-webkit-search-cancel-button {
    filter: invert(0);
  }

        .search-container:focus-within {
          width: 100%;
        }

        /* Cache le placeholder si la barre est rétractée */
        .search-container:not(:focus-within) input::placeholder {
          opacity: 0;
        }

        /* Animation du curseur */
        .search-container input {
          cursor: pointer;
        }

        .search-container:focus-within input {
          cursor: text;
        }

        /* Effet hover */
        .search-container:hover {
          background: rgba(0, 0, 0, 0.5);
        }

        /* Animation d'entrée/sortie */
        @keyframes expand {
          from { width: 50px; }
          to { width: 100%; }
        }

        @keyframes retract {
          from { width: 100%; }
          to { width: 50px; }
        }

        .search-container:focus-within {
          animation: expand 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .search-container:not(:focus-within) {
          animation: retract 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  )
}
