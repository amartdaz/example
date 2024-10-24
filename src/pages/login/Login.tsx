import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputPassword from "../../components/inputs/InputPassword";
import "./login.css";
import { post } from "../../api/fetcher";
import { LoginResponse } from "../../types/loginResponse";
import useLenguageContext from "../../context/lenguageContext";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { lenguage, change } = useLenguageContext();

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
    <>
      <div className="buttonHeader">
        <button
          onClick={() => {
            change();
          }}
        >
          {lenguage ? "Inglés" : "Spanish"}
        </button>
      </div>
      <div className="loginContainer">
        <form
          className="loginForm"
          onSubmit={(event) => {
            onSubmit(event);
          }}
        >
          <h1>{lenguage ? "Acceso usuario" : "User access"}</h1>
          <div className="input_group">
            <label htmlFor="username">
              {lenguage ? "Usuario:" : "Username:"}
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              autoComplete="off"
              placeholder={lenguage ? "Usuario" : "Username"}
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="input_group">
            <label htmlFor="password">
              {lenguage ? "Contraseña:" : "Password:"}
            </label>
            <InputPassword
              password={formData.password}
              setPassword={(value) => {
                setFormData({ ...formData, password: value });
              }}
            />
          </div>
          <button className="submit_button" type="submit">
            {lenguage ? "Entrar" : "Login"}
          </button>
          <Link to="/signin">
            <a href="/signin">{lenguage ? "Registrarse" : "Signin"}</a>
          </Link>
          {error && <p className="errorMessage">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Login;
