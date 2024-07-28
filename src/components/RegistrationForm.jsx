import React, { useState } from "react";
import axios from "axios"; 
import "./registrationform.css"; 

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost/backend/register.php", {
        name,
        email,
        password,
      });
      console.log({response})


      if (response.data) {
        setMessage(response.data); 
      } else if (response.data) {
        setMessage(response.data); 
      }
    } catch (error) {
      console.error("Error registering:", error);
      setMessage("An error occurred during registration");
    }
  };

  return (
    <div className="registration-form-container">
      <h2 className="registration-form-header">Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="registration-form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>
        <div className="registration-form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="registration-form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="buttoncss">
          Register
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default RegistrationForm;
