type HeaderProps = {
  author: string;
  title: string;
  text: string | null;
  url: string | null;
};

export const CommentsHeader = (props: HeaderProps) => (
  <header className="mb-8 py-4">
    <h1 className="text-center text-xl mx-auto max-w-2xl p-4 rounded-t-md bg-pink-400 text-gray-100">
      {props.title}
    </h1>
    <section className="p-6 mb-6 rounded-b-md bg-white shadow-sm overflow-x-clip">
      {props.url && (
        <a href={props.url} rel="noreferrer" className="flex justify-center">
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
          {new URL(props.url).hostname.replace(/^www\./i, "")}
        </a>
      )}
      {props.text && (
        <p className="my-4" dangerouslySetInnerHTML={{ __html: props.text }} />
      )}
    </section>
  </header>
);

export const CommentsHeaderSkeleton = () => (
  <header className="mb-8 py-4">
    <div className="mx-auto max-w-2xl p-4 text-xl rounded-t-md bg-pink-400">
      <div className="h-7"></div>
    </div>
    <div className="p-6 mb-6 rounded-b-md bg-white shadow-sm">
      <div className="h-6"></div>
    </div>
  </header>
);
