import { useLoaderData } from 'react-router-dom';
import { TheaterScreenings } from '../../../model/TheaterScreenings';
import TimeSlotsList from '../../common/time-slots-list/TimeSlotsList';
import style from './TheaterScreeningsList.module.css';
import { Movie } from '../../../model/Movie';

const TheaterScreeningsList = () => {
    const theaterLoaderData = useLoaderData() as { theaterScreenings: TheaterScreenings[]; movie: Movie };

    return (
        <section className={style.showtimesSection}>
            {theaterLoaderData.theaterScreenings.length > 0 ? (
                <h3 className={style.sectionTitle}>Dans vos cinémas favoris :</h3>
            ) : (
                <p>Pas de séances prévues ce jour-là dans vos cinémas favoris.</p>
            )}
            {theaterLoaderData.theaterScreenings.map(screening => (
                <div key={screening.theater.id} className={style.theaterSchedule}>
                    <p className={style.theaterName}>{screening.theater.name}</p>
                    <TimeSlotsList
                        showtimes={screening.showtimes}
                        theater={screening.theater}
                        movie={theaterLoaderData.movie}
                    />
                </div>
            ))}
        </section>
    );
};

export default TheaterScreeningsList;
