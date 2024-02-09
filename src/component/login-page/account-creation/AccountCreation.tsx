import { FormEvent, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import style from '../Login.module.css';

interface AccountCreationProps {
    onSignUpClick: () => void;
}

const AccountCreation = (props: AccountCreationProps) => {
    const { onSignUpClick } = props;
    const { createUserAccount, checkUserExists } = useAuth();

    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordBis, setPasswordBis] = useState('');
    const [pseudoError, setPseudoError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [verifyError, setVerifyError] = useState('');

    const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        createAccount();
    };

    const createAccount = async (): Promise<void> => {
        const userExists = await checkUserExists(email);
        if (!userExists) {
            if (isFormValid()) {
                await createUserAccount(pseudo, email, password);
                onSignUpClick();
            } else {
                setVerifyError("Une erreur s'est produite.");
            }
        } else {
            setVerifyError('Un compte existe déjà avec cette adresse email.');
        }
    };

    const isFormValid = (): boolean => {
        setPseudoError('');
        setEmailError('');
        setPasswordError('');

        if ('' === pseudo) {
            setPseudoError('Choisissez un pseudo.');
            return false;
        }

        if (pseudo.length < 4) {
            setPseudoError('Votre pseudo doit contenir plus de 4 caractères.');
            return false;
        }

        if ('' === email) {
            setEmailError('Entrez votre adresse email.');
            return false;
        }

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Merci d'entrer une adresse email valide.");
            return false;
        }

        if ('' === password) {
            setPasswordError('Entrez votre mot de passe');
            return false;
        }

        if (passwordBis !== password) {
            setPasswordError('Les mots de passe doivent être identiques.');
            return false;
        }

        if (password.length < 7) {
            setPasswordError('Le mot de passe doit contenir au moins 8 caractères');
            return false;
        }

        return true;
    };

    return (
        <form className={style.loginForm} onSubmit={event => submitHandler(event)}>
            <h1 className={style.creationTitle}>Créer un compte</h1>

            {/* Pseudo */}
            <div className={style.inputContainer}>
                <label htmlFor="pseudo" className={style.inputLabel}>
                    Pseudo *
                </label>
                <input
                    type="text"
                    id="pseudo"
                    name="pseudo"
                    value={pseudo}
                    onChange={event => setPseudo(event.target.value)}
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
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    className={emailError && style.errorInput}
                    required
                />
                <label className={style.error}>{emailError}</label>
            </div>

            {/* Password */}
            <div className={style.inputContainer}>
                <label htmlFor="password" className={style.inputLabel}>
                    Mot de passe *
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    className={passwordError && style.errorInput}
                    required
                />
                <label className={style.error}>{passwordError}</label>
            </div>

            {/* Password verification */}
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
                <label className={style.error}>{verifyError}</label>
            </div>

            <button type="submit" className={style.orangeBtn} onClick={createAccount}>
                S'inscrire
            </button>
        </form>
    );
};

export default AccountCreation;
