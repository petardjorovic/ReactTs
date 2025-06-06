import { useEffect, useState, type SetStateAction } from "react";
import type { WatchedMovie } from "../lib/types";

export function useLocalStorageState(
  key: string
): [WatchedMovie[], React.Dispatch<SetStateAction<WatchedMovie[]>>] {
  const [value, setValue] = useState<WatchedMovie[]>(function () {
    const value = localStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value) as WatchedMovie[];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

//! callback funkcija nema argumente i mora da vraca vrednost
// const [watched, setWatched] = useState<WatchedMovie[]>(function () {
//   const value = localStorage.getItem("watched");
//   if (value !== null) {
//     return JSON.parse(value) as WatchedMovie[];
//   }
//   return [];
// });

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
