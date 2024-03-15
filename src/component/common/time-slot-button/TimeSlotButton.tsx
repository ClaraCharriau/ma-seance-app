import { Movie } from '../../../models/Movie';
import { ScreeningDate } from '../../../models/ScreeningDate';
import { Theater } from '../../../models/Theater';
import style from './TimeSlotButton.module.css';

interface TimeSlotButtonProps {
    screeningDate: ScreeningDate;
    theater: Theater;
    movie: Movie;
}

const TimeSlotButton = (props: TimeSlotButtonProps) => {
    const { screeningDate, theater, movie } = props;

    const handleClick = () => {
        console.log('le film ' + movie.title);
        console.log('la date et heure ' + screeningDate.date);
        console.log('le cinéma ' + theater.name);
    };

    return (
        <button className={style.timeSlot} onClick={handleClick}>
            {screeningDate.hourly}
        </button>
    );
};

export default TimeSlotButton;
