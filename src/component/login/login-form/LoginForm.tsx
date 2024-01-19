import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const LoginForm = () => {
  const navigate = useNavigate();
  const { logUser, checkUserExists } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifyError, setVerifyError] = useState("");

  const login = async () => {
    setVerifyError("");
    const userExists = await checkUserExists(email);
    if (userExists) {
      if (isFormValid()) {
        await logUser(email, password);
        navigate("/");
      } else {
        return;
      }
    } else {
      setVerifyError(
        "Nous n'avons pas trouvé de compte relié à cette adresse mail."
      );
    }
  };

  const isFormValid = (): boolean => {
    setEmailError("");
    setPasswordError("");

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

    return true;
  };

  return (
    <section>
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
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="submit"
          onClick={login}
          value={"Log in"}
        />
      </div>
      <label className="errorLabel">{verifyError}</label>
    </section>
  );
};

export default LoginForm;
