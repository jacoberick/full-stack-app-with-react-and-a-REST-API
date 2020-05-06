import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// modules
const axios = require("axios");

const Courses = () => {
  const apiGetCourses = "http://localhost:5000/api/courses";
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(apiGetCourses).then(res => {
      setCourses(res.data);
    });
  }, []);

  const CourseList = () => {
    return courses.map(c => (
      <div className="grid-33" key={c.id}>
        <Link to={`/courses/${c.id}`} className="course--module">
          <h4 className="index--course--label">Course</h4>
          <h3 className="course--title">{c.title}</h3>
        </Link>
      </div>
    ));
  };

  const AddCourse = () => {
    return (
      <div className="grid-33">
        <Link
          to="/courses/create"
          className="course--module add--course--module"
        >
          <h2>+Add Course</h2>
        </Link>
      </div>
    );
  };

  return (
    <div>
      <div className="courses">
        <CourseList></CourseList>
        <AddCourse></AddCourse>
      </div>
    </div>
  );
};

export default Courses;
