import { useParams } from "react-router-dom";
import { usePostWithComments as useComments } from "../../hooks";
import { timeSince } from "../../utils";
import { Spinner } from "../spinner";

type CommentProps = {
  id: number;
  author: string | null;
  text: string | null;
  createdAt: Date;
  comments: CommentProps[];
  depth: number;
};

function Comment(comment: CommentProps) {
  return (
    <div
      className={
        comment.depth === 0
          ? "my-6"
          : "pl-4 my-6 border-l border-dashed border-gray-300"
      }
    >
      <div className="pb-2 flex items-center text-pink-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
        <span className="ml-2">{comment.author}</span>
        <span className="ml-auto">{timeSince(comment.createdAt)}</span>
      </div>
      <div>
        {comment.text ? (
          <p
            dangerouslySetInnerHTML={{ __html: comment.text }}
            className="text-gray-600"
          />
        ) : (
          <p className="text-gray-400">[deleted]</p>
        )}
      </div>
      {comment.comments.length
        ? comment.comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))
        : null}
    </div>
  );
}

// FIXME: These props look weird, the hook should not return nullable titles etc
type PostProps = {
  author: string | null;
  title: string | null;
  text: string | null;
  url: string | null;
};

function PostDescription(post: PostProps) {
  return (
    <header className="mb-8 py-4">
      <h1 className="text-center text-xl mx-auto max-w-2xl p-4 rounded-t-md bg-pink-400 text-gray-100">
        {post.title}
      </h1>
      <section className="p-6 mb-6 rounded-b-md bg-white shadow-sm overflow-x-clip">
        {post.url && (
          <a href={post.url} rel="noreferrer" className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            {new URL(post.url).hostname.replace(/^www\./i, "")}
          </a>
        )}
        {post.text && (
          <p className="my-4" dangerouslySetInnerHTML={{ __html: post.text }} />
        )}
      </section>
    </header>
  );
}

export function Comments() {
  const params = useParams();
  if (!params.storyId) {
    return <div className="max-w-2xl mx-auto">No story found!</div>;
  }
  const { isLoading, error, data } = useComments(params.storyId);
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <Spinner />
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="max-w-2xl mx-auto">Oops, something went went wrong.</div>
    );
  }

  const { story, comments } = data;
  return (
    <div className="max-w-2xl mx-auto">
      <PostDescription {...story} />
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <Comment {...comment} />
            <hr className="my-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
