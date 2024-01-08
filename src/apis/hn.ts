import { z } from "zod";

const API_URL = "https://hn.algolia.com/api/v1";

type Story = {
  id: number;
  title: string;
  url?: string;
  author: string;
  points: number;
  comments: number;
  time: Date;
};

type Comment = {
  id: number;
  author?: string;
  text?: string;
  time: Date;
  comments: Comment[];
  depth: number;
};

const StoryListApiResponse = z.object({
  hits: z
    .object({
      title: z.string(),
      url: z.string().optional(),
      points: z.number().optional(),
      author: z.string(),
      objectID: z.preprocess((arg) => {
        if (typeof arg === "string") {
          return parseInt(arg);
        }
      }, z.number()),
      num_comments: z.number().optional(),
      created_at: z.preprocess((arg) => {
        if (typeof arg === "string") {
          return new Date(arg);
        }
      }, z.date()),
    })
    .array(),
});

export async function getStories(): Promise<Story[]> {
  const response = await fetch(
    `${API_URL}/search?tags=front_page&hitsPerPage=37`
  );
  const json = await response.json();
  return StoryListApiResponse.parse(json)
    .hits.map((story) => ({
      title: story.title,
      url: story.url,
      author: story.author,
      points: story.points ?? 0,
      id: story.objectID,
      comments: story.num_comments ?? 0,
      time: story.created_at,
    }))
    .filter(
      // Algolia occasionally returns ancient front page stories so filter them out
      (story) => story.time >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );
}

type CommentItemApiResponse = {
  id: number;
  author?: string;
  text?: string;
  created_at: Date;
  children: CommentItemApiResponse[];
};

const CommentItem: z.ZodType<CommentItemApiResponse> = z.lazy(() =>
  z.object({
    id: z.number(),
    author: z.string(),
    text: z.string().optional(),
    created_at: z.preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) {
        return new Date(arg);
      }
    }, z.date()),
    children: CommentItem.array(),
  })
);

const StoryItemApiResponse = z.object({
  id: z.number(),
  title: z.string(),
  points: z.number().nullable(),
  author: z.string(),
  text: z.string().nullable(),
  url: z.string().optional(),
  created_at: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) {
      return new Date(arg);
    }
  }, z.date()),
  children: CommentItem.array(),
});

function remapCommentFormat(
  comments: CommentItemApiResponse[],
  depth = 0
): Comment[] {
  return comments.map(
    ({ id, author, text, created_at: createdAt, children }) => ({
      id,
      author,
      text,
      time: createdAt,
      depth,
      comments: remapCommentFormat(children, depth + 1),
    })
  );
}

export async function getStoryWithComments(id: string | number): Promise<{
  story: Omit<Story, "comments"> & { text?: string };
  comments: Comment[];
}> {
  const response = await fetch(`${API_URL}/items/${id}`);
  const story = StoryItemApiResponse.parse(await response.json());
  return {
    story: {
      id: story.id,
      author: story.author,
      text: story.text ?? "",
      title: story.title,
      url: story.url,
      time: story.created_at,
      points: story.points ?? 0,
    },
    comments: remapCommentFormat(story.children),
  };
}
