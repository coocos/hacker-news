import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App";

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

describe("App", () => {
  beforeAll(() => {
    // nock breaks when using jest.useFakeTimers so mock Date.now instead
    jest
      .spyOn(Date, "now")
      .mockImplementation(() => new Date("2022-06-16T22:00:00.000Z").getTime());
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test("shows comments when number of comments is clicked", async () => {
    render(<App />, { wrapper });
    const user = userEvent.setup();

    expect(await screen.findByText("Inflation")).toBeInTheDocument();
    await user.click(screen.getByText("2"));

    const comment = await screen.findByText(
      "Markets can remain irrational longer than you can remain solvent."
    );
    expect(comment).toBeInTheDocument();
  });
});
