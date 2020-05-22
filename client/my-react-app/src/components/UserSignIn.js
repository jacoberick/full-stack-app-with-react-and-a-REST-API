import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
const axios = require("axios");

const SignIn = ({ setAuth }) => {
  const [newSignIn, setNewSignIn] = useState({
    emailAddress: "",
    password: "",
    error: ""
  });

  const history = useHistory();

  const signIn = async e => {
    e.preventDefault();
    const username = newSignIn.emailAddress;
    const password = newSignIn.password;

    try {
      let response = await axios.get("http://localhost:5000/api/users", {
        auth: { username, password }
      });

      let auth = { ...response.data };
      auth.isAuthenticated = true;
      Cookies.set("auth", JSON.stringify(auth));

      localStorage.setItem("_token", auth._token);

      setAuth(auth);
      console.log(auth);
      history.push("/");
    } catch (e) {
      setNewSignIn({ ...newSignIn, error: e });
    }
  };

  const AuthMessage = () =>
    newSignIn.error ? (
      <div className="error">
        <p>
          {newSignIn.error.response.status} —{" "}
          {newSignIn.error.response.statusText}{" "}
        </p>
      </div>
    ) : (
      false
    );

  return (
    <div className="page">
      <div className="container sm">
        <h1>Sign In</h1>
        <form onSubmit={e => signIn(e)}>
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
                className="button buttonSecondary w-100"
              >
                Cancel
              </button>
            </Link>
          </div>
          <AuthMessage></AuthMessage>
        </form>
        <p className="have--account">
          Don't have a user account? <Link to="/signup">Click here</Link> to
          sign up!
        </p>
      </div>
    </div>
  );
};

export default SignIn;
