import { endOfMonth, endOfWeek, isAfter, isBefore } from 'date-fns';
import { Link } from 'react-router-dom';
import { useAgendaContext } from '../../../context/agenda.context';
import style from '../Agenda.module.css';
import AgendaScreeningCard from '../agenda-screening-card/AgendaScreeningCard';

const AgendaScreeningList = () => {
    const { screenings } = useAgendaContext();

    const today = new Date();
    const endOfThisWeek = endOfWeek(today, { weekStartsOn: 1 });
    const endOfThisMonth = endOfMonth(today);

    const thisWeekScreenings = screenings.filter(screening => {
        const showDate = new Date(screening.schedule.date);
        return isAfter(showDate, today) && isBefore(showDate, endOfThisWeek);
    });

    const thisMonthScreenings = screenings.filter(screening => {
        const showDate = new Date(screening.schedule.date);
        return isAfter(showDate, endOfThisWeek) && isBefore(showDate, endOfThisMonth);
    });

    const afterThisMonthScreenings = screenings.filter(screening => {
        const showDate = new Date(screening.schedule.date);
        return isAfter(showDate, endOfThisMonth);
    });

    const pastScreenings = screenings.filter(screening => {
        const showDate = new Date(screening.schedule.date);
        return isBefore(showDate, today);
    });

    return (
        <section className={style.agendaPageSection}>
            {thisWeekScreenings.length > 0 && <p>Cette semaine</p>}
            {thisWeekScreenings.map(show => (
                <AgendaScreeningCard screening={show} key={show.id} />
            ))}

            {thisMonthScreenings.length > 0 && <p>Ce mois-ci</p>}
            {thisMonthScreenings.map(show => (
                <AgendaScreeningCard screening={show} key={show.id} />
            ))}

            {afterThisMonthScreenings.length > 0 && <p>À venir</p>}
            {afterThisMonthScreenings.map(show => (
                <AgendaScreeningCard screening={show} key={show.id} />
            ))}

            {pastScreenings.length > 0 && (
                <p className={style.pastScreeningsTitle}>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.5 19C7.62108 19 5.78435 18.4428 4.22209 17.399C2.65982 16.3551 1.44218 14.8714 0.723149 13.1355C0.0041162 11.3996 -0.184015 9.48946 0.182544 7.64665C0.549104 5.80383 1.45389 4.11109 2.78249 2.78249C4.11109 1.45389 5.80383 0.549104 7.64665 0.182544C9.48946 -0.184015 11.3996 0.0041162 13.1355 0.723149C14.8714 1.44218 16.3551 2.65982 17.399 4.22209C18.4428 5.78435 19 7.62108 19 9.5C19 12.0196 17.9991 14.4359 16.2175 16.2175C14.4359 17.9991 12.0196 19 9.5 19ZM9.5 1.46154C7.91015 1.46154 6.35599 1.93299 5.03407 2.81627C3.71216 3.69954 2.68185 4.95498 2.07343 6.42382C1.46502 7.89265 1.30583 9.50892 1.616 11.0682C1.92616 12.6275 2.69175 14.0599 3.81595 15.1841C4.94015 16.3083 6.37247 17.0738 7.93178 17.384C9.49109 17.6942 11.1074 17.535 12.5762 16.9266C14.045 16.3182 15.3005 15.2878 16.1837 13.9659C17.067 12.644 17.5385 11.0899 17.5385 9.5C17.5385 7.36807 16.6916 5.32346 15.1841 3.81595C13.6765 2.30845 11.6319 1.46154 9.5 1.46154Z"
                            fill="#FFFDEF"
                        />
                        <path
                            d="M13.5191 14.25C13.4229 14.2505 13.3275 14.2321 13.2385 14.1957C13.1495 14.1594 13.0685 14.1058 13.0002 14.0381L8.98098 10.0188C8.91325 9.95055 8.85967 9.86957 8.8233 9.78053C8.78693 9.6915 8.7685 9.59616 8.76906 9.49999V3.65383C8.76906 3.46002 8.84605 3.27415 8.98309 3.1371C9.12014 3.00006 9.30601 2.92307 9.49982 2.92307C9.69364 2.92307 9.87951 3.00006 10.0166 3.1371C10.1536 3.27415 10.2306 3.46002 10.2306 3.65383V9.20037L14.0379 13.0004C14.1064 13.0683 14.1608 13.1491 14.1979 13.2382C14.235 13.3272 14.2541 13.4227 14.2541 13.5192C14.2541 13.6157 14.235 13.7112 14.1979 13.8003C14.1608 13.8893 14.1064 13.9701 14.0379 14.0381C13.9696 14.1058 13.8886 14.1594 13.7996 14.1957C13.7106 14.2321 13.6152 14.2505 13.5191 14.25Z"
                            fill="#FFFDEF"
                        />
                    </svg>
                    Séances passées
                </p>
            )}
            <div className={style.pastScreeningsWrapper}>
                {pastScreenings.map(show => (
                    <AgendaScreeningCard screening={show} key={show.id} />
                ))}
            </div>

            {screenings.length <= 0 && (
                <div className={style.emptyAgendaMessage}>
                    <p>Rien de prévu...</p>
                    <Link to="/currently">CONSULTEZ LES SORTIES DE LA SEMAINE</Link>
                </div>
            )}
        </section>
    );
};

export default AgendaScreeningList;
