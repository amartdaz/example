import React from "react";
import useLenguageContext from "../context/lenguageContext";
import "./header.css";

const Header: React.FC = () => {
  const { lenguage, change } = useLenguageContext();
  return (
    <header className="appHeader">
      <h1>{lenguage ? "Bienvenido a mi aplicación" : "Welcome to My App"}</h1>
      <button
        onClick={() => {
          change();
        }}
      >
        {lenguage ? "Inglés" : "Spanish"}
      </button>
    </header>
  );
};

export default Header;
