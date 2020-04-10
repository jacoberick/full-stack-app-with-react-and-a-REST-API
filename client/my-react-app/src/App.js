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
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route exact path="/courses/:id" component={CourseDetail} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/createCourse" component={CreateCourse} />
      </Switch>
    </Router>
  );
}

export default App;
