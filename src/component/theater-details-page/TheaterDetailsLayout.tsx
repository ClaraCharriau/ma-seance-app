import { Await, Outlet, useLoaderData } from 'react-router-dom';
import style from './TheaterDetailsLayout.module.css';
import FavoriteButton from '../common/favorite-button/FavoriteButton';
import WeekNavigation from '../common/week-navigation/WeekNavigation';
import ErrorPage from '../error-page/Error';
import Spinner from '../common/spinner/Spinner';
import { Theater } from '../../model/Theater';
import { Suspense } from 'react';

const TheaterDetailsLayout = () => {
    const data = useLoaderData() as {
        theater: Theater;
    };

    const IMG_PATH = '/assets/img/theaters';
    const IMG_SUFFIX = '.jpg';

    return (
        <Suspense fallback={<Spinner />}>
            <Await resolve={data.theater} errorElement={<ErrorPage />}>
                {theater => (
                    <>
                        <div className={style.backgroundWrapper}>
                            <img
                                className={style.theaterBackground}
                                src={IMG_PATH + theater.imagePath + IMG_SUFFIX}
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
                                <WeekNavigation context="theaters" />
                                <Outlet />
                            </section>
                        </main>
                    </>
                )}
            </Await>
        </Suspense>
    );
};

export default TheaterDetailsLayout;
