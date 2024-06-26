import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hook/auth-hook/useAuth';
import style from '../Login.module.css';

const LoginForm = () => {
    const navigate = useNavigate();
    const { logUser } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [verifyError, setVerifyError] = useState('');

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login();
    };

    const login = async () => {
        setVerifyError('');
        if (isFormValid()) {
            try {
                await logUser(email, password);
                navigate('/');
            } catch (error: any) {
                setVerifyError('Adresse email et/ou mot de passe incorrect(s).');
            }
        }
    };

    const isFormValid = (): boolean => {
        setEmailError('');
        setPasswordError('');

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

        return true;
    };

    return (
        <form className={style.loginForm} onSubmit={event => submitHandler(event)}>
            <div className={style.inputContainer}>
                <label htmlFor="email" className={style.inputLabel}>
                    Adresse e-mail
                </label>
                <input
                    name="email"
                    id="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    required
                />
                <label className={style.error}>{emailError}</label>
            </div>

            <div className={style.inputContainer}>
                <label htmlFor="password" className={style.inputLabel}>
                    Mot de passe
                </label>
                <input
                    name="password"
                    id="password"
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    required
                />
                <label className={style.error}>{passwordError}</label>
                <label className={style.error}>{verifyError}</label>
            </div>

            <button className={style.orangeBtn} onClick={login}>
                Connexion
            </button>
        </form>
    );
};

export default LoginForm;
