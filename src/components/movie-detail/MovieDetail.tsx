import { useParams } from "react-router-dom";
import { useAppContext } from "../../hooks/useAppContext";
import NotFound from "../../assets/images/not-found.png";
import "./MovieDetail.scss";
import MovieRating from "../common/MovieRating";

export default function MovieDetail() {
  const { id } = useParams();
  const { imageBaseUrl } = useAppContext();

  // Expanded dummy data structure
  const movie = {
    title: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster_path: "/interstellar.jpg",
    backdrop_path: "/interstellar_backdrop.jpg",
    vote_average: 8.6,
    release_date: "2014-11-05",
    genres: [
      { id: 12, name: "Adventure" },
      { id: 878, name: "Science Fiction" },
    ],
    runtime: 169,
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    production_companies: [
      { id: 1, name: "Legendary Pictures", logo_path: "/legendary.png" },
      { id: 2, name: "Syncopy", logo_path: "/syncopy.png" },
    ],
    budget: 165000000,
  };

  return (
    <main>
      <div className='container'>
        {movie ? (
          <article className='detail-article'>
            <h1 className='detail-title'>
              {movie.title} ({new Date(movie.release_date).getFullYear()})
            </h1>
            <figure className='detail-poster-wrap'>
              <img src={NotFound} alt={movie.title + " poster"} className='detail-poster' />
            </figure>
            {/* <img
              src={`${imageBaseUrl}${movie.backdrop_path}`}
              alt={movie.title + " backdrop"}
              style={{ width: "100%" }}
            /> */}
            <div className='details-wrap'>
              <h3 className='detail-para-heading'>Overview: </h3>
              <p className='detail-tagline detail-para-text'>{movie.tagline}</p>
              <p className='detail-overview detail-para-text'>{movie.overview}</p>
            </div>
            <p className='detail-release-date'>
              <strong className='detail-para-heading'>Release Date:</strong> {movie.release_date}
            </p>
            <p className='detail-runtime'>
              <strong className='detail-para-heading'>Runtime:</strong>
              <span className='detail-para-text'> {movie.runtime} minutes</span>
            </p>
            <p>
              <strong className='detail-para-heading'>Genres:</strong>{" "}
              <span className='detail-para-text'>
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
            <div>
              <strong className='detail-para-heading'>Production Companies:</strong>
              <ul className='detail-company-info'>
                {movie.production_companies.map((company) => (
                  <li key={company.id}>
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
          </article>
        ) : (
          <p>No movie details available.</p>
        )}
      </div>
    </main>
  );
}
