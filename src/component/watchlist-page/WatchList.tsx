import { useState } from 'react';
import UpdateListButton from '../common/update-list-button/UpdateListButton';
import { useFavoriteContext } from '../../context/favorite.context';
import MovieList from '../common/movie-list/MovieList';
import EmptySection from '../common/empty-section/EmptySection';
import style from './WatchList.module.css';

const WatchList = () => {
    const { favoriteMovies } = useFavoriteContext();
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const toggleUpdate = () => {
        setIsUpdate(!isUpdate);
    };

    return (
        <main className={style.mainWatchlistPage}>
            <h2>Mes films à voir</h2>

            {favoriteMovies.length > 0 ? (
                <>
                    <UpdateListButton callBack={toggleUpdate} />
                    <MovieList movieList={favoriteMovies} isUpdate={isUpdate} />
                </>
            ) : (
                <EmptySection itemType="movie" />
            )}
        </main>
    );
};

export default WatchList;
