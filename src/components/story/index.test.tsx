import { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { Story } from ".";

type WrapperProps = {
  children: ReactNode;
};

const wrapper = ({ children }: WrapperProps) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={client}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe("Story", () => {
  const story = {
    title: "Deflation",
    time: new Date("2022-06-16T21:51:59.000Z"),
    url: "https://en.wikipedia.org/wiki/Deflation",
    author: "keynes",
    points: 6,
    comments: 2,
    id: 31771441,
  };

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2022-06-16T23:52:00.000Z"));
  });

  afterAll(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("links to origin in title", () => {
    render(<Story {...story} />, { wrapper });

    const link = screen.getByTestId("story-link");
    expect(link).toHaveAttribute("href", story.url);
    expect(link).toHaveTextContent(story.title);
  });

  test("links to origin in domain", () => {
    render(<Story {...story} />, { wrapper });

    const link = screen.getByTestId("origin-link");
    expect(link).toHaveAttribute("href", story.url);
    expect(link).toHaveTextContent("en.wikipedia.org");
  });

  test("shows amount of comments", () => {
    render(<Story {...story} />, { wrapper });
    expect(screen.getByText(story.comments)).toBeInTheDocument();
  });

  test("links to comments", () => {
    render(<Story {...story} />, { wrapper });
    const comments = screen.getByText(story.comments);
    expect(comments).toHaveAttribute("href", `/${story.id}`);
  });

  test("shows author name", () => {
    render(<Story {...story} />, { wrapper });
    expect(screen.getByText(story.author)).toBeInTheDocument();
  });

  test("shows amount of points", () => {
    render(<Story {...story} />, { wrapper });
    expect(screen.getByText(`${story.points} points`)).toBeInTheDocument();
  });

  test("shows time since story was submitted", () => {
    render(<Story {...story} />, { wrapper });
    expect(screen.getByText("2h")).toBeInTheDocument();
  });
});
