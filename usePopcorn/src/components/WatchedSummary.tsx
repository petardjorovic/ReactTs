import type { WatchedMovie } from "../lib/types";

type WatchedSummaryProps = {
  watched: WatchedMovie[];
};

function average(arr: number[]): number {
  return arr.reduce((acc, el, i, arr) => acc + el / arr.length, 0);
}

export default function WatchedSummary({ watched }: WatchedSummaryProps) {
  const averageImbdRating: number = average(
    watched.map((movie) => movie.imdbRating)
  );
  const averageUserRating: number = average(
    watched.map((movie) => movie.userRating)
  );
  const averageRuntime: number = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{averageImbdRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{averageUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{averageRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
