module.exports = {
  content: ["./index.html", "src/**/*.{ts,js,tsx,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        header: "url('/src/components/header/background.svg')",
      },
    },
  },
  plugins: [],
};
