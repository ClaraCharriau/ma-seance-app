import style from './TimeSlotButton.module.css';

interface TimeSlotButtonProps {
    time: string;
}

const TimeSlotButton = (props: TimeSlotButtonProps) => {
    const { time } = props;

    const partieDate = time.split('T')[1]; // Sépare la partie du temps après le "T"
    const partieHeure = partieDate.split(':').slice(0, 2); // Sépare les heures et les minutes
    const heureFormattee = partieHeure.join(':');

    return <button className={style.timeSlot}>{heureFormattee}</button>;
};

export default TimeSlotButton;
