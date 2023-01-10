import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios';

function App() {
const [movieName, setMovieName] = useState("");
const [review, setReview] = useState("");

const submitReview = () => {
  Axios.post("http://localhost:3002/api/insertMovie", {
    movieName: movieName,
    movieReview: review,
  }).then(()=> {
    alert("successfull insert");
  });
};

  return (
    <div className="App">
      <h1>CRUD APLICATION</h1>

      <div className="form">
      <input type="text" name="movieName" onChange={(e)=> {
        setMovieName(e.target.value)
      }} />
      <input type="text" name="review" onChange={(e)=> {
        setReview(e.target.value)
      }} />
      <button onClick={submitReview}>Submit</button>
      </div>
    </div>
  );
}

export default App;
