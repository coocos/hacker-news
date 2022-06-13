import { render, screen } from "@testing-library/react";
import { Stories } from ".";

test("loads and shows stories", async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          hits: [
            {
              created_at: "2022-06-10T17:14:44.000Z",
              title: "Breaking news",
              url: "http://first.example.com/breaking-news",
              author: "friedman",
              points: 834,
              num_comments: 152,
              created_at_i: 1654881284,
              objectID: "1234",
            },
            {
              created_at: "2022-06-10T13:03:01.000Z",
              title: "More breaking news",
              url: "https://second.example.com/more-breaking-news",
              author: "keynes",
              points: 671,
              num_comments: 135,
              created_at_i: 1654866181,
              objectID: "2345",
            },
          ],
        }),
    })
  );

  render(<Stories />);

  expect(await screen.findByText("Loading")).toBeInTheDocument();
  const [first, second] = await screen.findAllByRole("listitem");
  expect(first).toHaveTextContent("Breaking news");
  expect(first).toHaveTextContent("first.example.com");
  expect(first).toHaveTextContent("friedman");
  expect(first).toHaveTextContent("834 points");
  expect(first).toHaveTextContent("152");
  expect(second).toHaveTextContent("More breaking news");
  expect(second).toHaveTextContent("second.example.com");
  expect(second).toHaveTextContent("keynes");
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

  render(<Stories />);

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

  render(<Stories />);

  const link = (await screen.findAllByRole("link"))[1];
  expect(link).toHaveAttribute(
    "href",
    "http://www.base.example.com/example-title"
  );
  expect(link).toHaveTextContent("base.example.com");
  expect(link).not.toHaveTextContent("www.base.example.com");
});
