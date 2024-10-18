import React, { useEffect } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import Head from "../components/head/Head";

const Home: React.FC = () => {
  const navigate = useNavigate();

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
      <p>This is the home page.</p>
      <Link to="/login">
        <button>Go to Login</button>
      </Link>
    </div>
  );
};

export default Home;
