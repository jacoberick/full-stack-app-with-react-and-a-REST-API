import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import SignUp from "./components/UserSignUp";
import SignIn from "./components/UserSignIn";
import CreateCourse from "./components/CreateCourse";

function App() {
  const [auth, setAuth] = useState({
    name: "",
    username: ""
  });

  return (
    <Router>
      <Header auth={auth} />
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route exact path="/courses/create" component={CreateCourse} />
        <Route exact path="/courses/:id" component={CourseDetail} />
        <Route exact path="/signin">
          <SignIn setAuth={setAuth} />
        </Route>
        <Route exact path="/signup">
          <SignUp setAuth={setAuth} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
