import { useState } from "react";
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
import type { WatchedMovie } from "./lib/types";
import { useMovies } from "./utils/useMovies";
import { useLocalStorageState } from "./utils/useLocalStorageState";

// const KEY: string = "b2c1fcd0";

function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [watched, setWatched] = useLocalStorageState("watched");

  const { movies, isLoading, error } = useMovies(query);

  function handleSelectMovie(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: WatchedMovie) {
    setWatched((wat) => [...wat, movie]);
  }

  function handleRemoveWatched(id: string) {
    setWatched((prev) => prev.filter((movie) => movie.imdbID !== id));
  }

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
