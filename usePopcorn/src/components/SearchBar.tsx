import { useEffect, useRef } from "react";

type SearchBarProps = {
  query: string;
  onQueryChange: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (document.activeElement === inputRef.current) return;

      if (e.code === "Enter") {
        inputRef.current?.focus();
        onQueryChange("");
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onQueryChange]);

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
