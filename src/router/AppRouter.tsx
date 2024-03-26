import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Agenda from '../component/agenda-page/Agenda';
import Spinner from '../component/common/spinner/Spinner';
import Currently from '../component/currently-page/Currently';
import Error from '../component/error-page/Error';
import FavTheaters from '../component/fav-theaters-page/FavTheaterPage';
import Home from '../component/home-page/Home';
import Login from '../component/login-page/Login';
import MovieDetailsLayout from '../component/movie-details-page/MovieDetailsLayout';
import TheaterScreeningsList from '../component/movie-details-page/theater-screenings-list/TheaterScreeningsList';
import Profile from '../component/profile-page/Profile';
import ShowtimePage from '../component/showtime-page/ShowtimePage';
import TheaterDetailsLayout from '../component/theater-details-page/TheaterDetailsLayout';
import MoviesScreeningsList from '../component/theater-details-page/movies-screenings-list/MoviesScreeningsList';
import WatchList from '../component/watchlist-page/WatchList';
import AppLayout from './AppLayout';
import { appLoader } from './loaders/AppLoader';
import { movieLoader } from './loaders/movie-loader/MovieLoader';
import { movieScreeningsLoader } from './loaders/movie-screenings-loader/MovieScreeningsLoader';
import { theaterLoader } from './loaders/theater-loader/TheaterLoader';
import { theaterScreeningsLoader } from './loaders/theater-screenings-loader/TheaterScreeningsLoader';
import { showtimeLoader } from './loaders/showtime-loader/ShowtimeLoader';
import { SearchPage } from '../component/search-page/SearchPage';

const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: '/login',
            element: <Login />
        },
        {
            element: <AppLayout />,
            errorElement: <Error />,
            loader: appLoader,
            children: [
                {
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/currently',
                    element: <Currently />
                },
                {
                    path: '/agenda',
                    element: <Agenda />
                },
                {
                    loader: movieLoader,
                    element: <MovieDetailsLayout />,
                    children: [
                        {
                            path: '/movies/:id/:day?',
                            loader: theaterScreeningsLoader,
                            element: <TheaterScreeningsList />
                        }
                    ]
                },
                {
                    path: '/profile',
                    element: <Profile />
                },
                {
                    path: '/showtimes/:id',
                    loader: showtimeLoader,
                    element: <ShowtimePage />
                },
                {
                    loader: theaterLoader,
                    element: <TheaterDetailsLayout />,
                    children: [
                        {
                            path: '/theaters/:id/:day?',
                            loader: movieScreeningsLoader,
                            element: <MoviesScreeningsList />
                        }
                    ]
                },
                {
                    path: '/fav-theaters',
                    element: <FavTheaters />
                },
                {
                    path: '/watchlist',
                    element: <WatchList />
                },
                {
                    path: '/search',
                    element: <SearchPage />
                }
            ]
        }
    ]);
    return <RouterProvider router={router} fallbackElement={<Spinner />} />;
};

export default AppRouter;
