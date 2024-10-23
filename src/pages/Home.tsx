import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import useLenguageContext from "../context/lenguageContext";
import useIsLogged from "../hooks/useIsLogged";
import "./home.css";
import ChangePassword from "../components/ChangePassword";
import { get } from "../api/fetcher";
import User from "../types/user";

const Home: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState({ name: "", surname: "", username: "" });
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState({ password: false, infor: false });
  const { lenguage } = useLenguageContext();
  useIsLogged();
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setUserId(JSON.parse(atob(userToken.split(".")[1])).id);
    }
    if (userId > 0) {
      get<User>(`users/${userId}`, userToken).then((result) => {
        if (!result.error && result.data) {
          setUser({
            name: result.data.name,
            surname: result.data.surname,
            username: result.data.username,
          });
          return;
        }
        setError(result.errorMessage);
      });
    }
  }, [userId]);

  useEffect(() => {
    if (error.length > 0) {
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  }, [error]);

  const logout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div>
      <Header />
      <h1 className="welcome">
        {lenguage ? `¡Bienvenido/a ${user.name}!` : `Welcome, ${user.name}!`}
      </h1>
      <div className="buttonsDiv">
        <button
          onClick={() => {
            logout();
          }}
        >
          {lenguage ? "Cerrar sesión" : "Logout"}
        </button>
        <button
          onClick={() => {
            setIsVisible({ infor: false, password: !isVisible.password });
          }}
        >
          {lenguage ? "Cambiar contraseña" : "Change password"}
        </button>
        <button
          onClick={() => {
            setIsVisible({ password: false, infor: !isVisible.infor });
          }}
        >
          {lenguage ? "Información" : "Information"}
        </button>
      </div>
      <div style={{ display: isVisible.password ? "initial" : "none" }}>
        <ChangePassword />
      </div>
      <div
        className="information"
        style={{ display: isVisible.infor ? "initial" : "none" }}
      >
        <p>
          {user.name} {user.surname}
        </p>
        <p>{user.username}</p>
      </div>
      {error.length > 0 && (
        <div className="errorComponent">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
