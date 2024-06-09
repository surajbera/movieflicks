// libraries
import { NavLink } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";

// styles
import "./Header.scss";

// hooks
import { useFetch } from "../../hooks/useFetch";
import { useAppContext } from "../../hooks/useAppContext";

// types
import { GenreResponse } from "../../types/genre";
import HeaderShimmer from "./HeaderShimmer";

// components
import SearchModal from "../search-modal/SearchModal";

export default function Header() {
  const { apiKey, apiBaseUrl } = useAppContext();
  const { data, isPending, error } = useFetch<GenreResponse>(
    `${apiBaseUrl}/genre/movie/list?api_key=${apiKey}`
  );
  const title = "MOVIEFLIX";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    document.body.classList.toggle("no-overflow", isModalOpen);

    return () => {
      document.body.classList.remove("no-overflow");
    };
  });

  return (
    <header className='header'>
      <div className='container'>
        <div className='header-top'>
          <h1 className='header-logo'>
            <NavLink to='/'>{title}</NavLink>
          </h1>
          <button className='search-button' onClick={toggleModal}>
            <FiSearch />
          </button>
        </div>

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
      <SearchModal isOpen={isModalOpen} onClose={toggleModal} />
    </header>
  );
}
