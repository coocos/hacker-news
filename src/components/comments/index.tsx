import { useParams } from "react-router-dom";
import { useDiscussion as useComments } from "../../hooks";

type Props = {
  id: number;
  author: string | null;
  text: string | null;
  comments: Props[];
};

function Comment(comment: Props) {
  return (
    <div className="p-4 border-l-2 border-dashed">
      <div className="flex content-center text-pink-800">
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
      </div>
      <div>
        <p
          dangerouslySetInnerHTML={{ __html: comment.text || "" }}
          className="text-gray-600"
        />
      </div>
      {comment.comments.length
        ? comment.comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))
        : null}
    </div>
  );
}

export function Comments() {
  const params = useParams();
  if (!params.storyId) {
    return <h2>No story found</h2>;
  }
  const storyWithComments = useComments(params.storyId);
  if (storyWithComments.status !== "done") {
    return null;
  }
  const { story, comments } = storyWithComments.data;
  return (
    <div>
      <header className="max-w-5xl mx-auto">
        <h1>{story.title}</h1>
        <h2>{story.author}</h2>
        <h2>{story.text}</h2>
        {story.url && (
          <a href={story.url} rel="noreferrer">
            {story.url}
          </a>
        )}
      </header>
      <div className="max-w-5xl mx-auto">
        {comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  );
}
