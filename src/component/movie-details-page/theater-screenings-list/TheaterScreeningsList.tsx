import { useLoaderData, useLocation } from 'react-router-dom';
import { TheaterScreenings } from '../../../models/TheaterScreenings';
import TimeSlotsList from '../../common/time-slots-list/TimeSlotsList';
import style from './TheaterScreeningsList.module.css';

const TheaterScreeningsList = () => {
    const showtimes = useLoaderData() as TheaterScreenings[];
    const location = useLocation();

    return (
        <section className={style.showtimesSection}>
            <h3 className={style.sectionTitle}>Dans vos cinémas favoris :</h3>
            {showtimes.map(showtimes => (
                <div key={showtimes.theater.id} className={style.theaterSchedule}>
                    <p className={style.theaterName}>{showtimes.theater.name}</p>
                    <TimeSlotsList
                        screeningDateList={showtimes.schedule}
                        theater={showtimes.theater}
                        movie={location.state.movie}
                    />
                </div>
            ))}
        </section>
    );
};

export default TheaterScreeningsList;
