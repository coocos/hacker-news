import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { Posts } from ".";

type WrapperProps = {
  children: ReactNode;
};

const wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={new QueryClient()}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

test("loads and shows stories", async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          hits: [
            {
              created_at: "2022-06-16T21:51:59.000Z",
              title: "Deflation",
              url: "https://en.wikipedia.org/wiki/Deflation",
              author: "keynes",
              points: 6,
              num_comments: 2,
              created_at_i: 1655416319,
              objectID: "31771441",
            },
            {
              created_at: "2022-06-10T13:03:01.000Z",
              title: "Inflation",
              url: "https://www.investopedia.com/ask/answers/111314/what-causes-inflation-and-does-anyone-gain-it.asp",
              author: "friedman",
              points: 671,
              num_comments: 135,
              created_at_i: 1654866181,
              objectID: "31771442",
            },
          ],
        }),
    })
  );
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

test("links to story in title", async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          hits: [
            {
              created_at: "2022-06-10T17:14:44.000Z",
              title: "Example title",
              url: "http://www.base.example.com/example-title",
              author: "ricardo",
              points: 100,
              num_comments: 10,
              created_at_i: 1654881284,
              objectID: "1772",
            },
          ],
        }),
    })
  );

  render(<Posts />, { wrapper });

  const link = (await screen.findAllByRole("link"))[0];
  expect(link).toHaveAttribute(
    "href",
    "http://www.base.example.com/example-title"
  );
  expect(link).toHaveTextContent("Example title");
});

test("links to story in source domain", async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          hits: [
            {
              created_at: "2022-06-10T17:14:44.000Z",
              title: "Example title",
              url: "http://www.base.example.com/example-title",
              author: "ricardo",
              points: 100,
              num_comments: 10,
              created_at_i: 1654881284,
              objectID: "1772",
            },
          ],
        }),
    })
  );

  render(<Posts />, { wrapper });

  const link = (await screen.findAllByRole("link"))[1];
  expect(link).toHaveAttribute(
    "href",
    "http://www.base.example.com/example-title"
  );
  expect(link).toHaveTextContent("base.example.com");
  expect(link).not.toHaveTextContent("www.base.example.com");
});
