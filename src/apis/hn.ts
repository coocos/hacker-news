import { z } from "zod";

const API_URL = "https://hn.algolia.com/api/v1";

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

export type Story = Readonly<{
  title: string;
  url: string | null;
  points: number;
  author: string;
  objectId?: string;
  numComments: number | null;
  createdAt: Date;
}>;

export async function getStories(): Promise<Story[]> {
  const response = await fetch(
    `${API_URL}/search?tags=front_page&hitsPerPage=37`
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

type CommentsApiResponse = {
  id: number;
  title: string | null;
  points: number | null;
  author: string | null;
  text: string | null;
  url: string | null;
  created_at: Date;
  children: CommentsApiResponse[];
};

// zod can't handle recursive types without z.lazy
const CommentsApiResponse: z.ZodType<CommentsApiResponse> = z.lazy(() =>
  z.object({
    id: z.number(),
    title: z.string().nullable(),
    points: z.number().nullable(),
    author: z.string().nullable(),
    text: z.string().nullable(),
    url: z.string().nullable(),
    created_at: z.preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) {
        return new Date(arg);
      }
    }, z.date()),
    children: CommentsApiResponse.array(),
  })
);

export type Comment = {
  id: number;
  author: string | null;
  text: string | null;
  createdAt: Date;
  comments: Comment[];
};

function camelCased(comments: CommentsApiResponse[]): Comment[] {
  return comments.map(
    ({ id, points, author, text, created_at: createdAt, children }) => ({
      id,
      points,
      author,
      text,
      createdAt,
      comments: camelCased(children),
    })
  );
}

export async function getDiscussion(objectId: string) {
  const response = await fetch(`${API_URL}/items/${objectId}`);
  const json = await response.json();
  const {
    author,
    title,
    text,
    url,
    created_at: createdAt,
    children,
  } = CommentsApiResponse.parse(json);
  return {
    story: {
      author,
      text,
      title,
      url,
      createdAt,
    },
    comments: camelCased(children),
  };
}
