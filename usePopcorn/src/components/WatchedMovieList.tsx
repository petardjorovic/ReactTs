import type { WatchedMovie } from "../lib/types";
import WatchedMovieItem from "./WatchedMovieItem";

type WatchedMovieListProps = {
  watched: WatchedMovie[];
};

export default function WatchedMovieList({ watched }: WatchedMovieListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
