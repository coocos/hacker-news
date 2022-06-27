import { useQuery } from "react-query";
import { getPosts, getPostWithComments } from "../apis/hn";

export function usePostWithComments(objectId: string) {
  return useQuery(["postWithComments", objectId], () =>
    getPostWithComments(objectId)
  );
}

export function usePosts() {
  return useQuery("posts", getPosts);
}
