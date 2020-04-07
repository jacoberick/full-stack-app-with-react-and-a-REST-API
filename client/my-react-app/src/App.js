import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import SignUp from "./components/UserSignUp";
import SignIn from "./components/UserSignIn";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route exact path="/courses/:id" component={CourseDetail} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
      </Switch>
    </Router>
  );
}

export default App;
