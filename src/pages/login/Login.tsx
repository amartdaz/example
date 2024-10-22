import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputPassword from "../../components/inputs/InputPassword";
import "./login.css";
import { post } from "../../api/fetcher";
import { LoginResponse } from "../../types/loginResponse";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    post<LoginResponse>("auth/login", {
      username: formData.username,
      password: formData.password,
    }).then((result) => {
      console.log(result);
      if (!result.error && result.data) {
        localStorage.setItem("userToken", result.data.token);
        navigate("/");
      } else {
        setError(result.errorMessage);
      }
    });
  }

  return (
    <div className="loginContainer">
      <form
        className="loginForm"
        onSubmit={(event) => {
          onSubmit(event);
        }}
      >
        <h1>Acceso usuario</h1>
        <div className="input_group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            autoComplete="off"
            placeholder="Usuario"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>
        <div className="input_group">
          <label htmlFor="password">Contraseña:</label>
          <InputPassword
            password={formData.password}
            setPassword={(value) => {
              setFormData({ ...formData, password: value });
            }}
          />
        </div>
        <button className="submit_button" type="submit">
          Entrar
        </button>
        <Link to="/signin">
          <a href="/signin">Registrarse</a>
        </Link>
        {error && <p className="errorMessage">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
