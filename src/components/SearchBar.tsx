import React from 'react';
import { Search } from 'lucide-react';
import { useSearchContext } from '../context/SearchContext';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearchContext();

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search coins..."
        className="w-full bg-[#1a1b2e] text-gray-200 pl-10 pr-4 py-2 rounded-lg border border-[#2e305b] focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}