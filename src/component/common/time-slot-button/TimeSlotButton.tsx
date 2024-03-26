import { useState } from 'react';
import { Movie } from '../../../models/Movie';
import { ScreeningDate } from '../../../models/ScreeningDate';
import { Theater } from '../../../models/Theater';
import ShowtimeModal from '../modals/showtime-modal/ShowtimeModal';
import style from './TimeSlotButton.module.css';

interface TimeSlotButtonProps {
    screeningDate: ScreeningDate;
    theater: Theater;
    movie: Movie;
}

const TimeSlotButton = (props: TimeSlotButtonProps) => {
    const { screeningDate, theater, movie } = props;

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const openModal = () => {
        setIsOpenModal(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    return (
        <>
            <button className={style.timeSlot} onClick={openModal}>
                {screeningDate.hourly}
            </button>
            <ShowtimeModal
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
