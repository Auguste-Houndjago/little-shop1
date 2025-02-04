"use client";

import { MoveRightIcon, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

export default function SearchBar() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedQuery = searchInputRef.current?.value.trim();
    if (trimmedQuery) {
      router.push(`/search?productName=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center w-fit focus-within:w-fit border-2 rounded-full border-gray-300/60 bg-background/80 shadow-md transition-all duration-500 ease-in-out"
    >
      <Search className="absolute left-3 pointer-events-none h-4 w-4 text-gray-500" />
      <input
        type="search"
        placeholder="Search..."
        ref={searchInputRef} 
        className="h-10 w-8 pl-6 focus:pl-10 pr-4 rounded-full placeholder:text-gray-200 focus:placeholder:text-gray-500 bg-background text-sm text-gray-700 outline-none transition-all duration-1000 ease-in-out focus:w-40 md:focus:w-64"
      />
      <button title="submit"
        type="submit"
        className="ml-2 px-2 py-2 text-white bg-blue-200 rounded-full hidden md:hidden"
      >
        <MoveRightIcon />
      </button>
    </form>
  );
}
