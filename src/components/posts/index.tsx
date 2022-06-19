import { usePosts as usePosts } from "../../hooks";
import { timeSince } from "../../utils";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  url: string | null;
  points: number;
  author: string;
  objectId?: string;
  numComments: number | null;
  createdAt: Date;
};

function Post(post: Props) {
  return (
    <li className="my-4">
      <div className="flex">
        <div className="w-3/4 flex-1">
          <h2>
            {post.url ? (
              <a
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="text-gray-600"
              >
                {post.title}
              </a>
            ) : (
              <Link to={post.objectId ?? ""} className="text-gray-600">
                {post.title}
              </Link>
            )}
          </h2>
          <div className="flex text-gray-400">
            <span className="mr-3">{post.author}</span>
            {post.url && (
              <a
                href={post.url}
                target="_blank"
                rel="noreferrer"
                className="mr-3 text-gray-600 hover:underline"
              >
                {new URL(post.url).hostname.replace(/^www\./i, "")}
              </a>
            )}
            <span className="mr-3">{timeSince(post.createdAt)}</span>
          </div>
        </div>
        <div>
          <div className="p-3 text-center bg-gray-400">
            <Link to={post.objectId ?? ""} className="text-white">
              {post.numComments ?? 0}
            </Link>
          </div>
          <span className="text-sm">{post.points} points</span>
        </div>
      </div>
    </li>
  );
}

export function Posts() {
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
