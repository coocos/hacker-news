import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { Stories } from "./components/stories";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/stories" element={<App />}>
          <Route index element={<Stories />} />
        </Route>
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
