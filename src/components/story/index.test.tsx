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

  test("links to origin in title", async () => {
    render(<Story {...story} />, { wrapper });

    const link = await screen.findByTestId("story-link");
    expect(link).toHaveAttribute(
      "href",
      "https://en.wikipedia.org/wiki/Deflation"
    );
    expect(link).toHaveTextContent("Deflation");
  });

  test("links to origin in domain", async () => {
    render(<Story {...story} />, { wrapper });

    const link = await screen.findByTestId("origin-link");
    expect(link).toHaveAttribute(
      "href",
      "https://en.wikipedia.org/wiki/Deflation"
    );
    expect(link).toHaveTextContent("en.wikipedia.org");
  });
});
