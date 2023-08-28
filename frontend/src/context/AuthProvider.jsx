import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function AuthContextProvider(props) {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("tokens")
      ? jwt_decode(JSON.parse(localStorage.getItem("tokens")).access)
      : null
  );

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://127.0.0.1:8000/api/token/", {
      username: e.target.username.value,
      password: e.target.password.value,
    });
    if (response.status === 200) {
      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));
      localStorage.setItem("tokens", JSON.stringify(response.data));
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("tokens");
    navigate("/login");
  };

  const updateTokens = async () => {
    console.log("Updating tokens");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/refresh/",
        {
          refresh: authTokens?.refresh,
        }
      );

      if (response.status === 200) {
        setAuthTokens(response.data);
        setUser(jwt_decode(response.data.access));
        localStorage.setItem("tokens", JSON.stringify(response.data));
      } else {
        logoutUser();
      }
    } catch (e) {
      console.log(e);
    }

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      updateTokens();
    }

    let interval = setInterval(() => {
      if (authTokens) {
        updateTokens();
      }
    }, 1000 * 60 * 5);
    return () => {
      clearInterval(interval);
    };
  }, [authTokens, loading]);

  let contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Loading...</h1>
          </div>
        </div>
      ) : (
        props.children
      )}
    </AuthContext.Provider>
  );
}
