import { NavLink } from 'react-router-dom';
import { Theater } from '../../../models/Theater';
import style from '../fav-theater-carousel/FavTheater.module.css';
import 'pure-react-carousel/dist/react-carousel.es.css';

interface FavTheaterCardProps {
    theater: Theater;
}

const FavTheaterCard = (props: FavTheaterCardProps) => {
    const { theater } = props;

    const IMG_PATH = '/assets/img/theaters';
    const IMG_SUFFIX = '.jpg';

    return (
        <NavLink to={`/theaters/${theater.id}`} className={style.card}>
            <img
                className={style.theaterCardImg}
                src={IMG_PATH + theater.imgPath + IMG_SUFFIX}
                alt={'photo de ' + theater.name}
            />
            <p className={style.theaterName}>{theater.name}</p>
        </NavLink>
    );
};

export default FavTheaterCard;
