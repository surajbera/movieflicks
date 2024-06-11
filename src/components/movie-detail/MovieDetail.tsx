// libraries
import { useParams, useNavigate } from "react-router-dom";

// context
import { useAppContext } from "../../hooks/useAppContext";
import { useFetch } from "../../hooks/useFetch";

// assets
import NotFound from "../../assets/images/not-found.png";

// styles
import "./MovieDetail.scss";

// components
import MovieRating from "../common/MovieRating";

// types
import { MovieDetailType } from "../../types/MovieDetail";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { apiKey, apiBaseUrl, imageBaseUrl } = useAppContext();
  const goBack = () => {
    navigate(-1);
  };

  // Fetch movie details from the API
  const {
    data: movie,
    isPending,
    error,
  } = useFetch<MovieDetailType>(`${apiBaseUrl}/movie/${id}?api_key=${apiKey}`);

  if (isPending)
    return (
      <div className='container' style={{ padding: "1rem" }}>
        Loading...
      </div>
    );
  if (error)
    return (
      <div className='container' style={{ padding: "1rem" }}>
        Error: {error}
      </div>
    );

  const backgroundImageUrl =
    movie && movie.backdrop_path ? `${imageBaseUrl}${movie.backdrop_path}` : ""; // If no backdrop, use a default or empty string

  return (
    <main
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className='movie-detail-page'
    >
      <div className='container'>
        <button onClick={goBack} className='back-button'>
          Go Back
        </button>
        {movie ? (
          <article className='detail-article'>
            <h1 className='detail-title'>
              {movie.title} ({new Date(movie.release_date).getFullYear()})
            </h1>
            <div className='detail-parent-wrap'>
              <figure className='detail-poster-wrap'>
                <img
                  src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : NotFound}
                  alt={movie.title + " poster"}
                  className='detail-poster'
                />
              </figure>
              <div className='detail-inner-wrap'>
                <div className='details-wrap'>
                  <h3 className='detail-para-heading'>Overview: </h3>
                  <p className='detail-overview detail-para-text'>{movie.overview}</p>
                  <span className='decoration'></span>
                  <p className='detail-tagline detail-para-text'>{movie.tagline}</p>
                </div>
                <div className='sub-details-wrap'>
                  <p className='detail-release-date'>
                    <strong className='detail-para-heading'>Release Date:</strong>{" "}
                    {movie.release_date}
                  </p>
                  <p className='detail-runtime'>
                    <strong className='detail-para-heading'>Runtime:</strong>
                    <span className='detail-para-text'> {movie.runtime} minutes</span>
                  </p>
                  <p>
                    <strong className='detail-para-heading'>Genres:</strong>
                    <span className='detail-para-text'>
                      {" "}
                      {movie.genres.map((genre) => genre.name).join(", ")}
                    </span>
                  </p>
                  <div className='detail-rating-wrap'>
                    <strong className='detail-para-heading'>Rating:</strong>
                    <span className='star-rating'>
                      <MovieRating rating={movie.vote_average} />
                    </span>
                  </div>
                  <p className='detail-budget'>
                    <strong className='detail-para-heading'>Budget:</strong>
                    <span className='detail-para-text'> ${movie.budget.toLocaleString()}</span>
                  </p>
                  <div className='company-info-container'>
                    <strong className='detail-para-heading'>Production Companies:</strong>
                    <ul className='detail-company-info'>
                      {movie.production_companies.map((company) => (
                        <li key={company.id} className='detail-logo-container'>
                          {company.logo_path && (
                            <span className='detail-company-logo-wrap'>
                              <img
                                src={`${imageBaseUrl}${company.logo_path}`}
                                alt={company.name}
                                className='detail-company-logo'
                              />
                            </span>
                          )}
                          <span className='detail-company-name'>{company.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ) : (
          <p>No movie details available.</p>
        )}
      </div>
    </main>
  );
}
