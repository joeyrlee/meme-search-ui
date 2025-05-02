// This is a stub implementation for demonstration purposes
// In a real application, you would use the actual GIPHY (and Wikipedia) API

import { GiphyResult } from "./search.types"

// Mock/stubbed data for GIPHY
const mockGiphyData = [
  {
    id: "1",
    title: "Surprised Pikachu",
    image: "/placeholder.svg?height=300&width=300",
    url: "https://giphy.com/gifs/surprised-pikachu-6nWhy3ulBL7GSCvKw6",
  },
  {
    id: "2",
    title: "This is Fine Dog",
    image: "/placeholder.svg?height=300&width=300",
    url: "https://giphy.com/gifs/this-is-fine-QMHoU66sBXqqLqYvGO",
  },
  {
    id: "3",
    title: "Distracted Boyfriend",
    image: "/placeholder.svg?height=300&width=300",
    url: "https://giphy.com/gifs/moodman-monkey-side-eye-sideeye-H5C8CevNMbpBqNqFjl",
  },
  {
    id: "4",
    title: "Roll Safe Think About It",
    image: "/placeholder.svg?height=300&width=300",
    url: "https://giphy.com/gifs/culture--think-hmm-d3mlE7uhX8KFgEmY",
  },
  {
    id: "5",
    title: "Blinking Guy",
    image: "/placeholder.svg?height=300&width=300",
    url: "https://giphy.com/gifs/mashable-l3q2K5jinAlChoCLS",
  },
  {
    id: "6",
    title: "Woman Yelling at Cat",
    image: "/placeholder.svg?height=300&width=300",
    url: "https://giphy.com/gifs/reaction-mood-1hM7Ldvcpps01Cwles",
  },
  {
    id: "7",
    title: "Disaster Girl",
    image: "/placeholder.svg?height=300&width=300",
    url: "https://giphy.com/gifs/fire-disaster-girl-13HgwGsXF0aiGY",
  },
  {
    id: "8",
    title: "Hide the Pain Harold",
    image: "/placeholder.svg?height=300&width=300",
    url: "https://giphy.com/gifs/awkward-smile-hide-the-pain-harold-l0HlvtIPzPdt2usKs",
  },
]

// Simulate API calls with filtering based on query
export async function searchGiphy(query: string, limit = 10): Promise<GiphyResult[]> {
  // In a real app, you would call the GIPHY API here
  // Example: const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${query}&limit=${limit}`);

  // For demonstration, we'll filter our mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockGiphyData
        .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
        .slice(0, limit)
      resolve(results)
    }, 300) // Simulate network delay
  })
}
