import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import BankAccount from "./components/BankAccount";
import App from "./App.tsx";
import { QuizProvider } from "./context/QuizContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
    {/* <BankAccount /> */}
  </StrictMode>
);
