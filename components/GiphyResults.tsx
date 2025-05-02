"use client"

import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { GiphyResult } from "@/types/search"
import NextLink from "next/link"

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
                <Image aria-describedby={`image-title-${result.id}`} src={result.images.fixed_height.url} alt={result.alt_text} fill className="object-cover" unoptimized />
              </div>
            </CardContent>
            <CardFooter className="p-2 pt-0 flex flex-col items-start gap-2">
                <h2 id={`image-title-${result.id}`} title={result.title} className="text-sm font-medium line-clamp-1 h-5" style={{ minHeight: '20px' }}>{result.title}</h2>
              <NextLink
                className={`${buttonVariants({ variant: "outline", size: "sm" })} w-full text-left`}
                role="link"
                href={result.url}
                target="_blank"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View on GIPHY
              </NextLink>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
