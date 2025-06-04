import React, { useState, type ReactNode } from "react";

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

const tempMovieData: Movie[] = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

type WatchedMovie = Movie & {
  runtime: number;
  imdbRating: number;
  userRating: number;
};

const tempWatchedData: WatchedMovie[] = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function average(arr: number[]): number {
  return arr.reduce((acc, el, i, arr) => acc + el / arr.length, 0);
}

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Navbar>
        <SearchBar query={query} onQueryChange={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

type MainProps = {
  children: React.ReactNode;
};

function Main({ children }: MainProps) {
  return <main className="main">{children}</main>;
}

type BoxProps = {
  children: React.ReactNode;
};

function Box({ children }: BoxProps) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "-" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}
/*
type WatchedBoxProps = {
  children: React.ReactNode;
};

function WatchedBox({ children }: WatchedBoxProps) {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "-" : "+"}
      </button>
      {isOpen2 && <>{children}</>}
    </div>
  );
}
  */

type WatchedMovieListProps = {
  watched: WatchedMovie[];
};

function WatchedMovieList({ watched }: WatchedMovieListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

type WatchedMovieItemProps = {
  movie: WatchedMovie;
};

function WatchedMovieItem({ movie }: WatchedMovieItemProps) {
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
    </li>
  );
}

type WatchedSummaryProps = {
  watched: WatchedMovie[];
};

function WatchedSummary({ watched }: WatchedSummaryProps) {
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

type MovieListProps = {
  movies: Movie[];
};

function MovieList({ movies }: MovieListProps) {
  return (
    <ul className="list">
      {movies?.map((movie) => {
        return <MovieItem movie={movie} key={movie.imdbID} />;
      })}
    </ul>
  );
}

type MovieItemProps = {
  movie: Movie;
};

function MovieItem({ movie }: MovieItemProps) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

type NavbarProps = {
  children: React.ReactNode;
};

function Navbar({ children }: NavbarProps) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

type SearchBarProps = {
  query: string;
  onQueryChange: React.Dispatch<React.SetStateAction<string>>;
};

function SearchBar({ query, onQueryChange }: SearchBarProps) {
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

type NumResultsProps = {
  movies: Movie[];
};

function NumResults({ movies }: NumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

export default App;
