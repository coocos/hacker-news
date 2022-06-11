import { z } from "zod";

const Story = z.object({
  title: z.string(),
  url: z.string().nullable(),
  points: z.number(),
  author: z.string(),
  objectID: z.string().optional(),
  // TODO: Transform these to camel case
  num_comments: z.number().nullable(),
  created_at: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) {
      return new Date(arg);
    }
  }, z.date()),
});

const StoriesApiResponse = z.object({
  hits: Story.array(),
});

export type Story = z.infer<typeof Story>;

export async function getStories() {
  const response = await fetch(
    "http://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=40"
  );
  const json = await response.json();
  return StoriesApiResponse.parse(json).hits;
}
