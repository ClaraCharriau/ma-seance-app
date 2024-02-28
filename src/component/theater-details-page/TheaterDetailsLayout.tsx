import { Await, Outlet, useLoaderData } from 'react-router-dom';
import style from './TheaterDetailsLayout.module.css';
import FavoriteButton from '../common/favorite-button/FavoriteButton';
import WeekNavigation from '../common/week-navigation/WeekNavigation';
import React from 'react';
import ErrorPage from '../error-page/Error';
import Spinner from '../common/spinner/Spinner';

const TheaterDetailsLayout = () => {
    const data: any = useLoaderData();

    const IMG_PATH = '/assets/img/theaters';
    const IMG_SUFFIX = '.jpg';

    return (
        <React.Suspense fallback={<Spinner />}>
            <Await resolve={data.theater} errorElement={<ErrorPage />}>
                {theater => (
                    <>
                        <div className={style.backgroundWrapper}>
                            <img
                                className={style.theaterBackground}
                                src={IMG_PATH + theater.imgPath + IMG_SUFFIX}
                                alt={'photo de ' + theater.name}
                            />
                            <div className={style.fading}></div>
                        </div>

                        <main className={style.theaterDetailsMain}>
                            <div className={style.theaterDetailsHeader}>
                                <div className={style.theaterNameAddress}>
                                    <h2>{theater.name}</h2>
                                    <p>{theater.address}</p>
                                </div>
                                <FavoriteButton itemId={theater.id} itemType="theater" />
                            </div>

                            <section>
                                <h3 className={style.plannerTitle}>Prochaines séances :</h3>
                                <WeekNavigation />
                                <Outlet />
                            </section>
                        </main>
                    </>
                )}
            </Await>
        </React.Suspense>
    );
};

export default TheaterDetailsLayout;
