"use client"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import InstantSearchResults from "@/components/InstantSearchResults"
import { searchGiphy } from "@/lib/search"
import { GiphyResult } from "@/lib/search.types"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [showInstantResults, setShowInstantResults] = useState(false)
  const [isSearching] = useState(false)
  const [instantGiphyResults, setInstantGiphyResults] = useState<GiphyResult[]>([])
  const searchInputRef = useRef(null)

  // Fetch instant search results
  useEffect(() => {
    const fetchInstantResults = async () => {
      if (query.length > 0) {
        const giphyData = await searchGiphy(query, 8)
        // const wikipediaData = await searchWikipedia(debouncedQuery, 8)

        setInstantGiphyResults(giphyData)
        // setInstantWikipediaResults(wikipediaData)
        setShowInstantResults(true);
      } else {
        setShowInstantResults(false);
      }
    }

    fetchInstantResults()
  }, [query])

  // Handle full search
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // could perform a larger search on submit a la Google
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">MemeSearch</h1>

        <div className="relative" ref={searchInputRef}>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                aria-controls="instant-search-results"
                aria-label="Search for memes"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                autoCapitalize="none"
                role="combobox"
                // id="meme-search-input"
                aria-autocomplete="list"
                aria-expanded={showInstantResults}
                placeholder="Search for memes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
              {showInstantResults && (
                <InstantSearchResults
                  giphyResults={instantGiphyResults}
                />
              )}
            </div>
            <Button type="submit" disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
