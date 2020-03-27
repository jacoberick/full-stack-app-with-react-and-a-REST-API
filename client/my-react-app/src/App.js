import React from "react";
import logo from "./logo.svg";
import "./App.css";
const axios = require("axios");

function App() {
  const api = "http://localhost:5000/api/courses";
  axios.get(api).then(res => {
    console.log(res);
  });
  return <div>l</div>;
}

export default App;
