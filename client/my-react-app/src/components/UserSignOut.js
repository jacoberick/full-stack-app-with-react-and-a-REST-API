import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookie from "js-cookie";

// sign out
const UserSignOut = ({ setAuth }) => {
  const history = useHistory();
  useEffect(() => {
    // removes JWT token and Auth Cookie
    // sets Auth to null
    localStorage.removeItem("_token");
    Cookie.remove("auth");
    setAuth(null);
    history.push("/");
  });
  return null;
};

export default UserSignOut;
