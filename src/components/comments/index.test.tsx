import { screen, render } from "@testing-library/react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Comments } from ".";

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
      <MemoryRouter initialEntries={["/31771441"]}>
        <Routes>{children}</Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("Comments", () => {
  test("loads and shows comments", async () => {
    render(<Route path=":storyId" element={<Comments />} />, {
      wrapper,
    });

    await screen.findByText(
      "Markets can remain irrational longer than you can remain solvent."
    );
    await screen.findByText(
      "The farmer and manufacturer can no more live without profit than the labourer without wages."
    );
  });
});
