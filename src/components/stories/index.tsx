import { useStories } from "../../hooks";
import { Header } from "../header";
import { Story, StorySkeleton } from "../story";
import { PropsWithChildren } from "react";
import { Footer } from "../footer";

const StoriesWrapper = ({ children }: PropsWithChildren<unknown>) => (
  <>
    <Header />
    <div className="max-w-2xl mx-auto text-gray-700">
      {children}
      <Footer />
    </div>
  </>
);

export const Stories = () => {
  const { isLoading, error, data } = useStories();

  if (isLoading) {
    return (
      <StoriesWrapper>
        <ul>
          {Array.from(Array(20).keys()).map((key) => (
            <StorySkeleton key={key} />
          ))}
        </ul>
      </StoriesWrapper>
    );
  }

  if (error || !data) {
    console.error(error);
    return (
      <StoriesWrapper>
        <h1 className="text-xl">Oops, failed to load stories</h1>;
      </StoriesWrapper>
    );
  }

  return (
    <StoriesWrapper>
      <ul>
        {data.map((story) => (
          <Story key={story.id} {...story} />
        ))}
      </ul>
    </StoriesWrapper>
  );
};
