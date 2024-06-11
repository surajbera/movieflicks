import { Header, MovieList } from "../components";
import { useEffect } from "react";

export default function Homepage() {
  useEffect(() => {
    document.title = "Homepage";
  }, []);

  return (
    <>
      <Header />
      <MovieList />
    </>
  );
}
