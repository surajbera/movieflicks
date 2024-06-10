// libraries
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

// types
import { MovieCard as MovieCardType } from "../../types/movies";

// components
import Loader from "../Loader";
import MovieCard from "../common/MovieCard";
import MovieListShimmerUi from "../common/MovieListShimmerUi";

// hooks
import { useFetch } from "../../hooks/useFetch";

// context
import { useAppContext } from "../../hooks/useAppContext";

export default function SearchList() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { apiKey, apiBaseUrl } = useAppContext();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<MovieCardType[]>([]);
  const totalPages = useRef(0);

  // Reset state when the search query changes
  useEffect(() => {
    setPage(1);
    setMovies([]);
    totalPages.current = 0;
  }, [query]);

  const { data, isPending, error } = useFetch<{ results: MovieCardType[]; total_pages: number }>(
    `${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      query || ""
    )}&page=${page}`
  );

  useEffect(() => {
    if (data && data.results.length > 0) {
      setMovies((prev) => [...prev, ...data.results]);
      totalPages.current = data.total_pages;
    } else if (data && data.results.length === 0) {
      setMovies([]); // Ensure movies are cleared if no results
      totalPages.current = 0; // Ensure totalPages is set to 0
    }
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      const bottomReached =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 1;

      if (bottomReached && !isPending && page < totalPages.current) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, isPending]);

  return (
    <main className='movie-section'>
      <div className='container'>
        {isPending && page === 1 && <MovieListShimmerUi />}
        {error && !isPending && <div>{error}: Failed to fetch data</div>}
        <ul className='movie-list'>
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </ul>
        {isPending && page !== 1 && <Loader />}
        {movies.length === 0 && !isPending && !error && (
          <div>No results found for the search term: {query}. Pls try different search term.</div>
        )}
        {page >= totalPages.current && !isPending && movies.length > 0 && (
          <h3 className='listing-end'>You reached end of the page!</h3>
        )}
      </div>
    </main>
  );
}
