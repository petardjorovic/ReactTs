export type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type?: string;
};

export type WatchedMovie = Movie & {
  runtime: number;
  imdbRating: number;
  userRating: number;
  countRatingDecisions?: number;
};

export type SingleMovie = {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: { Source: string; Value: string }[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
};
