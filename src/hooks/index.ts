import { useEffect } from "react";
import { useQuery } from "react-query";
import { getStories, getStoryWithComments } from "../apis/hn";

export function useStoryComments(id: string) {
  return useQuery(["storyComments", id], () => getStoryWithComments(id));
}

export function useStories() {
  return useQuery("stories", getStories);
}

export function useScrollToTop() {
  return useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}
