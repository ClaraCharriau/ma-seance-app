import { Movie } from '../../../model/Movie';
import { ScreeningDate } from '../../../model/ScreeningDate';
import { Theater } from '../../../model/Theater';
import TimeSlotButton from '../time-slot-button/TimeSlotButton';
import style from './TimeSlotsList.module.css';

interface TimeSlotsListProps {
    screeningDateList: ScreeningDate[];
    theater: Theater;
    movie: Movie;
}

const TimeSlotsList = (props: TimeSlotsListProps) => {
    const { screeningDateList, theater, movie } = props;

    return (
        <div className={style.timeSlotWrapper}>
            {screeningDateList.map((screeningDate: ScreeningDate) => (
                <TimeSlotButton
                    key={screeningDate.date}
                    screeningDate={screeningDate}
                    theater={theater}
                    movie={movie}
                />
            ))}
        </div>
    );
};

export default TimeSlotsList;
