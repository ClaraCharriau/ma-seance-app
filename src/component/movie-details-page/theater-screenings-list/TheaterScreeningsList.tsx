import { useLoaderData, useLocation } from 'react-router-dom';
import { TheaterScreenings } from '../../../model/TheaterScreenings';
import TimeSlotsList from '../../common/time-slots-list/TimeSlotsList';
import style from './TheaterScreeningsList.module.css';

const TheaterScreeningsList = () => {
    const screenings = useLoaderData() as TheaterScreenings[];
    const location = useLocation();

    return (
        <section className={style.showtimesSection}>
            <h3 className={style.sectionTitle}>Dans vos cinémas favoris :</h3>
            {screenings.map(screening => (
                <div key={screening.theater.id} className={style.theaterSchedule}>
                    <p className={style.theaterName}>{screening.theater.name}</p>
                    <TimeSlotsList
                        showtimes={screening.showtimes}
                        theater={screening.theater}
                        movie={location.state.movie}
                    />
                </div>
            ))}
        </section>
    );
};

export default TheaterScreeningsList;
