import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App1 from "./App1.tsx";
// import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App1 />
    {/* <App /> */}
  </StrictMode>
);
