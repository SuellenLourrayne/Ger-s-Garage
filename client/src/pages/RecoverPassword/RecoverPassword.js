import React, { useState } from "react";
import Axios from 'axios';
import Logo from "../../assets/logo/black-logo.png"
import "./RecoverPassword.css";

function RecoverPassword() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongRecoverPassword, setWrongRecoverPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
     Axios.post('http://localhost:3002/api/RecoverPassword', {
      email: email,
      password: password,
    }).then((response) => {
      if(response.data.message)
        setWrongRecoverPassword(response.data.message);
      else
        window.location.href = "/BookingList?u="+response.data[0].idUser;
    });
  };


  const renderForm = (
    <div className="form">
      <p className="center"><a href="/Login">Already have an account? Click here</a></p>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="textarea" name="email" onChange={(e)=> { setPassword(e.target.value) }} required />
        </div>
        <div className="button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="RecoverPassword">
      <div className="recoverPassword-form">
        <div className="center">
          <a href="/"><img className="logoForm" src={Logo} alt="Logo" /></a> 
        </div>
        {isSubmitted ? window.history.pushState("", "", "/Dashboard") : renderForm}
        <p className="center">{(wrongRecoverPassword)}</p>
      </div>
    </div>
  );
}

export default RecoverPassword;