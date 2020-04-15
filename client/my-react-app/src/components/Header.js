import React from "react";
import { Link } from "react-router-dom";

const Header = ({ auth }) => {
  const Greeting = () => {
    if (auth.name) {
      return <p>Hi {auth.name}</p>;
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
      <div className="headerContent">
        <a href="/">
          <p className="headerLogo">Courses</p>
        </a>
        <Greeting />
      </div>
    </div>
  );
};

export default Header;
