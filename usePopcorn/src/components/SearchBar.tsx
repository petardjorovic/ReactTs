type SearchBarProps = {
  query: string;
  onQueryChange: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <input
      type="text"
      className="search"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
    />
  );
}
