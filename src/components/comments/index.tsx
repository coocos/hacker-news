import { useParams } from "react-router-dom";
import { useStoryComments } from "../../hooks";
import { Spinner } from "../spinner";
import { Comment } from "../comment";
import { PropsWithChildren, useEffect, useRef } from "react";

type StoryProps = {
  author: string;
  title: string;
  text: string | null;
  url: string | null;
};

const StoryDescription = (story: StoryProps) => (
  <header className="mb-8 py-4">
    <h1 className="text-center text-xl mx-auto max-w-2xl p-4 rounded-t-md bg-pink-400 text-gray-100">
      {story.title}
    </h1>
    <section className="p-6 mb-6 rounded-b-md bg-white shadow-sm overflow-x-clip">
      {story.url && (
        <a href={story.url} rel="noreferrer" className="flex justify-center">
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
          {new URL(story.url).hostname.replace(/^www\./i, "")}
        </a>
      )}
      {story.text && (
        <p className="my-4" dangerouslySetInnerHTML={{ __html: story.text }} />
      )}
    </section>
  </header>
);

const CommentsWrapper = ({ children }: PropsWithChildren<unknown>) => (
  <div className="max-w-2xl mx-auto">{children}</div>
);

type UrlParams = {
  storyId: string;
};

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

  if (isLoading) {
    return (
      <CommentsWrapper>
        <Spinner />
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
      <StoryDescription {...story} />
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <Comment {...comment} />
            <hr className="my-4" />
          </div>
        ))}
      </div>
    </CommentsWrapper>
  );
};
