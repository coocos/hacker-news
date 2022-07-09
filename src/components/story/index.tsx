import { timeSince } from "../../utils";
import { Link } from "react-router-dom";

type StoryProps = {
  id: number;
  title: string;
  url: string | null;
  points: number;
  author: string;
  comments: number;
  time: Date;
};

export const Story = (story: StoryProps) => (
  <li className="my-4">
    <div className="flex">
      <div className="w-3/4 flex-1">
        <h2 className="font-medium">
          {story.url ? (
            <a
              href={story.url}
              target="_blank"
              rel="noreferrer"
              className="text-gray-600"
              data-testid="story-link"
            >
              {story.title}
            </a>
          ) : (
            <Link
              to={story.id.toString()}
              className="text-gray-600"
              data-testid="story-link"
            >
              {story.title}
            </Link>
          )}
        </h2>
        <div className="flex flex-wrap">
          {story.url && (
            <a
              href={story.url}
              target="_blank"
              rel="noreferrer"
              className="mr-3 text-gray-600 hover:underline"
              data-testid="origin-link"
            >
              {new URL(story.url).hostname.replace(/^www\./i, "")}
            </a>
          )}
          <span className="mr-3 text-gray-400">{story.author}</span>
          <span className="mr-3 text-gray-400">{timeSince(story.time)}</span>
        </div>
      </div>
      <div className="flex flex-col items-center pl-4">
        <Link
          className="p-3 h-12 w-12 rounded-md bg-pink-700 text-white transition ease-in-out hover:no-underline hover:motion-safe:-translate-y-1 hover:bg-pink-600 hover:after:text-pink-600 flex items-center justify-center after:content-['◀'] after:text-pink-700 after:absolute after:-translate-x-7"
          to={story.id.toString()}
          data-testid="comment-link"
        >
          {story.comments}
        </Link>
        <span className="my-1 text-xs text-pink-500">
          {story.points} points
        </span>
      </div>
    </div>
  </li>
);
