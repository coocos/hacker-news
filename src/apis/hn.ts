import { z } from "zod";

const StoriesApiResponse = z.object({
  hits: z
    .object({
      title: z.string(),
      url: z.string().nullable(),
      points: z.number(),
      author: z.string(),
      objectID: z.string().optional(),
      num_comments: z.number().nullable(),
      created_at: z.preprocess((arg) => {
        if (typeof arg == "string" || arg instanceof Date) {
          return new Date(arg);
        }
      }, z.date()),
    })
    .array(),
});

export type Story = {
  title: string;
  url: string | null;
  points: number;
  author: string;
  objectId?: string;
  numComments: number | null;
  createdAt: Date;
};

export async function getStories(): Promise<Story[]> {
  const response = await fetch(
    "http://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=40"
  );
  const json = await response.json();
  return StoriesApiResponse.parse(json).hits.map((story) => ({
    title: story.title,
    url: story.url,
    author: story.author,
    points: story.points,
    objectId: story.objectID,
    numComments: story.num_comments,
    createdAt: story.created_at,
  }));
}
