// Type
import { MovieCard as MovieCardType } from "../../types/movies";

// context
import { useAppContext } from "../../hooks/useAppContext";

// components
import MovieRating from "./MovieRating";

// libraries
import { Link } from "react-router-dom";

type MovieCardProps = {
  movie: MovieCardType;
};

import notFoundImage from "../../assets/images/not-found.png";

export default function MovieCard({ movie }: MovieCardProps) {
  const { imageBaseUrl } = useAppContext();
  const imageUrl = movie.poster_path ? `${imageBaseUrl}/${movie.poster_path}` : notFoundImage;

  return (
    <li className='movie-card'>
      <Link to={`/movie/${movie.id}`}>
        {" "}
        {/* Update this line */}
        <img src={imageUrl} alt={movie.title} />
        <div className='movie-info'>
          <h3 className='movie-title card-title two-line'>{movie.title}</h3>
          <MovieRating rating={movie.vote_average} />
        </div>
      </Link>
    </li>
  );
}
