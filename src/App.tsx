// libraries
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import { HomePage, ErrorPage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
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
