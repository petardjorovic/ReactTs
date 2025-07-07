import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error("DarkMode was used outside of ContextProvider");
  return context;
}
