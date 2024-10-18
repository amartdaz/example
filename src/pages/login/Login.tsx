import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputPassword from "../../components/inputs/InputPassword";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAddTokenAndRedirect = () => {
    // Añadir el token 'user' al localStorage
    localStorage.setItem("user", "some-token-value");

    // Redirigir a la página de inicio
    navigate("/");
  };

  function onSubmit() {
    console.log(username + ' ' + password)
  }

  return (
    <div>
      <h1>Hola que tal</h1>
      <form
        className={styles.loginForm}
        action={() => {
          onSubmit();
        }}
      >
        <h1>Acceso privado</h1>
        <div className={styles.input_group}>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            required
            name="username"
            id="username"
            autoComplete="off"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.input_group}>
          <label htmlFor="password">Contraseña:</label>
          <InputPassword password={password} setPassword={setPassword} />
        </div>
        <div>
          <input
            className={styles.checkbox}
            type="checkbox"
            id="saveToken"
            name="saveToken"
            onChange={() => setCheckox((prev) => !prev)}
            checked={checkbox}
          />
          <label htmlFor="saveToken">Recordar usuario</label>
        </div>
        <Button title="Acceder" className="Full" type="submit" />
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
      <button onClick={handleAddTokenAndRedirect}>
        Añadir token y volver a Home
      </button>
    </div>
  );
};

export default Login;
