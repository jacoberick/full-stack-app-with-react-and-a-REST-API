import React from "react";
import { Link } from "react-router-dom";
import Cookie from "js-cookie";

const UserSignOut = ({ setAuth }) => {
  const signOut = () => {
    localStorage.removeItem("_token");
    Cookie.remove("auth");
    setAuth(null);
  };

  return (
    <Link id="signOut" to="/signin" onClick={signOut}>
      Sign Out
    </Link>
  );
};

export default UserSignOut;
