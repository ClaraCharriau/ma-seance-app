import { FormEvent, useState } from 'react';
import style from '../../../pages/profile/Profile.module.css';
import { User } from '../../../models/User';
import { useAuth } from '../../../hooks/useAuth';

interface UpdatePasswordFormProps {
    user: User;
}

const UpdatePasswordForm = (props: UpdatePasswordFormProps) => {
    const { user } = props;
    const { pseudo, email } = user;
    const { logUser, updateUserAccount } = useAuth();

    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [passwordBis, setPasswordBis] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState('');

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updatePassword();
    };

    const updatePassword = async (): Promise<void> => {
        if (await isFormValid()) {
            console.log('update user password');
            updateUserAccount(pseudo, email, newPassword);
        }
    };

    const isCurrentPasswordValid = async (): Promise<boolean> => {
        return !!(await logUser(email, currentPassword));
    };

    const isFormValid = async (): Promise<boolean> => {
        setPasswordError('');
        setCurrentPasswordError('');

        if ('' === currentPassword) {
            setCurrentPasswordError('Entrez votre mot de passe actuel');
            return false;
        }

        if (!(await isCurrentPasswordValid())) {
            setCurrentPasswordError('Votre mot de passe actuel est erroné');
            return false;
        }

        if ('' === newPassword) {
            setPasswordError('Entrez votre nouveau mot de passe');
            return false;
        }

        if ('' === passwordBis) {
            setPasswordError('Entrez une seconde fois votre nouveau mot de passe');
            return false;
        }

        if (passwordBis !== newPassword) {
            setPasswordError('Les mots de passe doivent être identiques.');
            return false;
        }

        if (newPassword.length < 7) {
            setPasswordError('Le mot de passe doit contenir au moins 8 caractères');
            return false;
        }

        return true;
    };

    return (
        <form onSubmit={event => submitHandler(event)}>
            <p>Modifier votre mot de passe</p>
            {/* Old password */}
            <div className={style.inputContainer}>
                <label htmlFor="oldPassword" className={style.inputLabel}>
                    Ancien mot de passe *
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

            {/* New password */}
            <div className={style.inputContainer}>
                <label htmlFor="newPassword" className={style.inputLabel}>
                    Nouveau mot de passe *
                </label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={event => setNewPassword(event.target.value)}
                    className={passwordError && style.errorInput}
                    required
                />
                <label className={style.error}>{passwordError}</label>
            </div>

            {/* Password confirmation */}
            <div className={style.inputContainer}>
                <label htmlFor="passwordBis" className={style.inputLabel}>
                    Confirmez le mot de passe *
                </label>
                <input
                    type="password"
                    id="passwordBis"
                    name="passwordBis"
                    value={passwordBis}
                    onChange={ev => setPasswordBis(ev.target.value)}
                    className={passwordError && style.errorInput}
                    required
                />
            </div>

            <button type="submit" className={style.orangeBtn} onClick={() => updatePassword()}>
                Changer de mot de passe
            </button>
        </form>
    );
};

export default UpdatePasswordForm;
