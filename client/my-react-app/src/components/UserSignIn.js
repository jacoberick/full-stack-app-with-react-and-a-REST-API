import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

const SignIn = ({ setAuth }) => {
  const [newSignIn, setNewSignIn] = useState({
    emailAddress: "",
    password: "",
    errors: []
  });

  const signin = async (name, username) => {
    let response = await axios.get(
      "http://localhost:5000/api/users",
      {},
      { auth: { name, username } }
    );
  };

  return (
    <div className="page">
      <div className="container sm">
        <h1>Sign In</h1>
        <form>
          <input
            type="text"
            placeholder="Email"
            name="email"
            required
            onChange={e =>
              setNewSignIn({ ...newSignIn, emailAddress: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            name="psw"
            required
            onChange={e =>
              setNewSignIn({ ...newSignIn, password: e.target.value })
            }
          />
          <div className="form--actions">
            <button className="button" type="submit">
              Sign In
            </button>
            <Link to="/">
              <button
                type="button"
                name="cancel"
                className="button buttonSecondary"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
        <p className="haveAccount">
          Don't have a user account? <Link to="/signup">Click here</Link> to
          sign up!
        </p>
      </div>
    </div>
  );
};

export default SignIn;
