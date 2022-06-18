import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Comments } from "./components/comments";
import { Stories } from "./components/stories";

function App() {
  return (
    <div className="m-5">
      <header>
        <h1 className="text-center text-2xl">Hacker News</h1>
      </header>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Stories />} />
            <Route path=":storyId" element={<Comments />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
