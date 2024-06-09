// libraries
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import { HomePage, ErrorPage, GenrePage } from "./pages";

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
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
