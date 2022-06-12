import { useStories } from "../../hooks";
import { Story } from "../../apis/hn";

function timeSince(date: Date) {
  const hoursSince = Math.max(
    1,
    Math.floor((new Date().valueOf() - date.valueOf()) / 36e5)
  );
  if (hoursSince == 1) {
    return "1 hour ago";
  }
  if (hoursSince < 24) {
    return `${hoursSince} hours ago`;
  }
  const daysSince = Math.floor(hoursSince / 24);
  return `${daysSince} days ago`;
}

function StoryItem({
  title,
  author,
  points,
  url,
  num_comments,
  created_at,
}: Story) {
  return (
    <li className="my-4">
      <div className="flex">
        <div className="w-3/4 flex-1">
          <h2>{title}</h2>
          <div className="flex text-gray-400">
            <span className="mr-3">{author}</span>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="mr-3 hover:underline"
              >
                {new URL(url).hostname.replace(/^www\./i, "")}
              </a>
            )}
            <span className="mr-3">{timeSince(created_at)}</span>
          </div>
        </div>
        <div>
          <div className="p-3 text-center bg-gray-400 text-white">
            {num_comments ?? 0}
          </div>
          <span className="text-sm">{points} points</span>
        </div>
      </div>
    </li>
  );
}

export function Stories() {
  const stories = useStories();
  return (
    <>
      {stories.status === "done" && (
        <ul>
          {stories.data.map((story) => (
            <StoryItem key={story.objectID} {...story} />
          ))}
        </ul>
      )}
      {stories.status === "loading" && <h1>Loading</h1>}
      {stories.status === "error" && <h1>Failed to load stories</h1>}
    </>
  );
}
