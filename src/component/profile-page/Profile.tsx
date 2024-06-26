import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/auth.context';
import { useAuth } from '../../hook/auth-hook/useAuth';
import ConfirmationModal from '../common/modal/confirmation-modal/ConfirmationModal';
import style from './Profile.module.css';
import UpdatePasswordForm from './update-password-form/UpdatePasswordForm';
import UpdateProfileForm from './update-profile-form/UpdateProfileForm';

const Profile = () => {
    const { currentUser, clearCurrentUserToken } = useAuthContext();
    const { deleteUserAccount } = useAuth();
    const navigate = useNavigate();
    const [showModale, setShowModale] = useState<boolean>(false);

    const logOut = (): void => {
        clearCurrentUserToken();
        navigate('/login');
    };

    const openDeleteConfirmationModale = () => {
        setShowModale(true);
    };

    const deleteAccount = async (id: string): Promise<void> => {
        try {
            await deleteUserAccount(id);
            logOut();
        } catch (error: any) {
            console.error('An error occured.');
        }
    };

    return (
        currentUser && (
            <main className={style.profileMain}>
                <section>
                    <svg
                        className={style.profileIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 25"
                        fill="none"
                    >
                        <path d="M12 0.362183C5.38308 0.362183 0 5.74526 0 12.3622C0 18.9787 5.38308 24.3622 12 24.3622C18.6165 24.3622 24 18.9787 24 12.3622C24 5.74526 18.6165 0.362183 12 0.362183ZM12 1.54251C17.9658 1.54251 22.8197 6.39602 22.8197 12.3622C22.8197 14.3428 22.2822 16.1994 21.3494 17.7976C20.6258 14.8334 17.9252 12.4633 14.4523 11.6914C15.2577 10.9993 15.7708 9.97595 15.7708 8.8334C15.7708 6.75445 14.0793 5.06304 12.0004 5.06304C9.92144 5.06304 8.23003 6.75445 8.23003 8.8334C8.23003 9.97595 8.74269 10.9993 9.54807 11.6914C6.07515 12.4633 3.37456 14.8334 2.65141 17.7976C1.71777 16.1994 1.18033 14.3428 1.18033 12.3622C1.18033 6.39602 6.03384 1.54251 12 1.54251ZM9.40997 8.8334C9.40997 7.4052 10.5718 6.24336 12 6.24336C13.4282 6.24336 14.59 7.4052 14.59 8.8334C14.59 10.2616 13.4282 11.4234 12 11.4234C10.5718 11.4234 9.40997 10.2616 9.40997 8.8334ZM12 23.1819C8.64118 23.1819 5.63528 21.6435 3.64918 19.2341C3.75305 15.5648 7.45495 12.6038 12 12.6038C16.545 12.6038 20.247 15.5644 20.3512 19.2341C18.3647 21.6435 15.3588 23.1819 12 23.1819Z" />
                    </svg>
                    <h2 className={style.profileName}>{currentUser.pseudo}</h2>
                    <p>Paramètres de votre profil</p>
                    <button className={style.logoutBtn} onClick={logOut}>
                        Déconnexion
                    </button>
                </section>

                <section className={style.profileFormsContainer}>
                    {<UpdateProfileForm user={currentUser} />}

                    {<UpdatePasswordForm user={currentUser} />}
                </section>

                <button className={style.deleteBtn} onClick={openDeleteConfirmationModale}>
                    Supprimer mon compte
                </button>
                <p>⚠️ Attention, la suppression de votre compte est irréversible.</p>

                <ConfirmationModal
                    confirmationText="Êtes-vous bien sûr de vouloir supprimer votre compte ? ⚠️ Cette action est irréversible."
                    openModal={showModale}
                    rightButtonCallback={() => setShowModale(false)}
                    leftButtonCallback={() => deleteAccount(currentUser.id)}
                />
            </main>
        )
    );
};

export default Profile;
