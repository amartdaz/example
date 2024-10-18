import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputPassword from "../../components/inputs/InputPassword";
import './signin.css';

const SignIn: React.FC = () => {
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
    <div className='loginContainer'>
      <form
        className='loginForm'
        // action={() => {onSubmit();}}
      >
        <h1>Usuario nuevo</h1>
        <div className='input_group'>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="off"
            placeholder="Nombre"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='input_group'>
          <label htmlFor="surname">Apellidos:</label>
          <input
            type="text"
            name="surname"
            id="surname"
            autoComplete="off"
            placeholder="Apellidos"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='input_group'>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='input_group'>
          <label htmlFor="password">Contraseña:</label>
          <InputPassword password={password} setPassword={setPassword} />
        </div>
        <button className='submit_button' type='submit'>
        Entrar
        </button>
        {/* {error && <p className='errorMessage'>{error}</p>} */}
      </form>
    </div>
  );
};

export default SignIn;