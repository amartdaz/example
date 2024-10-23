import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useIsLogged() {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      navigate("/login");
    } else {
      const tokenPayload = JSON.parse(atob(userToken.split(".")[1]));
      if (Date.now() >= tokenPayload.exp * 1000) {
        localStorage.removeItem("userToken");
        navigate("/login");
      }
    }
  }, []);
}
