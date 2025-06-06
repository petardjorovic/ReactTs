import { useEffect } from "react";

export function useKey(keyCode: string, action: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code.toLowerCase() === keyCode.toLowerCase()) {
        action();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return function () {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [action, keyCode]);
}
