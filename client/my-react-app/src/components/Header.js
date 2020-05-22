import React from "react";
import { Link } from "react-router-dom";
import UserSignOut from "./UserSignOut";

const Header = ({ auth, setAuth }) => {
  const Greeting = () => {
    if (auth) {
      return (
        <div id="rightSideNav">
          <p id="greeting">Hi {auth.name}!</p>
          <UserSignOut setAuth={setAuth} />
        </div>
      );
    }
    return (
      <nav>
        <Link className="signup" to="/signup">
          Sign Up
        </Link>
        <Link className="signin" to="/signin">
          Sign In
        </Link>
      </nav>
    );
  };

  return (
    <div className="header">
      <div className="header--content">
        <a href="/">
          <p className="header--logo">Courses</p>
        </a>
        <Greeting />
      </div>
    </div>
  );
};

export default Header;
