import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Comments } from "./components/comments";
import { Header } from "./components/header";
import { PostList } from "./components/postlist";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="m-5">
          <Header />
          <Routes>
            <Route index element={<PostList />} />
            <Route path=":storyId" element={<Comments />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
