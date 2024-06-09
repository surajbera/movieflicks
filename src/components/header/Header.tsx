// libraries
import { Link } from "react-router-dom";

// styles
import "./Header.scss";

export default function Header() {
  const title = "MOVIEFLIX";

  return (
    <header>
      <div className='container'>
        <h1 className='header-logo'>
          <Link to='/'>{title}</Link>
        </h1>
      </div>
    </header>
  );
}
