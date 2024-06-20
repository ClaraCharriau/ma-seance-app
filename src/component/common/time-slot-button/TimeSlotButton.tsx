import { useState } from 'react';
import { Movie } from '../../../model/Movie';
import { ScreeningDate } from '../../../model/ScreeningDate';
import { Theater } from '../../../model/Theater';
import ShowtimeModal from '../modal/showtime-modal/ShowtimeModal';
import style from './TimeSlotButton.module.css';
import { isBefore, parse } from 'date-fns';

interface TimeSlotButtonProps {
    screeningId: string;
    screeningDate: ScreeningDate;
    theater: Theater;
    movie: Movie;
}

const TimeSlotButton = (props: TimeSlotButtonProps) => {
    const { screeningId, screeningDate, theater, movie } = props;
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const now = new Date();
    const parsedHourly = parse(screeningDate.hourly, 'HH:mm', now);

    const openModal = () => {
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    return (
        <>
            <button className={style.timeSlot} onClick={openModal} disabled={isBefore(parsedHourly, now)}>
                {screeningDate.hourly}
            </button>
            <ShowtimeModal
                screeningId={screeningId}
                movie={movie}
                theater={theater}
                screeningDate={screeningDate}
                openModal={isOpenModal}
                closeModal={closeModal}
            />
        </>
    );
};

export default TimeSlotButton;
