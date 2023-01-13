import React, { useState } from "react";
import Axios from 'axios';
import Logo from "../../assets/logo/black-logo.png"
import "./Login.css";

function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongLogin, setWrongLogin] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
     Axios.post('http://localhost:3002/api/Login', {
      email: email,
      password: password,
    }).then((response) => {
      if(response.data.message)
        setWrongLogin(response.data.message);
      else
        window.location.href = "/BookingList?u="+response.data[0].idUser;
    });
  };


  const renderForm = (
    <div className="form">
      <p className="center"><a href="/Register">Don't have an account? Click here</a></p>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="email" name="email" onChange={(e)=> { setEmail(e.target.value) }} required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" onChange={(e)=> { setPassword(e.target.value) }} required />
        </div>
        <div className="button-container">
          <button type="submit">Login</button>
        </div>
        <div className="recoverPassword">
          <p className="center"><a href="/RecoverPassword">Forgot your password?</a></p>
        </div>
      </form>
    </div>
  );

  return (
    <div className="Login">
      <div className="login-form">
        <div className="center">
          <img className="logoForm" src={Logo} alt="Logo"/>
        </div>
        {isSubmitted ? window.history.pushState("", "", "/Dashboard") : renderForm}
        <p className="center">{(wrongLogin)}</p>
      </div>
    </div>
  );
}

export default Login;