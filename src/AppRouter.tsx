import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home";
import Currently from "./pages/currently/Currently";
import Connexion from "./pages/connexion/Connexion";
import Agenda from "./pages/agenda/Agenda";
import Movie from "./pages/movie/Movie";
import Profile from "./pages/profile/Profile";
import Screening from "./pages/screening/Screening";
import Search from "./pages/search/Search";
import Theater from "./pages/theater/Theater";
import Error from "./pages/error/Error";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/connexion",
          element: <Connexion />,
        },
        {
          path: "/currently",
          element: <Currently />,
        },
        {
          path: "/agenda",
          element: <Agenda />,
        },
        {
          path: "/movie",
          element: <Movie />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/screening",
          element: <Screening />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/theater",
          element: <Theater />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
