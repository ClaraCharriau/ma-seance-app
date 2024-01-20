import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import style from "../../../pages/login/Login.module.css";

interface AccountCreationProps {
  onSignUpClick: () => void;
}

const AccountCreation = (props: AccountCreationProps) => {
  const { onSignUpClick } = props;
  const { createUserAccount, checkUserExists } = useAuth();

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordBis, setPasswordBis] = useState("");
  const [pseudoError, setPseudoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifyError, setVerifyError] = useState("");

  const createAccount = async () => {
    let userExists = await checkUserExists(email);
    if (!userExists) {
      if (isFormValid()) {
        await createUserAccount(pseudo, email, password);
        onSignUpClick();
      } else {
        setVerifyError("Une erreur s'est produite.");
      }
    } else {
      setVerifyError("Un compte existe déjà à cette adresse email.");
    }
  };

  const isFormValid = (): boolean => {
    setPseudoError("");
    setEmailError("");
    setPasswordError("");

    if ("" === pseudo) {
      setPseudoError("Choisissez un pseudo.");
      return false;
    }

    if ("" === email) {
      setEmailError("Entrez votre adresse email.");
      return false;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Merci d'entrer une adresse email valide.");
      return false;
    }

    if ("" === password) {
      setPasswordError("Entrez votre mot de passe");
      return false;
    }

    if (passwordBis !== password) {
      setPasswordError("Les mots de passe doivent être identiques.");
      return false;
    }

    if (password.length < 7) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères");
      return false;
    }

    return true;
  };

  return (
    <>
      <h1 className={style.creationTitle}>Créer un compte</h1>

      {/* Pseudo */}
      <div className={style.inputContainer}>
        <label className={style.inputLabel}>Pseudo *</label>
        <input value={pseudo} onChange={(ev) => setPseudo(ev.target.value)} />
        <label className={style.error}>{pseudoError}</label>
      </div>

      {/* E-mail adress */}
      <div className={style.inputContainer}>
        <label className={style.inputLabel}>Adresse e-mail *</label>
        <input value={email} onChange={(ev) => setEmail(ev.target.value)} />
        <label className={style.error}>{emailError}</label>
      </div>

      {/* Password */}
      <div className={style.inputContainer}>
        <label className={style.inputLabel}>Mot de passe *</label>
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <label className={style.error}>{passwordError}</label>
      </div>

      {/* Password verification */}
      <div className={style.inputContainer}>
        <label className={style.inputLabel}>Confirmez le mot de passe *</label>
        <input
          value={passwordBis}
          onChange={(ev) => setPasswordBis(ev.target.value)}
        />
        <label className={style.error}>{verifyError}</label>
      </div>

      <button className={style.orangeBtn} onClick={createAccount}>
        S'inscrire
      </button>
    </>
  );
};

export default AccountCreation;
