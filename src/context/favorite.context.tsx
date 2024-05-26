import { createContext, useContext, useEffect, useState } from 'react';
import { getUserFavMovies, getUserFavTheaters } from '../client/users/user.client';
import { Movie } from '../model/Movie';
import { Theater } from '../model/Theater';
import { useAuthContext } from './auth.context';

/* eslint-disable */
interface IFavoriteContext {
    favoriteTheaters: Theater[] | [];
    favoriteMovies: Movie[] | [];
    refreshFavoriteTheaters: () => void;
    refreshFavoriteMovies: () => void;
}

const defaultContext: IFavoriteContext = {
    favoriteTheaters: [],
    favoriteMovies: [],
    refreshFavoriteMovies: () => {},
    refreshFavoriteTheaters: () => {}
};
/* eslint-enable */

export const FavoriteContext = createContext<IFavoriteContext>(defaultContext);

interface FavoriteProviderProps {
    children: JSX.Element;
}

export const FavoriteProvider = (props: FavoriteProviderProps) => {
    const { children } = props;
    const { currentUser } = useAuthContext();
    const [favoriteTheaters, setFavoriteTheaters] = useState<Theater[]>([]);
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const getFavorites = async () => {
            if (currentUser) {
                await Promise.allSettled([
                    getUserFavTheaters(currentUser.id).then(response => setFavoriteTheaters(response)),
                    getUserFavMovies(currentUser.id).then(response => setFavoriteMovies(response.records))
                ]);
            }
        };
        getFavorites();
    }, [currentUser]);

    const refreshFavoriteTheaters = async () => {
        if (currentUser) {
            await getUserFavTheaters(currentUser.id).then(response => setFavoriteTheaters(response));
        }
    };

    const refreshFavoriteMovies = async () => {
        if (currentUser) {
            await getUserFavMovies(currentUser.id).then(response => setFavoriteMovies(response.records));
        }
    };

    const favoriteContext: IFavoriteContext = {
        favoriteMovies,
        favoriteTheaters,
        refreshFavoriteMovies,
        refreshFavoriteTheaters
    };

    return <FavoriteContext.Provider value={favoriteContext}>{children}</FavoriteContext.Provider>;
};

export const useFavoriteContext = () => useContext(FavoriteContext);
