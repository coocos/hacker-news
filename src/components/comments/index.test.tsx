import { screen, render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Comments } from ".";

test("loads and shows comments", async () => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          id: 31771441,
          created_at: "2022-06-16T21:51:59.000Z",
          created_at_i: 1655416319,
          type: "story",
          author: "keynes",
          title: "Deflation",
          url: "https://en.wikipedia.org/wiki/Deflation",
          text: null,
          points: 6,
          parent_id: null,
          story_id: null,
          children: [
            {
              id: 31771465,
              created_at: "2022-06-16T21:54:23.000Z",
              created_at_i: 1655416463,
              type: "comment",
              author: "friedman",
              title: null,
              url: null,
              text: "<p>Markets can remain irrational longer than you can remain solvent.</p>",
              points: null,
              parent_id: 31771441,
              story_id: 31771441,
              children: [
                {
                  id: 31788163,
                  created_at: "2022-06-18T08:27:00.000Z",
                  created_at_i: 1655540820,
                  type: "comment",
                  author: "ricardo",
                  title: null,
                  url: null,
                  text: "<p>The farmer and manufacturer can no more live without profit than the labourer without wages.</p>",
                  points: null,
                  parent_id: 31771465,
                  story_id: 31771441,
                  children: [],
                  options: [],
                },
              ],
              options: [],
            },
          ],
          options: [],
        }),
    })
  );

  render(
    <QueryClientProvider client={new QueryClient()}>
      <MemoryRouter initialEntries={["/1234"]}>
        <Routes>
          <Route path=":storyId" element={<Comments />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );

  await screen.findByText(
    "Markets can remain irrational longer than you can remain solvent."
  );
  await screen.findByText(
    "The farmer and manufacturer can no more live without profit than the labourer without wages."
  );
});
