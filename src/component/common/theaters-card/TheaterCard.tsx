import { NavLink } from 'react-router-dom';
import { Theater } from '../../../models/Theater';
import style from './TheaterCard.module.css';

type TheaterCardProps = {
    theater: Theater;
};

const TheaterCard = (props: TheaterCardProps) => {
    const { theater } = props;

    const IMG_PATH = '/assets/img/theaters';
    const IMG_SUFFIX = '.jpg';

    return (
        <NavLink to={`/theaters/${theater.id}/day-1`} className={style.theaterCardWrapper}>
            <img
                className={style.theaterImg}
                src={IMG_PATH + theater.imgPath + IMG_SUFFIX}
                alt={'photo de ' + theater.name}
            />
            <div className={style.theaterCardInfos}>
                <p className={style.theaterName}>{theater.name}</p>
                <p className={style.theaterAddress}>{theater.address}</p>
            </div>
        </NavLink>
    );
};

export default TheaterCard;
