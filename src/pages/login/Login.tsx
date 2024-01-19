import { useState } from "react";
import style from "./Login.module.css";
import LoginForm from "../../component/login/login-form/LoginForm";
import AccountCreation from "../../component/login/account-creation/AccountCreation";

const Login = () => {
  const [formType, setFormType] = useState("initial");

  const setLoginForm = () => {
    setFormType("login");
  };

  const setAccountCreation = () => {
    setFormType("accountCreation");
  };

  const showInitialButtons = () => {
    setFormType("initial");
  };

  return (
    <main>
      {formType === "initial" && (
        <div>
          <h1>maSéance</h1>
          <p>Organisez votre agenda cinéma</p>
          <button onClick={setLoginForm}>Se connecter</button>
          <button onClick={setAccountCreation}>Créer un compte</button>
        </div>
      )}

      {formType === "login" && (
        <>
          <h1>maSéance</h1>
          <p>Organisez votre agenda cinéma</p>
          <LoginForm />
          <button onClick={showInitialButtons}>Retour</button>
        </>
      )}

      {formType === "accountCreation" && (
        <>
          <AccountCreation onSignUpClick={setLoginForm} />
          <button onClick={showInitialButtons}>Retour</button>
        </>
      )}
    </main>
  );
};

export default Login;
