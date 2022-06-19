import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Comments } from "./components/comments";
import { Posts } from "./components/posts";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="m-5">
          <header>
            <h1 className="text-center text-2xl">Hacker News</h1>
          </header>
          <div>
            <Routes>
              <Route index element={<Posts />} />
              <Route path=":storyId" element={<Comments />} />
              <Route path="*" element={<h1>Not found</h1>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
