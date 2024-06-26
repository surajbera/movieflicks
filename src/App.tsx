// libraries
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import { HomePage, ErrorPage, GenrePage, SearchPage, MovieDetailPage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/genre/:id",
    element: <GenrePage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetailPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
