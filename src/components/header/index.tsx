import { useTheme } from "../../hooks/theme";
import { DarkIcon } from "../icons/dark";
import { LightIcon } from "../icons/light";

export const Header = () => {
  const [theme, toggleTheme] = useTheme();
  return (
    <header className="mb-10 py-4 my-4 p-4 mx-auto max-w-2xl flex justify-center align-center rounded-md bg-pink-500 text-gray-200">
      <h1 className="text-xl text-gray-100 flex-1 text-center">Hacker News</h1>
      <button
        className="transition ease-in-out text-pink-100 hover:text-white hover:scale-125"
        onClick={toggleTheme}
      >
        {theme === "dark" ? <LightIcon /> : <DarkIcon />}
      </button>
    </header>
  );
};
