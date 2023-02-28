import "./index.css";
import React from "react";
import { render } from "react-dom";
import { Composer } from "./components/Composer";

// Render top-level React component
render(
  <React.StrictMode>
    <Composer />
  </React.StrictMode>,
  document.getElementById("root")
);
