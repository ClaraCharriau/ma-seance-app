import TimeSlotButton from '../time-slot-button/TimeSlotButton';
import style from './TimeSlotsList.module.css';

interface TimeSlotsListProps {
    schedule: string[];
}

const TimeSlotsList = (props: TimeSlotsListProps) => {
    const { schedule } = props;
    const scheduleList: string[] = schedule.sort();

    return (
        <div className={style.timeSlotWrapper}>
            {scheduleList.map(time => (
                <TimeSlotButton key={time} time={time} />
            ))}
        </div>
    );
};

export default TimeSlotsList;
