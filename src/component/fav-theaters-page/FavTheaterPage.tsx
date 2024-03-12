import { useFavoriteContext } from '../../context/favorite.context';
import EmptySection from '../common/empty-section/EmptySection';
import TheatersList from '../common/theaters-list/TheatersList';
import style from './FavTheaterPage.module.css';

const FavTheaters = () => {
    const { favoriteTheaters } = useFavoriteContext();

    return (
        <main className={style.mainFavTheaterPage}>
            <h2>Mes cinémas favoris</h2>
            <TheatersList theaters={favoriteTheaters} />

            {favoriteTheaters.length === 0 && <EmptySection itemType="theater" />}
        </main>
    );
};

export default FavTheaters;
