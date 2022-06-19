import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { Post, Posts } from ".";

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

describe("Posts", () => {
  test("shows posts", async () => {
    render(<Posts />, { wrapper });

    expect(await screen.findByText("Loading")).toBeInTheDocument();
    const [first, second] = await screen.findAllByRole("listitem");

    expect(first).toHaveTextContent("Deflation");
    expect(first).toHaveTextContent("en.wikipedia.org");
    expect(first).toHaveTextContent("keynes");
    expect(first).toHaveTextContent("6 points");
    expect(first).toHaveTextContent("2");

    expect(second).toHaveTextContent("Inflation");
    expect(second).toHaveTextContent("investopedia.com");
    expect(second).toHaveTextContent("friedman");
    expect(second).toHaveTextContent("671 points");
    expect(second).toHaveTextContent("135");
  });
});

describe("Post", () => {
  const post = {
    title: "Deflation",
    createdAt: new Date("2022-06-16T21:51:59.000Z"),
    url: "https://en.wikipedia.org/wiki/Deflation",
    author: "keynes",
    points: 6,
    numComments: 2,
    objectID: "31771441",
  };

  test("links to post origin in shown title", async () => {
    render(<Post {...post} />, { wrapper });

    const link = await screen.findByTestId("post-link");
    expect(link).toHaveAttribute(
      "href",
      "https://en.wikipedia.org/wiki/Deflation"
    );
    expect(link).toHaveTextContent("Deflation");
  });

  test("links to post origin in shown domain", async () => {
    render(<Post {...post} />, { wrapper });

    const link = await screen.findByTestId("origin-link");
    expect(link).toHaveAttribute(
      "href",
      "https://en.wikipedia.org/wiki/Deflation"
    );
    expect(link).toHaveTextContent("en.wikipedia.org");
  });

  test("links to post origin in shown domain", async () => {
    render(<Post {...post} />, { wrapper });

    const link = await screen.findByTestId("origin-link");
    expect(link).toHaveAttribute(
      "href",
      "https://en.wikipedia.org/wiki/Deflation"
    );
    expect(link).toHaveTextContent("en.wikipedia.org");
  });
});
