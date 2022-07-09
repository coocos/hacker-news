import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { Stories } from ".";

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

describe("Stories", () => {
  beforeAll(() => {
    // nock breaks when using jest.useFakeTimers so mock Date.now instead
    jest
      .spyOn(Date, "now")
      .mockImplementation(() => new Date("2022-06-16T22:00:00.000Z").getTime());
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("shows list of stories", async () => {
    render(<Stories />, { wrapper });

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
