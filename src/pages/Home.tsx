import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import Head from "../components/head/Head";
import useLenguageContext from "../context/lenguageContext";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const {lenguage} = useLenguageContext();

  useEffect(() => {
    const userToken = localStorage.getItem("user");

    // Si no existe el token "user", redirigir a la segunda página
    if (!userToken) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
      <Head title="Home" />
      <Header />
      <p>{lenguage ? 'Esta es la página de inicio' : 'This is the home page.'}</p>
      <Link to="/login">
        <button>{lenguage ? 'Iniciar sesión' : 'Go to Login'}</button>
      </Link>
    </div>
  );
};

export default Home;
