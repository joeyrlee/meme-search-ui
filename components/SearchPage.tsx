"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import InstantSearchResults from "@/components/InstantSearchResults"
import GiphyResults from "@/components/GiphyResults"
import { GiphyResult } from "@/types/search"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { search } from "@/actions/search"
import debounce from "lodash/debounce"

export default function SearchPage() {
  // TODO: refactor into a custom hook
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [showInstantResults, setShowInstantResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [giphyResults, setGiphyResults] = useState<GiphyResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [instantGiphyResults, setInstantGiphyResults] = useState<GiphyResult[]>([])
  const searchInputRef = useRef<HTMLDivElement>(null)

  // Create a debounced function that updates debouncedQuery
  const debouncedSetQuery = useCallback(
    debounce((value: string) => {
      setDebouncedQuery(value)
    }, 100), // reasonable lower bound for debounce
    []
  )

  // Update debounced value when query changes
  useEffect(() => {
    debouncedSetQuery(query)
    
    // Cancel the debounce on cleanup
    return () => {
      debouncedSetQuery.cancel()
    }
  }, [query, debouncedSetQuery])

  // Fetch instant search results
  useEffect(() => {
    const fetchInstantResults = async () => {
      if (debouncedQuery.length > 0) {
        const giphyData = await search(debouncedQuery, 8)
        // const wikipediaData = await searchWikipedia(debouncedQuery, 8)

        setInstantGiphyResults(giphyData)
        // setInstantWikipediaResults(wikipediaData)
        setShowInstantResults(true);
      } else {
        setShowInstantResults(false);
      }
    }

    fetchInstantResults()
  }, [debouncedQuery])

  // Handle full search
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)
    setShowInstantResults(false)
    setHasSearched(true)

    try {
      const [giphyData/*, wikipediaData*/] = await Promise.all([search(query, 20)/*, searchWikipedia(query, 10)*/])
      console.log("Giphy data:", giphyData)

      setGiphyResults(giphyData)
      // setWikipediaResults(wikipediaData)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsSearching(false)
    }
  }

  // Handle click outside to close instant results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
      searchInputRef.current && 
      !searchInputRef.current.contains(event.target as Node)
      ) {
      setShowInstantResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
                  // wikipediaResults={instantWikipediaResults}
                  onResultClick={(selectedQuery) => {
                    setQuery(selectedQuery)
                    setShowInstantResults(false)
                    // Trigger search with the selected query
                    search(selectedQuery, 20).then(setGiphyResults)
                    // searchWikipedia(selectedQuery, 10).then(setWikipediaResults)
                    setHasSearched(true)
                  }}
                />
              )}
            </div>
            <Button type="submit" disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </form>
        </div>

        {hasSearched && (
          <div className="mt-8">
            <Tabs defaultValue="giphy" className="w-full">
              <TabsList className="w-full" /*className="grid w-full grid-cols-2"*/>
                <TabsTrigger value="giphy">GIPHY Results</TabsTrigger>
                {/* <TabsTrigger value="wikipedia">Wikipedia Context</TabsTrigger> */}
              </TabsList>
              <TabsContent value="giphy" className="mt-4">
                <GiphyResults results={giphyResults} />
              </TabsContent>
              {/* <TabsContent value="wikipedia" className="mt-4">
                <WikipediaResults results={wikipediaResults} query={query} />
              </TabsContent> */}
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
