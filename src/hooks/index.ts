import { useEffect, useState } from "react";
import { getStories, getDiscussion } from "../apis/hn";

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

export function useDiscussion(objectId: string) {
  const [response, setResponse] = useState<
    ApiResponse<Awaited<ReturnType<typeof getDiscussion>>>
  >({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;
    async function fetchStories() {
      try {
        const discussion = await getDiscussion(objectId);
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

export function useStories() {
  const [response, setResponse] = useState<
    ApiResponse<Awaited<ReturnType<typeof getStories>>>
  >({
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;
    async function fetchStories() {
      try {
        const stories = await getStories();
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
