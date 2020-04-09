import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// modules
const axios = require("axios");

const SignIn = () => {
  const apiGetCourses = "http://localhost:5000/api/courses";
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(apiGetCourses).then(res => {
      setCourses(res.data);
    });
  }, []);

  const SignUpForm = () => {
    return (
      <div className="form">
        <div className="centered grid-33 signup">
          <h1>Sign In</h1>
          <div>
            <label for="email"></label>
            <input type="text" placeholder="Email" name="email" required />

            <label for="psw"></label>
            <input type="password" placeholder="Password" name="psw" required />

            <button className="button" type="submit">
              Sign In
            </button>
            <a href="/" className="button buttonSecondary">
              Cancel
            </a>
          </div>
          <p className="haveAccount">
            Don't have a user account? <Link to="/signin">Click here</Link> to
            sign up!
          </p>
        </div>
      </div>
    );
  };

  return <SignUpForm></SignUpForm>;
};

export default SignIn;
