import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="m-5">
      <header>
        <h1 className="text-center text-2xl">Hacker News</h1>
      </header>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
