import { createContext, useContext, useEffect, useState } from 'react';
import { Theater } from '../models/Theater';
import { getUserFavMovies, getUserFavTheaters } from '../client/users/user.client';
import { useAuthContext } from './auth.context';
import { Movie } from '../models/Movie';

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
    const [theaters, setTheaters] = useState<Theater[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const getFavorites = async () => {
            if (currentUser) {
                await Promise.allSettled([
                    getUserFavTheaters(currentUser.id).then(response => setTheaters(response)),
                    getUserFavMovies(currentUser.id).then(response => setMovies(response))
                ]);
            }
        };
        getFavorites();
    }, [currentUser]);

    const favoriteContext: IFavoriteContext = {
        favoriteTheaters: theaters,
        favoriteMovies: movies
    };

    return <FavoriteContext.Provider value={favoriteContext}>{children}</FavoriteContext.Provider>;
};

export const useFavoriteContext = () => useContext(FavoriteContext);
