import { useEffect, useState } from "react";
import { getPosts, getPostWithComments } from "../apis/hn";

type ApiResponse<T> =
  | {
      status: "loading";
    }
  | {
      status: "error";
    }
  | {
      status: "done";
      data: T;
    };

export function usePostWithComments(objectId: string) {
  const [response, setResponse] = useState<
    ApiResponse<Awaited<ReturnType<typeof getPostWithComments>>>
  >({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;
    async function fetchStories() {
      try {
        const discussion = await getPostWithComments(objectId);
        if (!cancelled) {
          setResponse({
            status: "done",
            data: discussion,
          });
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setResponse({
            status: "error",
          });
        }
      }
    }
    fetchStories();
    return () => {
      cancelled = true;
    };
  }, []);

  return response;
}

export function usePosts() {
  const [response, setResponse] = useState<
    ApiResponse<Awaited<ReturnType<typeof getPosts>>>
  >({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;
    async function fetchStories() {
      try {
        const stories = await getPosts();
        if (!cancelled) {
          setResponse({
            status: "done",
            data: stories,
          });
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setResponse({
            status: "error",
          });
        }
      }
    }
    fetchStories();
    return () => {
      cancelled = true;
    };
  }, []);

  return response;
}
