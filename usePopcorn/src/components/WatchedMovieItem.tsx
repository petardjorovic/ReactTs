import type { WatchedMovie } from "../lib/types";

type WatchedMovieItemProps = {
  movie: WatchedMovie;
  onRemoveWatched: (id: string) => void;
};

export default function WatchedMovieItem({
  movie,
  onRemoveWatched,
}: WatchedMovieItemProps) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime}</span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={() => onRemoveWatched(movie.imdbID)}
      >
        X
      </button>
    </li>
  );
}
