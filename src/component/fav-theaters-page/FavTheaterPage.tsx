import { useState } from 'react';
import { useFavoriteContext } from '../../context/favorite.context';
import EmptySection from '../common/empty-section/EmptySection';
import TheatersList from '../common/theaters-list/TheatersList';
import style from './FavTheaterPage.module.css';

const FavTheaters = () => {
    const { favoriteTheaters } = useFavoriteContext();
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const toggleUpdate = () => {
        setIsUpdate(!isUpdate);
    };

    const updateButtonClassName = () => {
        return isUpdate ? `${style.updateButton}` : `${style.updateButtonActive}`;
    };

    return (
        <main className={style.mainFavTheaterPage}>
            <h2>Mes cinémas favoris</h2>

            <button className={updateButtonClassName()} onClick={toggleUpdate}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 10.8118C0 11.4653 0.534653 11.9999 1.18812 11.9999H2.73267L0 9.26727V10.8118Z" />
                    <path d="M11.6436 2.25743L9.74262 0.356436C9.26737 -0.118812 8.5545 -0.118812 8.07926 0.356436L7.96044 0.475247C7.72282 0.712871 7.72282 1.06931 7.96044 1.30693L10.6931 4.0396C10.9307 4.27723 11.2872 4.27723 11.5248 4.0396L11.6436 3.92079C12.1189 3.44554 12.1189 2.73267 11.6436 2.25743Z" />
                    <path d="M7.1286 2.13861C6.89097 1.90098 6.53454 1.90098 6.29691 2.13861L0.890974 7.54455C0.593945 7.84158 0.593945 8.19801 0.831568 8.43563L3.56424 11.1683C3.80187 11.4059 4.1583 11.4059 4.39592 11.1683L9.80186 5.76237C10.0395 5.52474 10.0395 5.16831 9.80186 4.93069L7.1286 2.13861Z" />
                </svg>
                modifier
            </button>

            <TheatersList theaters={favoriteTheaters} isUpdate={isUpdate} />

            {favoriteTheaters.length === 0 && <EmptySection itemType="theater" />}
        </main>
    );
};

export default FavTheaters;
