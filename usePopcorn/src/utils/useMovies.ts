import { useEffect, useState } from "react";
import type { Movie } from "../lib/types";

type useMoviesReturnType = {
  movies: Movie[];
  isLoading: boolean;
  error: string;
};

const KEY: string = "b2c1fcd0";

export function useMovies(
  query: string,
  callback?: () => void
): useMoviesReturnType {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    callback?.();
    const contoller = new AbortController();

    const fetchMovies = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: contoller.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err instanceof Error) {
          if (err.name !== "AbortError") {
            setError(err.message);
            console.log(err);
          }
        } else {
          setError("Unknown error");
          console.log(err);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();

    return function () {
      contoller.abort();
    };
  }, [query, callback]);

  return { movies, isLoading, error };
}
