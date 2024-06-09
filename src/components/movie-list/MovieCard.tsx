// Type
import { MovieCard as MovieCardType } from "../../types/movies";

// context
import { useAppContext } from "../../hooks/useAppContext";

// components
import MovieRating from "./MovieRating";

type MovieCardProps = {
  movie: MovieCardType;
};

export default function MovieCard({ movie }: MovieCardProps) {
  const { imageBaseUrl } = useAppContext();

  return (
    <li className='movie-card'>
      <img src={`${imageBaseUrl}/${movie.poster_path}`} alt={movie.title} />
      <div className='movie-info'>
        <h3 className='movie-title card-title two-line'>{movie.title}</h3>
        <MovieRating rating={movie.vote_average} />
      </div>
    </li>
  );
}
