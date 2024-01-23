import { useState } from 'react';
import style from './Login.module.css';
import LoginForm from '../../component/login/login-form/LoginForm';
import AccountCreation from '../../component/login/account-creation/AccountCreation';

const Login = () => {
    const [formType, setFormType] = useState('initial');

    const setLoginForm = () => {
        setFormType('login');
    };

    const setAccountCreation = () => {
        setFormType('accountCreation');
    };

    const showInitialButtons = () => {
        setFormType('initial');
    };

    return (
        <>
            {formType === 'initial' && (
                <main className={style.loginMain}>
                    <div className={style.loginLayout}>
                        <div>
                            <h1 className={style.headerTitle}>maSéance</h1>
                            <p className={style.headline}>Organisez votre agenda cinéma</p>
                        </div>
                        <section className={style.loginFormSection}>
                            <button onClick={setLoginForm} className={style.orangeBtn}>
                                Se connecter
                            </button>
                            <button onClick={setAccountCreation} className={style.transparentBtn}>
                                Créer un compte
                            </button>
                        </section>
                    </div>
                </main>
            )}

            {formType === 'login' && (
                <main className={style.loginMain}>
                    <div className={style.loginLayout}>
                        <div>
                            <h1 className={style.headerTitle}>maSéance</h1>
                            <p className={style.headline}>Organisez votre agenda cinéma</p>
                        </div>
                        <section className={style.loginFormSection}>
                            <LoginForm />
                            <button className={style.transparentBtn} onClick={showInitialButtons}>
                                Retour
                            </button>
                        </section>
                    </div>
                </main>
            )}

            {formType === 'accountCreation' && (
                <main className={style.loginMain}>
                    <section className={style.loginFormSection}>
                        <AccountCreation onSignUpClick={setLoginForm} />
                        <button className={style.transparentBtn} onClick={showInitialButtons}>
                            Retour
                        </button>
                    </section>
                </main>
            )}
        </>
    );
};

export default Login;
