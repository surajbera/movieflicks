import { useEffect } from "react";
import { Header } from "../components";
import MovieDetail from "../components/movie-detail/MovieDetail";

export default function MovieDetailPage() {
  useEffect(() => {
    document.body.classList.add("movie-detail-route");

    return () => {
      document.body.classList.remove("movie-detail-route");
    };
  }, []);

  useEffect(() => {
    document.title = "Movie Detail Page";
  }, []);

  return (
    <>
      <Header />
      <MovieDetail />
    </>
  );
}
