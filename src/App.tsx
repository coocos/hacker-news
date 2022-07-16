import { Route, Routes } from "react-router-dom";
import { Comments } from "./components/comments";
import { Stories } from "./components/stories";
import { useTheme } from "./hooks/theme";

export const App = () => {
  const [theme] = useTheme();
  return (
    <main className={theme}>
      <div className="bg-header md:[background-position-y:-3rem] xl:[background-position-y:-6rem] bg-gray-50 dark:bg-gray-800 bg-no-repeat min-h-screen p-6">
        <Routes>
          <Route index element={<Stories />} />
          <Route path=":storyId" element={<Comments />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </div>
    </main>
  );
};
