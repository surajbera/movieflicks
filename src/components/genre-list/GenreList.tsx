import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { MovieCard as MovieCardType } from "../../types/movies";
import Loader from "../Loader";
import MovieCard from "../common/MovieCard";
import MovieListShimmerUi from "../common/MovieListShimmerUi";
import { useFetch } from "../../hooks/useFetch";
import { useAppContext } from "../../hooks/useAppContext";

export default function GenreList() {
  const { id } = useParams();
  const { apiKey, apiBaseUrl } = useAppContext();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<MovieCardType[]>([]);
  const totalPages = useRef(0);

  // Reset state when the genre ID changes
  useEffect(() => {
    setPage(1);
    setMovies([]);
    totalPages.current = 0;
  }, [id]);

  const { data, isPending, error } = useFetch<{ results: MovieCardType[]; total_pages: number }>(
    `${apiBaseUrl}/discover/movie?api_key=${apiKey}&with_genres=${id}&page=${page}&vote_count.gte=100`
  );

  useEffect(() => {
    if (data && data.results.length > 0) {
      setMovies((prev) => [...prev, ...data.results]);
      totalPages.current = data.total_pages;
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
