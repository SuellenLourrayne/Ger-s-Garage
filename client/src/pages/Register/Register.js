import React, { useState } from 'react';
import './Register.css';
import Axios from 'axios';
import Logo from "../../assets/logo/black-logo.png"

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    Axios.post('http://localhost:3002/api/Register', {
      username: username,
      email: email,
      phone: phone,
      password: password,
    }).then(alert("Register Done! Proceed to Login."), window.history.pushState("", "", "/Login") );
  };

  return (
    <div className="Register">
      <div className="register-form">
        <div className="center">
          <img className="logoForm" src={Logo} alt="Logo"/>
        </div>
        <form className="formRegister" onSubmit={handleSubmit}>
        <p className="center"><a href="/Login">Already have an account? Login</a></p>
          <label htmlFor="username">Full Name:</label>
          <input type="text" name="username" onChange={(e)=> { setUsername(e.target.value) }} />
          <br />
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" onChange={(e)=> { setEmail(e.target.value) }} />
          <br />
          <label htmlFor="email">Phone:</label>
          <input type="text" name="phone" onChange={(e)=> { setPhone(e.target.value) }} />
          <br />
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" onChange={(e)=> { setPassword(e.target.value) }} />
          <br />
          <div className="button-container">
          <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
