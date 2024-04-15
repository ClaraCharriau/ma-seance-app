import { FormEvent, useState } from 'react';
import { useAuth } from '../../../hook/auth-hook/useAuth';
import { User } from '../../../models/User';
import style from '../Profile.module.css';
import { toast } from 'react-toastify';

interface UpdatePasswordFormProps {
    user: User;
}

const UpdatePasswordForm = (props: UpdatePasswordFormProps) => {
    const { user } = props;
    const { pseudo, email, id } = user;
    const { logUser, updateUserAccount } = useAuth();
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [passwordBis, setPasswordBis] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [currentPasswordError, setCurrentPasswordError] = useState('');

    const passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updatePassword();
    };

    const updatePassword = async (): Promise<void> => {
        if (await isFormValid()) {
            try {
                await updateUserAccount(id, pseudo, email, newPassword);
                toast.success('Votre mot de passe a bien été mis à jour');
            } catch (error: any) {
                console.error('An error occured');
            }
        }
    };

    const isCurrentPasswordValid = async (): Promise<boolean> => {
        return !!(await logUser(email, currentPassword));
    };

    const isNewPasswordValid = (password: string): boolean => {
        return !passwordRegex.test(password);
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
            setPasswordError('Les mots de passe doivent être identiques');
            return false;
        }

        if (isNewPasswordValid(newPassword)) {
            setPasswordError(
                'Le mot de passe doit contenir au moins 12 caractères, 1 majuscule, 1 minuscule et 1 chiffre'
            );
            return false;
        }

        return true;
    };

    return (
        <form onSubmit={event => submitHandler(event)}>
            <p>Modifier votre mot de passe</p>
            {/* Old password */}
            <div className={style.inputContainer}>
                <label htmlFor="oldUpdatePassword" className={style.inputLabel}>
                    Ancien mot de passe *
                </label>
                <input
                    type="password"
                    id="oldUpdatePassword"
                    name="oldUpdatePassword"
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
