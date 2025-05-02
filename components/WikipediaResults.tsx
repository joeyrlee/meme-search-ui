"use client"

import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{result.title}</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">{result.snippet}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" onClick={() => window.open(result.url, "_blank")}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Read on Wikipedia
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
