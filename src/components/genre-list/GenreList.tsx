// styles
import "../common/MovieList.scss";

// libraries
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

// context
import { useAppContext } from "../../hooks/useAppContext";

// types
import { MovieCard as MovieCardType } from "../../types/movies";

// components
import Loader from "../Loader";
import MovieCard from "../common/MovieCard";
import MovieListShimmerUi from "../common/MovieListShimmerUi";

// hooks
import { useFetch } from "../../hooks/useFetch";

export default function GenreList() {
  const { id } = useParams(); // Extract genre ID from URL
  const { apiKey, apiBaseUrl } = useAppContext();
  const [page, setPage] = useState(1); // Manage pagination instead of year
  const [movies, setMovies] = useState<MovieCardType[]>([]);
  const { data, isPending, error } = useFetch<{ results: MovieCardType[]; total_pages: number }>(
    `${apiBaseUrl}/discover/movie?api_key=${apiKey}&with_genres=${id}&page=${page}&vote_count.gte=100`
  );
  const totalPages = useRef(0);

  useEffect(() => {
    if (data && data.results.length > 0) {
      setMovies((prev) => [...prev, ...data.results]); // Append new movies to the existing list
      totalPages.current = data.total_pages; // Update total pages
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 1;

      if (bottomReached && !isPending && page < totalPages.current) {
        setPage((prev) => prev + 1); // Increment page to fetch next set of movies
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, isPending]);

  return (
    <main className='movie-section'>
      <div className='container'>
        {isPending && page === 1 && <MovieListShimmerUi />}
        {error && !isPending && <div>{error}</div>}
        <ul className='movie-list'>
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </ul>
        {isPending && page !== 1 && <Loader />}
        {page >= totalPages.current && !isPending && (
          <h3 className='listing-end'>You reached end of the page!</h3>
        )}
      </div>
    </main>
  );
}
