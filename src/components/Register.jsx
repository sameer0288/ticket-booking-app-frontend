import React, { useState } from "react";
import axios from "axios";
import "./Register.css"; // Import your CSS file
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShowPassword] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!show);
  };
  const navigation = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const data = await axios.post(
        "https://ticket-booking-app-isui.onrender.com/auth/register",
        { name, email, password },
        config
      );
      toast.success("Registration is successful!");
      navigation("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="register-container">
      <h1 className="heading">Register</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <label className="form-label">
          Name:
          <input
            type="text"
            value={name}
            placeholder="Enter Name"
            onChange={handleNameChange}
          />
        </label>
        <label className="form-label">
          Email:
          <input
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={handleEmailChange}
          />
        </label>
        <label className="form-label">
          Password:
          <input
            type={show ? "text" : "password"}
            value={password}
            placeholder="*********"
            onChange={handlePasswordChange}
          />
        </label>
        <div className="buttons">
          <button type="button" onClick={toggleShowPassword}>
            {show ? "Hide" : "Show"}
          </button>
          <button type="submit" className="register-button">
            Register
          </button>
        </div>
        <Link to="/login" className="login-link">
          If you are already registered, click here to login.
        </Link>
      </form>
    </div>
  );
};

export default Register;
