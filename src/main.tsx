import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Context, contextStore } from "./context";
import "./index.css";
import Toolkits from "./pages/toolkits";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Context.Provider value={contextStore}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/toolkits" element={<Toolkits />} />
      </Routes>
    </BrowserRouter>
  </Context.Provider>
);
