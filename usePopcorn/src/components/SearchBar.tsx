import { useEffect, useRef } from "react";
import { useKey } from "../utils/useKey";

type SearchBarProps = {
  query: string;
  onQueryChange: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useKey("Enter", function () {
    if (document.activeElement === inputRef.current) return;
    inputRef.current?.focus();
    onQueryChange("");
  });

  // useEffect(() => {
  //   function handleKeyDown(e: KeyboardEvent) {
  //     if (e.code === "Enter") {
  //       if (document.activeElement === inputRef.current) return;
  //       inputRef.current?.focus();
  //       onQueryChange("");
  //     }
  //   }

  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => document.removeEventListener("keydown", handleKeyDown);
  // }, [onQueryChange]);

  return (
    <input
      type="text"
      className="search"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      ref={inputRef}
    />
  );
}
