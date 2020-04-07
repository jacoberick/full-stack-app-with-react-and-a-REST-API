import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="headerContent">
        <a href="/">
          <p className="headerLogo">Courses</p>
        </a>
        <nav>
          <Link className="signup" to="/signup">
            Sign Up
          </Link>
          <Link className="signin" to="/signin">
            Sign In
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
