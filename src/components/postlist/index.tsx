import { usePosts as usePosts } from "../../hooks";
import { Post } from "../post";

export function PostList() {
  const { isLoading, error, data } = usePosts();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error || !data) {
    return <div>Oops, failed to load stories</div>;
  }

  return (
    <ul>
      {data.map((story) => (
        <Post key={story.objectId} {...story} />
      ))}
    </ul>
  );
}
