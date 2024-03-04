import style from './WeekNavigation.module.css';
import useWeekDays, { IDay } from '../../../hooks/dates/useWeekDays';
import { NavLink, useParams } from 'react-router-dom';

const WeekNavigation = () => {
    const { theaterId } = useParams();
    const weekDays: IDay[] = useWeekDays();

    const navLinkClassName = (isActive: boolean, isPending: boolean) =>
        isPending ? `${style.dayButtonPending}` : isActive ? `${style.dayButtonActive}` : `${style.dayButton}`;

    return (
        <div className={style.shadowWrapper}>
            <nav className={style.plannerWrapper}>
                {weekDays.map((day, index) => (
                    <NavLink
                        to={`/theaters/${theaterId}/day-${index + 1}`}
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
