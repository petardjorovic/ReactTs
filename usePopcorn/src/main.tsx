import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GeoLocation from "./projects/GeoLocation.tsx";
import "./index.css";
// import App1 from "./App1.tsx"; // calculator
// import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App1 />  */}
    {/* <App /> */}
    <GeoLocation />
  </StrictMode>
);
