import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

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

    if (password.length < 7) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères");
      return false;
    }

    return true;
  };

  return (
    <section>
      <h2>Créer un compte</h2>

      {/* Pseudo */}
      <div className={"inputContainer"}>
        <label>Pseudo</label>
        <input
          value={pseudo}
          placeholder="Votre pseudo"
          onChange={(ev) => setPseudo(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{pseudoError}</label>
      </div>

      {/* E-mail adress */}
      <div className={"inputContainer"}>
        <label>Adresse e-mail</label>
        <input
          value={email}
          placeholder="Votre email"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>

      {/* Password */}
      <div className={"inputContainer"}>
        <label>Mot de passe</label>
        <input
          value={password}
          placeholder="Votre mot de passe"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>

      {/* Password verification */}
      <div className={"inputContainer"}>
        <label>Mot de passe</label>
        <input
          value={passwordBis}
          placeholder="Votre mot de passe"
          onChange={(ev) => setPasswordBis(ev.target.value)}
          className={"inputBox"}
        />
      </div>

      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={createAccount}
          value={"create account"}
        />
      </div>
      <label className="errorLabel">{verifyError}</label>
      <button onClick={createAccount} type="submit">S'inscrire</button>
    </section>
  );
};

export default AccountCreation;
