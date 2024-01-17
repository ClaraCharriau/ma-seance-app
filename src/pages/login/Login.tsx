import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { logUser, checkUserExists } = useAuth();

  const login = async () => {
    if (await checkUserExists(email)) {
      await logUser(email, password);
      navigate("/");
    } else {
      window.confirm(
        "An account does not exist with this email address: " +
          email +
          ". Do you want to create a new account?"
      );
    }
  };

  return (
    <main>
      <h1>Login page</h1>

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
        <br />
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
        <br />
        <div className={"inputContainer"}>
          <input
            className={"inputButton"}
            type="button"
            onClick={login}
            value={"Log in"}
          />
        </div>
      </section>
    </main>
  );
};

export default Login;
