'use server'

import { GiphyResult, WikipediaResult } from "@/types/search";

// the actual Giphy API response
type GiphyApiResponse = {
  data: GiphyResult[];
  pagination: any;
  meta: any;
}

// Wikipedia API response structure
type WikipediaApiResponse = {
  query: {
    search: Array<{
      pageid: number;
      title: string;
      snippet: string;
    }>;
  };
}

type SearchResults = {
  giphyData: GiphyResult[];
  wikipediaData: WikipediaResult[];
}

export async function search(query: string, limit: number = 20): Promise<SearchResults> {
  // Start both API requests in parallel
  const giphyPromise = fetchGiphyResults(query, limit);
  const wikipediaPromise = fetchWikipediaResults(query, limit);

  // Wait for both promises to resolve
  const [giphyData, wikipediaData] = await Promise.all([giphyPromise, wikipediaPromise]);

  // Return the combined results
  return {
    giphyData,
    wikipediaData
  };
}

async function fetchGiphyResults(query: string, limit: number): Promise<GiphyResult[]> {
  // throttled to 100 requests per hour not including a separate tps limit
  const key = process.env.GIPHY_API_KEY;
  const base_url = 'https://api.giphy.com/v1/gifs/search';

  const response = await fetch(`${base_url}?api_key=${key}&q=${query}&limit=${limit}`, {
    // cache the response for 60 seconds to avoid hitting the API too often and making redundant requests
    next: { revalidate: 60 },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch gifs: ${response.statusText}`);
  }
  
  const responseJson: GiphyApiResponse = await response.json();
  return responseJson.data;
}

async function fetchWikipediaResults(query: string, limit: number): Promise<WikipediaResult[]> {
  const base_url = 'https://en.wikipedia.org/w/api.php';
  
  const params = new URLSearchParams({
    action: 'query',
    list: 'search',
    srsearch: query,
    format: 'json',
    srlimit: limit.toString(),
    origin: '*',
  });

  const response = await fetch(`${base_url}?${params.toString()}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Wikipedia results: ${response.statusText}`);
  }

  const data: WikipediaApiResponse = await response.json();
  
  return data.query.search.map(item => ({
    id: item.pageid.toString(),
    title: item.title,
    snippet: item.snippet.replace(/<\/?[^>]+(>|$)/g, ""), // Remove HTML tags
    url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`,
  }));
}
