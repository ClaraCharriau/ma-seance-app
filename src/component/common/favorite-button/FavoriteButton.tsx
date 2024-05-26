import { useEffect, useState } from 'react';
import style from './FavoriteButton.module.css';
import { useFavoriteContext } from '../../../context/favorite.context';
import { useAuthContext } from '../../../context/auth.context';
import {
    addToUserFavMovies,
    deleteUserFavMovie,
    deleteUserFavTheater,
    addToUserFavTheaters as addToUserFavTheaters
} from '../../../client/users/user.client';
import { Movie } from '../../../model/Movie';
import { Theater } from '../../../model/Theater';
import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';

interface FavoriteButtonProps {
    itemId: string;
    itemType: 'theater' | 'movie';
}

const FavoriteButton = (props: FavoriteButtonProps) => {
    const { itemId, itemType } = props;
    const { currentUser } = useAuthContext();
    const { favoriteTheaters, favoriteMovies, refreshFavoriteMovies, refreshFavoriteTheaters } = useFavoriteContext();

    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        checkForFavorite();
        // eslint-disable-next-line
    }, [favoriteMovies, favoriteTheaters]);

    const setFavoriteValue = (favorites: Movie[] | Theater[]): void => {
        const value = favorites.some(item => item.id === itemId);
        setIsFavorite(value);
    };

    const checkForFavorite = () => {
        if (itemType === 'movie') {
            setFavoriteValue(favoriteMovies);
        } else if (itemType === 'theater') {
            setFavoriteValue(favoriteTheaters);
        }
    };

    const addToFavorites = async () => {
        if (itemType === 'movie') {
            try {
                currentUser &&
                    (await addToUserFavMovies(currentUser.id, itemId).then(() => {
                        refreshFavoriteMovies();
                        setFavoriteValue(favoriteMovies);
                        toast.success('Ajouté à la watchlist');
                    }));
            } catch (error: any) {
                console.error('An error occured');
            }
        } else if (itemType === 'theater') {
            try {
                currentUser &&
                    (await addToUserFavTheaters(currentUser.id, itemId).then(() => {
                        refreshFavoriteTheaters();
                        setFavoriteValue(favoriteTheaters);
                        toast.success('Ajouté aux favoris');
                    }));
            } catch (error: any) {
                console.error('An error occured');
            }
        }
    };

    const removeFromFavorites = async () => {
        if (itemType === 'movie') {
            try {
                currentUser &&
                    (await deleteUserFavMovie(currentUser.id, itemId).then(() => {
                        refreshFavoriteMovies();
                        setFavoriteValue(favoriteMovies);
                        toast.success('Retiré de la watchlist');
                    }));
            } catch (error: any) {
                console.error('An error occured');
            }
        } else if (itemType === 'theater') {
            try {
                currentUser &&
                    (await deleteUserFavTheater(currentUser.id, itemId).then(() => {
                        refreshFavoriteTheaters();
                        setFavoriteValue(favoriteTheaters);
                        toast.success('Retiré des favoris');
                    }));
            } catch (error: any) {
                console.error('An error occured');
            }
        }
    };

    const toggleFavorite = async () => {
        if (isFavorite) {
            removeFromFavorites();
        } else {
            addToFavorites();
        }
    };

    return (
        <>
            <Tooltip anchorSelect="#favorite-button" place="top">
                {isFavorite
                    ? `${itemType === 'theater' ? 'Retirer des favoris' : 'Retirer de la watchlist'}`
                    : `${itemType === 'theater' ? 'Ajouter aux favoris' : 'Ajouter à la watchlist'}`}
            </Tooltip>
            <button
                onClick={async () => {
                    await toggleFavorite();
                }}
                className={style.favoriteButtonWrapper}
                id="favorite-button"
                data-testid="button"
            >
                <svg
                    className={isFavorite ? style.heartfilled : style.heart}
                    viewBox="0 0 33 28"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M30.0569 3.26386L30.0588 3.26597C32.9452 6.45492 32.7315 11.7267 29.5079 14.9865L29.5071 14.9872L17.7552 26.9219L17.7534 26.9237C17.5851 27.0964 17.3845 27.2337 17.1633 27.3278C16.9422 27.4218 16.7048 27.4708 16.4648 27.472C16.2249 27.4732 15.987 27.4265 15.765 27.3347C15.5429 27.2428 15.3409 27.1074 15.1709 26.9364L15.1691 26.9346L2.99284 14.8095L2.99236 14.809C2.19548 14.0176 1.56732 13.0709 1.14646 12.0267C0.725595 10.9825 0.520911 9.86282 0.544994 8.73623C0.569076 7.60964 0.821415 6.49993 1.28649 5.47497C1.75157 4.45001 2.41956 3.53143 3.24949 2.77531L3.24949 2.77532L3.25121 2.77373C6.41871 -0.139405 11.6557 0.087266 14.8974 3.32917L14.8974 3.32919L14.9006 3.33229L15.9994 4.41195L16.3538 4.76016L16.7043 4.40797L18.0972 3.00815L18.0981 3.00717C18.8883 2.2087 19.8304 1.57901 20.8681 1.1557C21.9055 0.732453 23.0172 0.524181 24.1364 0.543286C25.2556 0.564788 26.3585 0.817247 27.3768 1.2851C28.3953 1.75303 29.3075 2.42649 30.0569 3.26386Z" />
                </svg>
                <p className={style.favoriteButtonText}>
                    Ce {itemType === 'theater' ? 'cinéma' : 'film'} {isFavorite ? 'est' : 'n’est pas'} dans{' '}
                    {itemType === 'theater' ? 'vos favoris' : 'votre watchlist'}
                </p>
            </button>
        </>
    );
};

export default FavoriteButton;
