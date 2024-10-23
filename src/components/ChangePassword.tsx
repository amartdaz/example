import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./changePassword.css";
import useLenguageContext from "../context/lenguageContext";
import { put } from "../api/fetcher";
import { LoginResponse } from "../types/loginResponse";
import InputPassword from "./inputs/InputPassword";

const ChangePassword: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<{ error: string; success: string }>({
    error: "",
    success: "",
  });

  const navigate = useNavigate();

  const { lenguage } = useLenguageContext();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log(password);
    event.preventDefault();

    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      const userId = JSON.parse(atob(userToken.split(".")[1])).id;
      put<LoginResponse>(`users/${userId}/update-password`, userToken, {
        password: password,
      }).then((result) => {
        if (!result.error && result.data) {
          setMessage({
            error: "",
            success: "Password was changed correctly",
          });
          setPassword("");
          setTimeout(() => {
            localStorage.removeItem("userToken");
            navigate("/login");
          }, 2000);
        } else {
          setMessage({ error: result.errorMessage, success: "" });
        }
      });
    }
  }

  return (
    <form
      className="passwordForm"
      onSubmit={(event) => {
        onSubmit(event);
      }}
    >
      <h2>{lenguage ? "Contraseña nueva" : "New password"}</h2>
      <div className="input_group">
        <label htmlFor="password">
          {lenguage ? "Contraseña:" : "Password:"}
        </label>
        <InputPassword password={password} setPassword={setPassword} />
      </div>
      <button className="submit_button" type="submit">
        {lenguage ? "Guardar" : "Save"}
      </button>
      {message.error && <p className="errorMessage">{message.error}</p>}
      {message.success && <p className="successMessage">{message.success}</p>}
    </form>
  );
};

export default ChangePassword;
