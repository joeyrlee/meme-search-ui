'use server'

import { GiphyResult } from "@/types/search";

// the actual Giphy API response
interface GiphyApiResponse {
  data: GiphyResult[];
  pagination: any;
  meta: any;
}

export async function search(query: string, limit: number = 20): Promise<GiphyResult[]> {
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
