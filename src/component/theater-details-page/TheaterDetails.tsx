import { useLoaderData } from 'react-router-dom';
import { Theater } from '../../models/Theater';
import style from './TheaterDetails.module.css';

const TheaterDetails = () => {
    const theater = useLoaderData() as Theater;

    const IMG_PATH = '/assets/img/theaters';
    const IMG_SUFFIX = '.jpg';

    return (
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
                <h2>{theater.name}</h2>
                <p>{theater.address}</p>
            </main>
        </>
    );
};

export default TheaterDetails;
