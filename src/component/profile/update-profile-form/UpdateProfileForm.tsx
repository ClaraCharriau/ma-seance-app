import { FormEvent, useState } from 'react';
import style from '../../../pages/profile/Profile.module.css';
import { useAuth } from '../../../hooks/useAuth';
import { User } from '../../../models/User';

interface UpdateProfileFormProps {
    user: User;
}

const UpdateProfileForm = (props: UpdateProfileFormProps) => {
    const { user } = props;
    const { pseudo, email } = user;

    const { checkUserExists, updateUserAccount, logUser } = useAuth();

    const [newPseudo, setNewPseudo] = useState(pseudo);
    const [newEmail, setNewEmail] = useState(email);
    const [currentPassword, setCurrentPassword] = useState('');

    const [pseudoError, setPseudoError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [verifyError, setVerifyError] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState('');

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateProfile();
    };

    const updateProfile = async () => {
        setVerifyError('');
        const userExists = await checkUserExists(newEmail);
        if (!userExists) {
            if (await isFormValid()) {
                console.log('ok, maj du profile');
                updateUserAccount(pseudo, email, currentPassword);
            } else {
                return;
            }
        } else {
            setVerifyError('Un compte existe déjà avec cette adresse email.');
        }
    };

    const isCurrentPasswordValid = async (): Promise<boolean> => {
        return !!(await logUser(email, currentPassword));
    };

    const isFormValid = async (): Promise<boolean> => {
        setPseudoError('');
        setEmailError('');
        setCurrentPasswordError('');

        if ('' === currentPassword) {
            setCurrentPasswordError('Entrez votre mot de passe actuel');
            return false;
        }

        if (!(await isCurrentPasswordValid())) {
            setCurrentPasswordError('Votre mot de passe actuel est erroné');
            return false;
        }

        if ('' === newPseudo) {
            setPseudoError('Choisissez un pseudo.');
            return false;
        }

        if (newPseudo.length < 4) {
            setPseudoError('Votre pseudo doit contenir plus de 4 caractères.');
            return false;
        }

        if ('' === newEmail) {
            setEmailError('Entrez votre adresse email.');
            return false;
        }

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Merci d'entrer une adresse email valide.");
            return false;
        }

        return true;
    };

    return (
        <form onSubmit={event => submitHandler(event)}>
            <p>Modifier vos informations de profil</p>
            {/* Pseudo */}
            <div className={style.inputContainer}>
                <label htmlFor="pseudo" className={style.inputLabel}>
                    Pseudo *
                </label>
                <input
                    type="text"
                    id="pseudo"
                    name="pseudo"
                    value={newPseudo}
                    onChange={event => setNewPseudo(event.target.value)}
                    className={pseudoError ? style.errorInput : ''}
                    required
                />
                <label className={style.error}>{pseudoError}</label>
            </div>

            {/* E-mail adress */}
            <div className={style.inputContainer}>
                <label htmlFor="email" className={style.inputLabel}>
                    Adresse e-mail *
                </label>
                <input
                    type="mail"
                    id="email"
                    name="email"
                    value={newEmail}
                    onChange={event => setNewEmail(event.target.value)}
                    className={emailError && style.errorInput}
                    required
                />
                <label className={style.error}>{emailError}</label>
                <label className={style.error}>{verifyError}</label>
            </div>

            <div className={style.inputContainer}>
                <label htmlFor="oldPassword" className={style.inputLabel}>
                    Votre mot de passe *
                </label>
                <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    value={currentPassword}
                    onChange={event => setCurrentPassword(event.target.value)}
                    className={currentPasswordError && style.errorInput}
                    required
                />
                <label className={style.error}>{currentPasswordError}</label>
            </div>

            <button className={style.orangeBtn} onClick={updateProfile}>
                Sauver les changements
            </button>
        </form>
    );
};

export default UpdateProfileForm;
