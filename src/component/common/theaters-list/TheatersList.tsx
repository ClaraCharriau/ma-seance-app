import { Theater } from '../../../models/Theater';
import TheaterCard from '../theaters-card/TheaterCard';
import style from './TheaterList.module.css';

type TheatersListProps = {
    theaters: Theater[];
};

const TheatersList = (props: TheatersListProps) => {
    const { theaters } = props;

    return (
        <section className={style.theaterList}>
            {theaters.map(theater => (
                <TheaterCard theater={theater} key={theater.id} />
            ))}
        </section>
    );
};

export default TheatersList;
