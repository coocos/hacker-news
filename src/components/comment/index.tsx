import { timeSince } from "../../utils";

type CommentProps = {
  id: number;
  author: string | null;
  text: string | null;
  time: Date;
  comments: CommentProps[];
  depth: number;
};

export const CommentSkeleton = () => (
  <div className="my-6 animate-pulse">
    <div className="pb-2 flex items-center">
      <div className="h-4 w-16 rounded-lg bg-pink-600"></div>
    </div>
    <div>
      <div className="w-full h-4 my-6 rounded-lg bg-gray-300"></div>
      <div className="w-full h-4 my-6 rounded-lg bg-gray-300"></div>
    </div>
  </div>
);

export const Comment = (comment: CommentProps) => (
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
      <span className="ml-auto">{timeSince(comment.time)}</span>
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
