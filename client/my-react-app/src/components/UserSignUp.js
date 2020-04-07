import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// modules
const axios = require("axios");

const Courses = () => {
  const apiGetCourses = "http://localhost:5000/api/courses";
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(apiGetCourses).then(res => {
      setCourses(res.data);
    });
  }, []);

  const SignUpForm = () => {
    return (
      <div className="bounds">
        <div className="centered grid-33 signup">
          <h1>Sign Up</h1>
          <div>
            <label for="firstName"></label>
            <input
              type="text"
              placeholder="First Name"
              name="FirstName"
              required
            />
            <label for="lastName"></label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              required
            />
            <label for="email"></label>
            <input type="text" placeholder="Email" name="email" required />

            <label for="psw"></label>
            <input type="password" placeholder="Password" name="psw" required />

            <label for="psw-repeat"></label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="psw-repeat"
              required
            />

            <button className="button" type="submit">
              Sign Up
            </button>
            <button className="button button-secondary">Cancel</button>
          </div>
          <p className="SignXText">
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  };

  return <SignUpForm></SignUpForm>;
};

export default Courses;
