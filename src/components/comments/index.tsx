import { useParams } from "react-router-dom";
import { useScrollToTop, useStoryComments } from "../../hooks";
import { Comment, CommentSkeleton } from "../comment";
import { PropsWithChildren, useEffect, useRef } from "react";
import { CommentsHeader, CommentsHeaderSkeleton } from "../comments-header";

type UrlParams = {
  storyId: string;
};

const CommentsWrapper = ({ children }: PropsWithChildren<unknown>) => (
  <div className="max-w-2xl mx-auto">{children}</div>
);

export const Comments = () => {
  const { storyId } = useParams<UrlParams>() as UrlParams;

  const { isLoading, error, data } = useStoryComments(storyId);
  const title = useRef(document.title);
  useEffect(() => {
    const original = title.current;
    if (data) {
      document.title = data.story.title;
    }
    return () => {
      document.title = original;
    };
  }, [data]);
  useScrollToTop();

  if (isLoading) {
    return (
      <CommentsWrapper>
        <CommentsHeaderSkeleton />
        <div>
          {Array.from(Array(5).keys()).map((key) => (
            <div key={key}>
              <CommentSkeleton />
              <hr className="my-4 dark:border-gray-500" />
            </div>
          ))}
        </div>
      </CommentsWrapper>
    );
  }
  if (error || !data) {
    console.error(error);
    return (
      <CommentsWrapper>
        <h1 className="text-xl">Oops, something went wrong!</h1>
      </CommentsWrapper>
    );
  }

  const { story, comments } = data;
  return (
    <CommentsWrapper>
      <CommentsHeader {...story} />
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <Comment {...comment} />
            <hr className="my-4 dark:border-gray-500" />
          </div>
        ))}
      </div>
    </CommentsWrapper>
  );
};
