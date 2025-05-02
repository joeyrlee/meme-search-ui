"use client"

import Image from "next/image"
import { Search } from "lucide-react"
import { GiphyResult } from "@/types/search"

type InstantSearchResultsProps = {
  giphyResults: GiphyResult[];
  onResultClick: (title: string) => void;
};

export default function InstantSearchResults({ giphyResults, onResultClick }: InstantSearchResultsProps) {
  const hasResults = giphyResults.length > 0;

  if (!hasResults) return null

  return (
    <div id="instant-search-results" className="absolute z-50 top-full left-0 right-0 mt-1 bg-white dark:bg-gray-950 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="p-2">
        {giphyResults.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium px-2 py-1 flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <Search className="w-3 h-3" /> GIPHY Results
            </h3>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {giphyResults.map((result) => (
                <div
                  key={result.id}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => onResultClick(result.title)}
                >
                  <div className="relative h-20 w-full rounded overflow-hidden">
                    <Image src={result.images.fixed_height.url} alt={result.title} fill className="object-cover" unoptimized />
                  </div>
                  <p className="text-xs mt-1 truncate">{result.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
