import React, { useState } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Cookie from "js-cookie";

// page imports
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import SignUp from "./components/UserSignUp";
import SignIn from "./components/UserSignIn";
import SignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";

// sets global authorization state
function App() {
  const [auth, setAuth] = useState(Cookie.getJSON("auth") || null);

  //show component if logged in
  //if not, redirect to signin page
  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  };

  return (
    <Router>
      <Header auth={auth} setAuth={setAuth} />
      <Switch>
        <Route exact path="/signin">
          <SignIn setAuth={setAuth} />
        </Route>
        <Route exact path="/signup">
          <SignUp setAuth={setAuth} />
        </Route>
        <Route exact path="/signout">
          <SignOut setAuth={setAuth} />
        </Route>
        <Route exact path="/">
          <Courses auth={auth} />
        </Route>
        <PrivateRoute exact path="/courses/create">
          <CreateCourse auth={auth} />
        </PrivateRoute>
        <Route exact path="/courses/:course_id">
          <CourseDetail auth={auth} />
        </Route>
        <PrivateRoute exact path="/courses/:course_id/update">
          <UpdateCourse auth={auth} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
