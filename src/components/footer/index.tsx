import { GitHubIcon } from "../icons/github";

export const Footer = () => (
  <footer className="flex gap-2 justify-center items-center text-gray-400 dark:text-gray-200">
    <a
      href="https://github.com/coocos/hacker-news"
      target="_blank"
      rel="noreferrer"
      className="fill-gray-700 dark:fill-gray-300"
    >
      <GitHubIcon />
    </a>
    <div>
      Powered by{" "}
      <a href="https://hn.algolia.com/api" target="_blank" rel="noreferrer">
        Algolia
      </a>
    </div>
  </footer>
);
