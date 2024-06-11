import { GenreList, Header } from "../components";
import { useEffect } from "react";

export default function GenrePage() {
  useEffect(() => {
    document.title = "Genre Page";
  }, []);
  return (
    <>
      <Header />
      <GenreList />
    </>
  );
}
