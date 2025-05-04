"use client"

import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { WikipediaResult } from "@/types/search"

type WikipediaResultsProps = {
  results: WikipediaResult[];
}

export default function WikipediaResults({ results }: WikipediaResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400">No Wikipedia results found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <Card key={result.id}>
          <CardHeader>
            <CardTitle className="text-lg"><h2>{result.title}</h2></CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">{result.snippet}</p>
          </CardContent>
          <CardFooter>
            <a
              aria-label={`${result.title} on Wikipedia`}
              className={`${buttonVariants({ variant: "outline", size: "sm" })} w-full text-left`}
              role="link"
              href={result.url}
              target="_blank"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Read on Wikipedia
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
