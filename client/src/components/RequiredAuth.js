import React, { useEffect } from "react";
import { useStateContext } from "../context";
import Cookies from "js-cookie";
const RequiredAuth = ({ children }) => {
  const { setToken, setRole } = useStateContext();
  useEffect(() => {
    setToken(Cookies.get("token"));
    setRole(Cookies.get("role") ? JSON.parse(Cookies.get("role")) : null);
  }, []);
  return <>{children}</>;
};

export default RequiredAuth;
