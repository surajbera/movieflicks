// libraries
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import { HomePage, ErrorPage, GenrePage, SearchPage } from "./pages";

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
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
