// libraries
import { Link } from "react-router-dom";

// styles
import "./Header.scss";

// hooks
import { useFetch } from "../../hooks/useFetch";
import { useAppContext } from "../../hooks/useAppContext";

// types
import { GenreResponse } from "../../types/genre";

export default function Header() {
  const { apiKey, baseUrl } = useAppContext();
  const { data, isPending, error } = useFetch<GenreResponse>(
    `${baseUrl}/genre/movie/list?api_key=${apiKey}`
  );
  const title = "MOVIEFLIX";

  return (
    <header>
      <div className='container'>
        <h1 className='header-logo'>
          <Link to='/'>{title}</Link>
        </h1>

        <ul className='genre-wrap'>
          {error && <li>{error}</li>}
          {isPending && <li>Loading...</li>}
          {!data?.genres.length && !isPending && <li>No genres found</li>}
          {data &&
            data.genres &&
            data.genres.length > 0 &&
            data.genres.map((genre) => (
              <li key={genre.id} className='genre-item'>
                <Link to={`/genre/${genre.id}`}>{genre.name}</Link>
              </li>
            ))}
        </ul>
      </div>
    </header>
  );
}
