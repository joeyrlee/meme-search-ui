# Mini Search

A take-home exercise to build a search interface incorporating public APIs (Giphy and Wikipedia in my particular instance). The UX was inspired by Google with suggestions appearing in a popover while typing and then providing a more robust interface with tabs when the search is entered/submitted.
<img width="1299" alt="Screenshot 2025-06-17 at 12 13 45 PM (2)" src="https://github.com/user-attachments/assets/35936e9c-7de9-428e-9537-8e320e2ce6f6" />
<img width="1299" alt="Screenshot 2025-06-17 at 12 13 16 PM (2)" src="https://github.com/user-attachments/assets/55e2ee4c-d816-4c48-95b3-282dc510c8ab" />
<img width="1296" alt="Screenshot 2025-06-17 at 12 13 39 PM (2)" src="https://github.com/user-attachments/assets/4825cdce-6928-42e3-88e4-b27f7c2b8d05" />

You can see the project deployed with a rate-limited (beta) giphy api key at https://takehome-frontend-joeyl-navy.vercel.app/

To run locally:
1. Create a `.env.local` file and create a `GIPHY_API_KEY=<sign up for and put a giphy api key here>`
2. Run `npm install && npm run dev`

## Description
Build a React web application with a rich UI/UX that allows the user to search across a specific website

## Requirements
1. Receive user input and perform a search using a publicly accessible search API of your choice. Some examples:
- [Wikipedia](https://wikipedia.org)
- [Stack Overflow](https://stackoverflow.com)
- [GIPHY](https://giphy.com)
- [Spotify](https://spotify.com)
2. Thoughtful UI/UX design

## Bonus Points
- Extend search to multiple sites
- Cloud hosted and accessible for testing and evaluation


## Submission
- All code must be pushed to the repo

## Getting Started
The **Mini Search** app is bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the the app by modifying `app/page.tsx`. The page auto-updates as you edit the file.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel (Optional)

The easiest way to deploy your **Mini Search** app is deploying from the [Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli).

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
