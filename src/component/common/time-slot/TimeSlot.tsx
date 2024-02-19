import style from './TimeSlot.module.css';

interface TimeSlotProps {
    time: string;
}

const TimeSlot = (props: TimeSlotProps) => {
    const { time } = props;

    const partieDate = time.split('T')[1]; // Sépare la partie du temps après le "T"
    const partieHeure = partieDate.split(':').slice(0, 2); // Sépare les heures et les minutes
    const heureFormattee = partieHeure.join(':');

    return <button className={style.timeSlot}>{heureFormattee}</button>;
};

export default TimeSlot;
