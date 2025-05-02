"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { GiphyResult } from "@/lib/search.types"

type GiphyResultsProps = {
  results: GiphyResult[];
}

export default function GiphyResults({ results }: GiphyResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400">No GIFs found</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((result) => (
          <Card key={result.id} className="overflow-hidden">
            <CardContent className="p-2">
              <div className="relative aspect-square rounded-md overflow-hidden">
                <Image src={result.image || "/placeholder.svg"} alt={result.title} fill className="object-cover" />
              </div>
            </CardContent>
            <CardFooter className="p-2 pt-0 flex flex-col items-start gap-2">
              <p className="text-sm font-medium line-clamp-1">{result.title}</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => window.open(result.url, "_blank")}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View on GIPHY
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
