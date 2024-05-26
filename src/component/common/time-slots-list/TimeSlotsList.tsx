import { Movie } from '../../../model/Movie';
import { Showtime } from '../../../model/Showtime';
import { Theater } from '../../../model/Theater';
import TimeSlotButton from '../time-slot-button/TimeSlotButton';
import style from './TimeSlotsList.module.css';

interface TimeSlotsListProps {
    showtimes: Showtime[];
    theater: Theater;
    movie: Movie;
}

const TimeSlotsList = (props: TimeSlotsListProps) => {
    const { showtimes, theater, movie } = props;

    return (
        <div className={style.timeSlotWrapper}>
            {showtimes.map(screening => (
                <TimeSlotButton
                    key={screening.id}
                    screeningId={screening.id}
                    screeningDate={screening.schedule}
                    theater={theater}
                    movie={movie}
                />
            ))}
        </div>
    );
};

export default TimeSlotsList;
