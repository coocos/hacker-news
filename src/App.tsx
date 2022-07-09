import { Route, Routes } from "react-router-dom";
import { Comments } from "./components/comments";
import { Stories } from "./components/stories";

export const App = () => (
  <div className="bg-header bg-no-repeat min-h-screen p-6">
    <Routes>
      <Route index element={<Stories />} />
      <Route path=":storyId" element={<Comments />} />
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  </div>
);
