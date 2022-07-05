import { usePosts as usePosts } from "../../hooks";
import { Header } from "../header";
import { Post } from "../post";
import { Spinner } from "../spinner";

export function PostList() {
  const { isLoading, error, data } = usePosts();

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="max-w-2xl mx-auto text-gray-700">
          <Spinner />
        </div>
      </>
    );
  }

  if (error || !data) {
    return <div>Oops, failed to load stories</div>;
  }

  return (
    <>
      <Header />
      <ul className="max-w-2xl mx-auto">
        {data.map((story) => (
          <Post key={story.objectId} {...story} />
        ))}
      </ul>
    </>
  );
}
