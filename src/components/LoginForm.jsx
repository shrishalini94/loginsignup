import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import "./loginform.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost/backend/login.php", { email, password });
      console.log(response.data);
      if (response.data) {
        setMessage(response.data);
        <Link to="/studentdetails">Signup</Link>
    
      } else if (response.data) {
        setMessage(response.data); 
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("An error occurred during login");
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-form-header">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="login-form-group">
          <label>Email</label>
          <input
            type="email" name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="login-form-group">
          <label>Password</label>
          <input
            type="password" name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-form-group button">
          Login
        </button>
      </form>
      <p className="login-form-switch">
        Not a user? <Link to="/registration">Signup</Link>
      </p>
      <p className="login-form-message"> {message}</p>
      {message === "Login successful" && <Link to="/studentdetails">Go to Student Details</Link>}
    </div>
  );
};

export default LoginForm;
