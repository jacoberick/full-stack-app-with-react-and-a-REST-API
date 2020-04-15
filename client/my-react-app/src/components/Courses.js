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
        <a href={`/courses/${c.id}`} className="courseModule">
          <h4 className="indexCourseLabel">Course</h4>
          <h3 className="courseTitle">{c.title}</h3>
        </a>
      </div>
    ));
  };

  const AddCourse = () => {
    return (
      <div className="grid-33">
        <Link to="/courses/create" className="courseModule addCourseModule">
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
