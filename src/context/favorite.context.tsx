import { createContext, useContext, useEffect, useState } from 'react';
import { Theater } from '../models/Theater';
import { getUserFavTheaters } from '../client/user.client';
import { useAuthContext } from './auth.context';

/* eslint-disable */
interface IFavoriteContext {
    favoriteTheaters: Theater[] | [];
}

const defaultContext: IFavoriteContext = {
    favoriteTheaters: []
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

    useEffect(() => {
        const getFavTheaters = async () => {
            if (currentUser) {
                const response = await getUserFavTheaters(currentUser.id);
                setTheaters(response);
            }
        };

        getFavTheaters();
    }, [currentUser]);

    const favoriteContext: IFavoriteContext = {
        favoriteTheaters: theaters
    };

    return <FavoriteContext.Provider value={favoriteContext}>{children}</FavoriteContext.Provider>;
};

export const useFavoriteContext = () => useContext(FavoriteContext);
