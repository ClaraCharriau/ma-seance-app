import style from './TimeSlotButton.module.css';

interface TimeSlotButtonProps {
    time: string;
}

const TimeSlotButton = (props: TimeSlotButtonProps) => {
    const { time } = props;

    return <button className={style.timeSlot}>{time}</button>;
};

export default TimeSlotButton;
