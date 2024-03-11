import style from './Agenda.module.css';
import AgendaScreeningList from './agenda-screening-list/AgendaScreeningList';

const Agenda = () => {
    return (
        <main className={style.mainAgenda}>
            <h2>Agenda</h2>
            <AgendaScreeningList />
        </main>
    );
};

export default Agenda;
