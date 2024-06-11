// libraries
import { SearchList, Header } from "../components";
import { useEffect } from "react";

export default function SearchPage() {
  useEffect(() => {
    document.title = "Search Page";
  }, []);
  return (
    <>
      <Header />
      <SearchList />
    </>
  );
}
