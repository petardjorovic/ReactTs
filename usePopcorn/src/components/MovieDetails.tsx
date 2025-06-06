import { useEffect, useRef, useState } from "react";
import type { SingleMovie, WatchedMovie } from "../lib/types";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useKey } from "../utils/useKey";

type MovieDetailsProps = {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (w: WatchedMovie) => void;
  watched: WatchedMovie[];
};

const KEY: string = "b2c1fcd0";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<SingleMovie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);

  //! hook-ovi moraju biti u top levelu komponente
  // if (Number(movie?.imdbRating) > 8) {
  //   const [isTop, setIsTop] = useState(true);
  // }

  //! early return je zabranjen isto, return mora ici posle svih hook-ova
  // if (Number(movie?.imdbRating) > 8) return;

  //! ovo ce uvek da bude false, jel je to inicijalna vrednost samo set funkcija moze da je promeni
  // const [isTop, setIsTop] = useState(Number(movie?.imdbRating) > 8);
  // console.log(isTop, "isTop");

  // useEffect(() => {
  //   setIsTop(Number(movie?.imdbRating) > 8);
  // }, [movie?.imdbRating]);

  //* derived state se na svaki render obracunava
  // const isTop = Number(movie?.imdbRating) > 8;
  // console.log(isTop, "isTop");

  // const [avgRating, setAvgRating] = useState(0);

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) {
      countRef.current++;
    }
  }, [userRating]);

  const isWatched: boolean = watched
    .map((movie) => movie.imdbID)
    .includes(selectedId);

  const currentUserRate = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const handleAddWatched = () => {
    if (movie) {
      const newWatched: WatchedMovie = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        runtime: Number(movie.Runtime.split(" ")[0]),
        imdbRating: Number(movie.imdbRating),
        userRating: userRating,
        countRatingDecisions: countRef.current,
      };

      onAddWatched(newWatched);
      // setAvgRating(Number(movie.imdbRating));
      // setAvgRating((prev) => (prev + userRating) / 2);

      onCloseMovie();
    }
  };

  useEffect(() => {
    async function getMovieDeatils() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movie details");
        const data: SingleMovie = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovie(data);
      } catch (err) {
        console.error(err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDeatils();
  }, [selectedId]);

  useEffect(() => {
    if (!movie?.Title) {
      return;
    } else {
      document.title = `Movie | ${movie.Title}`;
    }

    return function () {
      document.title = "usePopcorn";
      // console.log(`Clean up effect for movie ${movie.Title}`);
    };
  }, [movie?.Title]);

  useKey("Escape", onCloseMovie);
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.code === "Escape") {
  //       onCloseMovie();
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyDown);

  //   return function () {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [onCloseMovie]);

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie?.Poster} alt={`Poster of ${movie?.Title} movie`} />
            <div className="details-overview">
              <h2>{movie?.Title}</h2>
              <p>
                {movie?.Released} • {movie?.Runtime}
              </p>
              <p>{movie?.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie?.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          {/* <p>{avgRating}</p> */}
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rate this movie with {currentUserRate}⭐</p>
              )}
            </div>
            <p>
              <em>{movie?.Plot}</em>
            </p>
            <p>Staring {movie?.Actors}</p>
            <p>Directed by {movie?.Director}</p>
          </section>
        </>
      )}
      {error && <ErrorMessage error={error} />}
    </div>
  );
}
