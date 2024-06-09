// styles
import "./MovieList.scss";

// libraries
import { useEffect, useState, useRef } from "react";

// context
import { useAppContext } from "../../hooks/useAppContext";

// types
import { MovieCard as MovieCardType } from "../../types/movies";

// components
import Loader from "../Loader";
import MovieCard from "./MovieCard";

// hooks
import { useFetch } from "../../hooks/useFetch";

export default function MovieList() {
  const { apiKey, apiBaseUrl } = useAppContext();
  const [year, setYear] = useState(2013);
  const [moviesByYear, setMoviesByYear] = useState<{ [key: number]: MovieCardType[] }>({});
  const { data, isPending, error } = useFetch<{ results: MovieCardType[] }>(
    `${apiBaseUrl}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`
  );
  const currentYear = new Date().getFullYear();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (data && data.results && data.results.length > 0) {
      setMoviesByYear((prev) => ({
        ...prev,
        [year]: data.results,
      }));
      isFirstLoad.current = false;
    }
  }, [data, year]);

  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 1;

      if (bottomReached && !isPending && year < currentYear) {
        setYear((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [year, currentYear, isPending]);

  return (
    <main className='movie-section'>
      <div className='container'>
        {isPending && isFirstLoad.current && <div>Loading...</div>}
        {error && !isPending && <div>{error}</div>}
        {Object.entries(moviesByYear).map(([year, movies]) => (
          <section key={year} className='yearly-section'>
            <h2 className='year-display'>{year}</h2>
            <ul className='movie-list'>
              {movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))}
            </ul>
          </section>
        ))}
        {isPending && year !== 2013 && <Loader />}
      </div>
    </main>
  );
}
