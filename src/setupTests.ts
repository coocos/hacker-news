import "@testing-library/jest-dom/extend-expect";
import * as nock from "nock";
import fetch from "cross-fetch";

beforeAll(() => {
  global.fetch = fetch;
  jest
    .spyOn(Date, "now")
    .mockImplementation(() => new Date("2022-06-16T22:00:00.000Z").getTime());
});

beforeEach(() => {
  nock("https://hn.algolia.com")
    .get("/api/v1/search?tags=front_page&hitsPerPage=37")
    .reply(200, {
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
    })
    .get("/api/v1/items/31771441")
    .reply(200, {
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
    });
});
