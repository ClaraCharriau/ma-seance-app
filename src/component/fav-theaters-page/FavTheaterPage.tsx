import { useState } from 'react';
import { useFavoriteContext } from '../../context/favorite.context';
import EmptySection from '../common/empty-section/EmptySection';
import TheatersList from '../common/theaters-list/TheatersList';
import UpdateListButton from '../common/update-list-button/UpdateListButton';
import style from './FavTheaterPage.module.css';

const FavTheaters = () => {
    const { favoriteTheaters } = useFavoriteContext();

    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const toggleUpdate = () => {
        setIsUpdate(!isUpdate);
    };

    return (
        <main className={style.mainFavTheaterPage}>
            <h2>Mes cinémas favoris</h2>

            {favoriteTheaters.length > 0 ? (
                <>
                    <UpdateListButton callBack={toggleUpdate} />
                    <TheatersList theaters={favoriteTheaters} isUpdate={isUpdate} />
                </>
            ) : (
                <EmptySection itemType="theater" />
            )}
        </main>
    );
};

export default FavTheaters;
