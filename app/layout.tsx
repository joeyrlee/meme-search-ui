import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meme gif search",
  description: "Search for meme gifs using Giphy and Wikipedia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
