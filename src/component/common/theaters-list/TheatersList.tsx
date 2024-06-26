import { useState } from 'react';
import { Theater } from '../../../model/Theater';
import TheaterCard from '../theater-card/TheaterCard';
import style from './TheaterList.module.css';
import ConfirmationModal from '../modal/confirmation-modal/ConfirmationModal';
import { deleteUserFavTheater } from '../../../client/users/user.client';
import { useAuthContext } from '../../../context/auth.context';
import { toast } from 'react-toastify';

type TheatersListProps = {
    theaters: Theater[];
    isUpdate?: boolean;
};

const TheatersList = (props: TheatersListProps) => {
    const { theaters, isUpdate = false } = props;
    const { currentUser } = useAuthContext();

    const [showModale, setShowModale] = useState<boolean>(false);
    const [theaterToDelete, setTheaterToDelete] = useState<Theater | null>(null);

    const openDeleteConfirmationModale = (theater: Theater) => {
        setTheaterToDelete(theater);
        setShowModale(true);
    };

    const deleteTheater = async () => {
        try {
            if (currentUser && theaterToDelete) {
                await deleteUserFavTheater(currentUser.id, theaterToDelete.id);
                toast.info(theaterToDelete.name + ' a bien été supprimé de vos favoris', {
                    icon: () => (
                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M26.0001 0C40.3595 0 52 11.6406 52 26.0001C52 40.3595 40.3595 52 26.0001 52C11.6406 52 0 40.3595 0 26.0001C0 11.6406 11.6406 0 26.0001 0ZM26.0001 3.8994C13.7942 3.8994 3.8994 13.7942 3.8994 26.0001C3.8994 38.206 13.7942 48.1006 26.0001 48.1006C38.2058 48.1006 48.1006 38.206 48.1006 26.0001C48.1006 13.7942 38.2058 3.8994 26.0001 3.8994ZM25.9905 22.0981C26.9776 22.0976 27.7938 22.8304 27.9236 23.7819L27.9415 24.0465L27.9509 38.3485C27.9516 39.4252 27.0792 40.2987 26.0025 40.2995C25.0154 40.3 24.1991 39.5672 24.0694 38.6157L24.0515 38.3511L24.0421 24.0491C24.0413 22.9724 24.9137 22.0989 25.9905 22.0981ZM26.0012 13.0053C27.4351 13.0053 28.5974 14.1677 28.5974 15.6014C28.5974 17.0353 27.4351 18.1976 26.0012 18.1976C24.5675 18.1976 23.4049 17.0353 23.4049 15.6014C23.4049 14.1677 24.5675 13.0053 26.0012 13.0053Z"
                                fill="#1B3043"
                            />
                        </svg>
                    )
                });
            }
            setShowModale(false);
        } catch (error: any) {
            console.error('An error occured.');
        }
    };

    return (
        <section className={style.theaterList}>
            {theaters.map(theater => (
                <div key={theater.id} className={style.theaterListCard}>
                    <TheaterCard theater={theater} />
                    {isUpdate && (
                        <button
                            data-testid="delete-button"
                            className={style.deleteButton}
                            onClick={() => {
                                openDeleteConfirmationModale(theater);
                            }}
                        >
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11 22C4.93412 22 0 17.0654 0 11C0 4.93465 4.93412 0 11 0C17.0659 0 22 4.93465 22 11C22 17.0654 17.0659 22 11 22ZM11 1.59629C5.81473 1.59629 1.59628 5.81473 1.59628 11C1.59628 16.1853 5.81473 20.4037 11 20.4037C16.1853 20.4037 20.4037 16.1853 20.4037 11C20.4037 5.81473 16.1853 1.59629 11 1.59629Z"
                                    fill="#EB6A5D"
                                />
                                <path
                                    d="M15.5719 16.495C15.467 16.495 15.3632 16.4744 15.2663 16.4344C15.1695 16.3943 15.0815 16.3355 15.0073 16.2614L5.86378 7.11735C5.78755 7.04373 5.72675 6.95566 5.68492 6.85828C5.64309 6.7609 5.62107 6.65617 5.62015 6.5502C5.61923 6.44422 5.63942 6.33912 5.67955 6.24103C5.71968 6.14294 5.77895 6.05383 5.85389 5.97889C5.92883 5.90395 6.01794 5.84468 6.11603 5.80455C6.21412 5.76442 6.31922 5.74423 6.42519 5.74515C6.53117 5.74607 6.6359 5.76809 6.73328 5.80992C6.83066 5.85175 6.91873 5.91255 6.99235 5.98878L16.1364 15.1328C16.2479 15.2445 16.3238 15.3867 16.3546 15.5415C16.3853 15.6962 16.3694 15.8567 16.309 16.0024C16.2486 16.1482 16.1463 16.2728 16.0151 16.3605C15.8839 16.4482 15.7297 16.495 15.5719 16.495Z"
                                    fill="#EB6A5D"
                                />
                                <path
                                    d="M6.42732 16.4949C6.26957 16.4948 6.11539 16.4479 5.98427 16.3602C5.85314 16.2725 5.75095 16.1479 5.6906 16.0021C5.63025 15.8563 5.61444 15.696 5.64518 15.5412C5.67592 15.3865 5.75182 15.2444 5.8633 15.1327L15.0068 5.98868C15.1565 5.83896 15.3595 5.75481 15.5712 5.75476C15.7829 5.75471 15.9859 5.83876 16.1357 5.98842C16.2854 6.13808 16.3695 6.34108 16.3696 6.55278C16.3696 6.76448 16.2856 6.96753 16.1359 7.11726L6.99188 16.2613C6.91773 16.3354 6.8297 16.3942 6.73284 16.4343C6.63597 16.4743 6.53216 16.4949 6.42732 16.4949Z"
                                    fill="#EB6A5D"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            ))}
            {theaterToDelete && (
                <ConfirmationModal
                    confirmationText={`Êtes-vous bien sûr de vouloir supprimer le cinéma ${theaterToDelete.name} de vos favoris ?`}
                    openModal={showModale}
                    rightButtonCallback={() => setShowModale(false)}
                    leftButtonCallback={() => deleteTheater()}
                />
            )}
        </section>
    );
};

export default TheatersList;
