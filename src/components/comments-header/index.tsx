import { LinkIcon } from "../icons/link";

type HeaderProps = {
  author: string;
  title: string;
  text: string | null;
  url: string | null;
};

export const CommentsHeader = ({ title, url, text }: HeaderProps) => (
  <header className="mb-8 py-4">
    <h1 className="text-center text-lg mx-auto max-w-2xl p-4 rounded-t-md bg-pink-500 text-gray-100">
      {title}
    </h1>
    <section className="p-6 rounded-b-md shadow-sm bg-white dark:bg-gray-800 dark:border-gray-600 dark:border dark:border-t-0 overflow-x-clip">
      {url && (
        <a href={url} rel="noreferrer" className="flex justify-center">
          <LinkIcon />
          {new URL(url).hostname.replace(/^www\./i, "")}
        </a>
      )}
      {text && (
        <p
          className="my-4 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </section>
  </header>
);

export const CommentsHeaderSkeleton = () => (
  <header className="mb-8 py-4">
    <div className="mx-auto max-w-2xl p-4 text-xl rounded-t-md bg-pink-500">
      <div className="h-7"></div>
    </div>
    <div className="p-6 mb-6 rounded-b-md shadow-sm bg-white dark:bg-gray-800 dark:border-gray-600 dark:border dark:border-t-0">
      <div className="h-6"></div>
    </div>
  </header>
);
