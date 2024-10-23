import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputPassword from "../../components/inputs/InputPassword";
import "./signin.css";
import { post } from "../../api/fetcher";
import User from "../../types/user";
import useLenguageContext from "../../context/lenguageContext";

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<{
    name: string;
    surname: string;
    username: string;
    password: string;
  }>({ name: "", surname: "", username: "", password: "" });
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const { lenguage, change } = useLenguageContext();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    post<User>("users", {
      name: formData.name,
      surname: formData.surname,
      username: formData.username,
      password: formData.password,
    }).then((result) => {
      console.log(result);
      if (result.error) {
        setError(result.errorMessage);
        return;
      }
      navigate("/login");
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
          <h1>{lenguage ? "Usuario nuevo" : "New user"}</h1>
          <div className="input_group">
            <label htmlFor="name">{lenguage ? "Nombre:" : "Name:"}</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              autoComplete="off"
              placeholder={lenguage ? "Nombre:" : "Name:"}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="input_group">
            <label htmlFor="surname">
              {lenguage ? "Apellidos:" : "Surname:"}
            </label>
            <input
              type="text"
              name="surname"
              id="surname"
              required
              autoComplete="off"
              placeholder={lenguage ? "Apellidos:" : "Surname:"}
              value={formData.surname}
              onChange={(e) =>
                setFormData({ ...formData, surname: e.target.value })
              }
            />
          </div>
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
              placeholder={lenguage ? "Usuario:" : "Username:"}
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
            {lenguage ? "Registrarse" : "Signin"}
          </button>
          {error && <p className="errorMessage">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default SignIn;
