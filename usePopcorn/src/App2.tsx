import { useEffect, useState } from "react";
import NumResults from "./components/NumResults";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import MovieDetails from "./components/MovieDetails";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Box from "./components/Box";
import Main from "./components/Main";
import type { Movie, WatchedMovie } from "./lib/types";

const KEY: string = "b2c1fcd0";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  // const [watched, setWatched] = useState<WatchedMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  //! callback funkcija nema argumente i mora da vraca vrednost
  const [watched, setWatched] = useState<WatchedMovie[]>(function () {
    const value = localStorage.getItem("watched");
    if (value !== null) {
      return JSON.parse(value) as WatchedMovie[];
    }
    return [];
  });

  //* ovo bi bilo jos sigurnije, da baci gresku ako nadje korumpiran JSON u localStorage
  //   const [watched, setWatched] = useState<WatchedMovie[]>(function () {
  //   try {
  //     const value = localStorage.getItem("watched");
  //     if (value !== null) {
  //       return JSON.parse(value) as WatchedMovie[];
  //     }
  //   } catch (e) {
  //     console.error("Failed to parse watched movies from localStorage:", e);
  //   }
  //   return [];
  // });

  const handleSelectMovie = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie: WatchedMovie) => {
    setWatched((wat) => [...wat, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  };

  const handleRemoveWatched = (id: string) => {
    setWatched((prev) => prev.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
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
    handleCloseMovie();
    fetchMovies();

    return function () {
      contoller.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  return (
    <>
      <Navbar>
        <SearchBar query={query} onQueryChange={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage error={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onRemoveWatched={handleRemoveWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;
