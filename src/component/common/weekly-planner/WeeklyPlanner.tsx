import style from './WeeklyPlanner.module.css';
import useWeekDays, { IDay } from '../../../hooks/dates/useWeekDays';

const WeeklyPlanner = () => {
    const weekDays: IDay[] = useWeekDays();

    return (
        <div className={style.plannerWrapper}>
            {weekDays.map(day => (
                <button className={style.dayButton} key={day.dayNumber}>
                    <span className={style.dayOfWeek}>{day.dayOfWeek}</span>
                    <span className={style.dayNumber}>{day.dayNumber}</span>
                    <span className={style.month}>{day.month}</span>
                </button>
            ))}
        </div>
    );
};

export default WeeklyPlanner;
