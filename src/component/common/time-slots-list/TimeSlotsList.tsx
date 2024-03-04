import TimeSlotButton from '../time-slot-button/TimeSlotButton';
import style from './TimeSlotsList.module.css';

interface TimeSlotsListProps {
    schedule: string[];
}

const TimeSlotsList = (props: TimeSlotsListProps) => {
    const { schedule } = props;
    return (
        <div className={style.timeSlotWrapper}>
            {schedule.map(time => (
                <TimeSlotButton key={time} time={time} />
            ))}
        </div>
    );
};

export default TimeSlotsList;
