import { Route, Routes } from "react-router-dom";
import { Comments } from "./components/comments";
import { PostList } from "./components/postlist";

function App() {
  return (
    <div className="bg-header bg-no-repeat min-h-screen p-6">
      <Routes>
        <Route index element={<PostList />} />
        <Route path=":storyId" element={<Comments />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
