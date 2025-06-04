import type { WatchedMovie } from "../lib/types";
import WatchedMovieItem from "./WatchedMovieItem";

type WatchedMovieListProps = {
  watched: WatchedMovie[];
  onRemoveWatched: (id: string) => void;
};

export default function WatchedMovieList({
  watched,
  onRemoveWatched,
}: WatchedMovieListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieItem
          key={movie.imdbID}
          movie={movie}
          onRemoveWatched={onRemoveWatched}
        />
      ))}
    </ul>
  );
}
