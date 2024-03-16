import style from './WeekNavigation.module.css';
import useWeekDays, { IDay } from '../../../hooks/dates/useWeekDays';
import { NavLink, useLocation, useParams } from 'react-router-dom';

interface WeekNavigationProps {
    context: 'theaters' | 'movies';
}

const WeekNavigation = (props: WeekNavigationProps) => {
    const { context } = props;
    const { id } = useParams();
    const weekDays: IDay[] = useWeekDays();
    const location = useLocation();

    const navLinkClassName = (isActive: boolean, isPending: boolean) =>
        isPending ? `${style.dayButtonPending}` : isActive ? `${style.dayButtonActive}` : `${style.dayButton}`;

    return (
        <div className={style.shadowWrapper}>
            <nav className={style.plannerWrapper}>
                {weekDays.map((day, index) => (
                    <NavLink
                        to={`${context}/${id}/day-${index + 1}`}
                        state={location.state}
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
