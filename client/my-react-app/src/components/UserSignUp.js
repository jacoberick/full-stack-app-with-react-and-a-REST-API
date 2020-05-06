import React, { useState, useEffect, Component } from "react";
import { Link, useHistory } from "react-router-dom";
const axios = require("axios");

const SignUp = ({ setAuth }) => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: ""
  });

  const history = useHistory();

  const comparePasswords = () => {
    const { password, confirmPassword } = newUser;
    return password === confirmPassword ? true : false;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    let passwordsMatch = comparePasswords();

    let response;
    if (passwordsMatch) {
      response = await axios.post("http://localhost:5000/api/users", newUser);

      if (response.status === 201) {
        let name = `${newUser.firstName} ${newUser.lastName}`;
        let username = newUser.emailAddress;
        history.push("/");

        let auth = { ...response.data };
        auth.isAuthenticated = true;
        localStorage.setItem("_token", auth._token);

        setAuth(auth);
        history.push("/");
      }
    }
  };

  return (
    <div className="page">
      <div className="container sm">
        <h1>Sign Up</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="FirstName"
            required
            onChange={e =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
            value={newUser.firstName}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            required
            onChange={e => setNewUser({ ...newUser, lastName: e.target.value })}
            value={newUser.lastName}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            required
            onChange={e =>
              setNewUser({ ...newUser, emailAddress: e.target.value })
            }
            value={newUser.emailAddress}
          />

          <input
            type="password"
            placeholder="Password"
            name="psw"
            required
            onChange={e => setNewUser({ ...newUser, password: e.target.value })}
            value={newUser.password}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="psw-repeat"
            required
            onChange={e =>
              setNewUser({ ...newUser, confirmPassword: e.target.value })
            }
            value={newUser.confirmPassword}
          />
          <div className="form--actions">
            <button className="button" type="submit">
              Sign Up
            </button>
            <a href="/">
              <button
                type="button"
                name="cancel"
                className="button buttonSecondary w-100"
              >
                Cancel
              </button>
            </a>
          </div>
        </form>
        <p className="have--account">
          Already have a user account? <Link to="/signin">Click here</Link> to
          sign in!
        </p>
      </div>
    </div>
  );
};

export default SignUp;
