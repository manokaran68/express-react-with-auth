import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (token: any) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return {
    login: saveToken,
    token,
    logout: removeToken,
  };
}
