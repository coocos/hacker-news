import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { PostList } from ".";

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
    render(<PostList />, { wrapper });

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
