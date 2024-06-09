// libraries
import { NavLink } from "react-router-dom";

// styles
import "./Header.scss";

// hooks
import { useFetch } from "../../hooks/useFetch";
import { useAppContext } from "../../hooks/useAppContext";

// types
import { GenreResponse } from "../../types/genre";
import HeaderShimmer from "./HeaderShimmer";

export default function Header() {
  const { apiKey, apiBaseUrl } = useAppContext();
  const { data, isPending, error } = useFetch<GenreResponse>(
    `${apiBaseUrl}/genre/movie/list?api_key=${apiKey}`
  );
  const title = "MOVIEFLIX";

  return (
    <header className='header'>
      <div className='container'>
        <h1 className='header-logo'>
          <NavLink to='/'>{title}</NavLink>
        </h1>

        <ul className='genre-wrap'>
          {isPending && <HeaderShimmer />}
          {error && !isPending && <li>{error}</li>}
          {!data?.genres.length && !isPending && <li>: No genres found</li>}
          {data &&
            data.genres &&
            data.genres.length > 0 &&
            data.genres.map((genre) => (
              <li key={genre.id} className='genre-item'>
                <NavLink
                  to={`/genre/${genre.id}`}
                  className={({ isActive }) => (isActive ? "active" : "inactive")}
                >
                  {genre.name}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </header>
  );
}
