import { createContext, useContext, useMemo, useState } from 'react';
import { getUserFavMovies, getUserFavTheaters } from '../client/users/user.client';
import { Movie } from '../models/Movie';
import { Theater } from '../models/Theater';
import { useAuthContext } from './auth.context';

/* eslint-disable */
interface IFavoriteContext {
    favoriteTheaters: Theater[] | [];
    favoriteMovies: Movie[] | [];
}

const defaultContext: IFavoriteContext = {
    favoriteTheaters: [],
    favoriteMovies: []
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

    useMemo(() => {
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

    const favoriteContext: IFavoriteContext = {
        favoriteTheaters,
        favoriteMovies
    };

    return <FavoriteContext.Provider value={favoriteContext}>{children}</FavoriteContext.Provider>;
};

export const useFavoriteContext = () => useContext(FavoriteContext);
