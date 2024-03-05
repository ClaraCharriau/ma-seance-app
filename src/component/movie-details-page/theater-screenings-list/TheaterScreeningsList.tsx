import { useLoaderData } from 'react-router-dom';
import { TheaterScreenings } from '../../../models/TheaterScreenings';
import style from './TheaterScreeningsList.module.css';
import TimeSlotsList from '../../common/time-slots-list/TimeSlotsList';

const TheaterScreeningsList = () => {
    const showtimes = useLoaderData() as TheaterScreenings[];

    return (
        <section className={style.showtimesSection}>
            <h3 className={style.sectionTitle}>Dans vos cinémas favoris :</h3>
            {showtimes.map(showtimes => (
                <div key={showtimes.theater.id} className={style.theaterSchedule}>
                    <p className={style.theaterName}>{showtimes.theater.name}</p>
                    <TimeSlotsList schedule={showtimes.schedule} />
                </div>
            ))}
        </section>
    );
};

export default TheaterScreeningsList;
