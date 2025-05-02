export type GiphyResult = {
  id: string;
  title: string;
  images: { fixed_height: { url: string } }; //there are many image variations, but we only need one
  url: string;
  alt_text: string;
};
