import { timeSince } from "../../utils";
import { Link } from "react-router-dom";

type StoryProps = {
  id: number;
  title: string;
  url?: string;
  points: number;
  author: string;
  comments: number;
  time: Date;
};

export const StorySkeleton = () => (
  <li className="my-4 animate-pulse">
    <div className="flex">
      <div className="w-3/4 flex-1">
        <div className="bg-gray-300 dark:bg-gray-700 w-3/4 h-4 rounded-md"></div>
        <div className="bg-gray-300 dark:bg-gray-700 w-1/2 h-4 my-1 rounded-md"></div>
      </div>
      <div className="flex flex-col items-center pl-4 pr-2 opacity-50">
        <div className="p-3 h-12 w-12 rounded-md bg-pink-500 flex items-center justify-center before:content-[''] before:border-transparent before:border-r-pink-500 before:border-solid before:border-r-[0.75rem] before:border-t-[0.5rem] before:border-b-[0.5rem] before:absolute before:-translate-x-[1.75rem]"></div>
        <div className="my-1 text-xs rounded-md bg-pink-500 h-4 w-full"></div>
      </div>
    </div>
  </li>
);

export const Story = ({
  url,
  title,
  id,
  author,
  time,
  points,
  comments,
}: StoryProps) => (
  <li className="my-4">
    <div className="flex">
      <div className="w-3/4 flex-1">
        <h2 className="font-medium">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 dark:text-gray-200"
              data-testid="story-link"
            >
              {title}
            </a>
          ) : (
            <Link
              to={id.toString()}
              className="text-gray-600 dark:text-gray-200"
              data-testid="story-link"
            >
              {title}
            </Link>
          )}
        </h2>
        <div className="flex flex-wrap">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="mr-3 text-gray-600 dark:text-gray-200 hover:underline"
              data-testid="origin-link"
            >
              {new URL(url).hostname.replace(/^www\./i, "")}
            </a>
          )}
          <span className="mr-3 text-gray-400 dark:text-gray-400">
            {author}
          </span>
          <span className="mr-3 text-gray-400 dark:text-gray-400">
            {timeSince(time)}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center pl-4">
        <Link
          className="p-3 h-12 w-12 rounded-md bg-pink-500 text-white dark:text-white transition ease-in-out hover:no-underline hover:motion-safe:-translate-y-1 flex items-center justify-center before:content-[''] before:border-transparent before:border-r-pink-500 before:border-solid before:border-r-[0.75rem] before:border-t-[0.5rem] before:border-b-[0.5rem] before:absolute before:-translate-x-[1.75rem]"
          to={id.toString()}
          data-testid="comment-link"
        >
          {comments}
        </Link>
        <span className="my-1 text-xs text-gray-600 dark:text-gray-200">
          {points} points
        </span>
      </div>
    </div>
  </li>
);
