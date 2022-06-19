import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { Posts } from ".";

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
  test("loads and shows posts", async () => {
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

  test("links to post origin in shown title", async () => {
    render(<Posts />, { wrapper });

    const link = (await screen.findAllByTestId("post-link"))[0];
    expect(link).toHaveAttribute(
      "href",
      "https://en.wikipedia.org/wiki/Deflation"
    );
    expect(link).toHaveTextContent("Deflation");
  });

  test("links to post origin in shown domain", async () => {
    render(<Posts />, { wrapper });

    const link = (await screen.findAllByTestId("origin-link"))[0];
    expect(link).toHaveAttribute(
      "href",
      "https://en.wikipedia.org/wiki/Deflation"
    );
    expect(link).toHaveTextContent("en.wikipedia.org");
  });

  test("links to post origin in shown domain", async () => {
    render(<Posts />, { wrapper });

    const link = (await screen.findAllByTestId("origin-link"))[0];
    expect(link).toHaveAttribute(
      "href",
      "https://en.wikipedia.org/wiki/Deflation"
    );
    expect(link).toHaveTextContent("en.wikipedia.org");
  });
});
