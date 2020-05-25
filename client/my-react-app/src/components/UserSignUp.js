import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
const axios = require("axios");

const SignUp = ({ setAuth }) => {
  // sets state for errors
  const [errors, setErrors] = useState([]);

  // sets new user input state
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

    // if passwords match, POST new user
    if (passwordsMatch) {
      axios
        .post("http://localhost:5000/api/users", newUser)
        .then(res => {
          let auth = { ...res.data };
          auth.isAuthenticated = true;
          Cookies.set("auth", JSON.stringify(auth));
          localStorage.setItem("_token", auth._token);
          setAuth(auth);
          history.push("/");
        })
        .catch(e => {
          const { errors } = e.response.data;
          setErrors(errors);
        });
    } else if (!passwordsMatch) {
      alert("passwords do not match");
    } else {
      alert("failed to create user, try again");
    }
  };

  // validation error component
  const ValidationErrors = () => {
    if (errors.length) {
      let list = errors.map((e, i) => <li key={i}>{e}</li>);

      return (
        <div className="top--validation">
          <h2 className="primary">Validation Errors</h2>
          <ul>{list}</ul>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="page">
      <div className="container sm">
        <h1>Sign Up</h1>
        <ValidationErrors />
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            name="FirstName"
            onChange={e =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
            value={newUser.firstName}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={e => setNewUser({ ...newUser, lastName: e.target.value })}
            value={newUser.lastName}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={e =>
              setNewUser({ ...newUser, emailAddress: e.target.value })
            }
            value={newUser.emailAddress}
          />

          <input
            type="password"
            placeholder="Password"
            name="psw"
            onChange={e => setNewUser({ ...newUser, password: e.target.value })}
            value={newUser.password}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="psw-repeat"
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
