import { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { Post } from ".";

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
