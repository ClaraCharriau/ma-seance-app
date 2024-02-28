import style from './WeekNavigation.module.css';
import useWeekDays, { IDay } from '../../../hooks/dates/useWeekDays';
import { NavLink, useParams } from 'react-router-dom';
import { addDays, formatISO } from 'date-fns';

const WeekNavigation = () => {
    const { theaterId } = useParams();
    const weekDays: IDay[] = useWeekDays();
    const today = new Date();

    const navLinkClassName = (isActive: boolean, isPending: boolean) =>
        isPending ? `${style.dayButtonPending}` : isActive ? `${style.dayButtonActive}` : `${style.dayButton}`;

    return (
        <div className={style.shadowWrapper}>
            <nav className={style.plannerWrapper}>
                {weekDays.map((day, index) => (
                    <NavLink
                        to={`/theaters/${theaterId}/${formatISO(addDays(today, index), { representation: 'date' })}`}
                        preventScrollReset={true}
                        className={({ isActive, isPending }) => navLinkClassName(isActive, isPending)}
                        key={day.dayNumber}
                    >
                        <span className={style.dayOfWeek}>{day.dayOfWeek}</span>
                        <span className={style.dayNumber}>{day.dayNumber}</span>
                        <span className={style.month}>{day.month}</span>
                    </NavLink>
                ))}
            </nav>
            <div className={style.shadow}></div>
        </div>
    );
};

export default WeekNavigation;
