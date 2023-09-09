import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Import the CSS file
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuth } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const data = await axios.post(
        "https://ticket-booking-app-isui.onrender.com/auth/login",
        { email, password },
        config
      );
      localStorage.setItem("user", JSON.stringify(data.data));
      toast.success("Login Sucess");
      login();
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="login-main">
        <h1 className="Heading">Login</h1>
        <form onSubmit={handleSubmit} className="authForm">
          <label>
            Email:
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={handleEmailChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={handlePasswordChange}
            />
          </label>
          <button type="submit">Login</button>
          <Link to="/register">
            <button>If You are not Registered</button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
