import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BankAccount from "./components/BankAccount";
// import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <BankAccount />
  </StrictMode>
);
