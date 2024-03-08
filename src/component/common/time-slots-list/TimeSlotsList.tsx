import { ScreeningDate } from '../../../models/ScreeningDate';
import TimeSlotButton from '../time-slot-button/TimeSlotButton';
import style from './TimeSlotsList.module.css';

interface TimeSlotsListProps {
    scheduleList: ScreeningDate[];
}

const TimeSlotsList = (props: TimeSlotsListProps) => {
    const { scheduleList } = props;

    return (
        <div className={style.timeSlotWrapper}>
            {scheduleList.map(schedule => (
                <TimeSlotButton key={schedule.date} time={schedule.hourly} />
            ))}
        </div>
    );
};

export default TimeSlotsList;
