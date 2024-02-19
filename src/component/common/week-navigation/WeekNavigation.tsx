import style from './WeekNavigation.module.css';
import useWeekDays, { IDay } from '../../../hooks/dates/useWeekDays';
import { NavLink, useParams } from 'react-router-dom';
import { addDays } from 'date-fns';

const WeekNavigation = () => {
    const { theaterId } = useParams();
    const weekDays: IDay[] = useWeekDays();
    const today = new Date();

    return (
        <div className={style.plannerWrapper}>
            {weekDays.map((day, index) => (
                <NavLink
                    to={`/theaters/${theaterId}/${addDays(today, index)}`}
                    preventScrollReset={true}
                    className={style.dayButton}
                    key={day.dayNumber}
                >
                    <span className={style.dayOfWeek}>{day.dayOfWeek}</span>
                    <span className={style.dayNumber}>{day.dayNumber}</span>
                    <span className={style.month}>{day.month}</span>
                </NavLink>
            ))}
        </div>
    );
};

export default WeekNavigation;
