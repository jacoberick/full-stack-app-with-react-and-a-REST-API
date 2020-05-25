import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Form from "./Form";

const axios = require("axios");

const UpdateCourse = ({ auth }) => {
  // set state for update course
  const [course, setCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: ""
  });

  const { course_id } = useParams();
  const apiCourse = `http://localhost:5000/api/courses/${course_id}`;

  // on component mount
  useEffect(() => {
    // axios GET request for course
    axios.get(apiCourse).then(res => {
      const { title, description, estimatedTime, materialsNeeded } = res.data;
      setCourse({ title, description, estimatedTime, materialsNeeded });
    });
  }, [apiCourse]);

  return (
    <div>
      <nav className="actionBar container md">
        <Link className="button buttonSecondary" to={`/courses/${course_id}`}>
          Return to Course
        </Link>
      </nav>
      <div className="container md">
        <div className="top">
          <div className="top--heading">
            <h1>Update Course</h1>
          </div>
        </div>
        <div className="bottom">
          <Form
            auth={auth}
            action="update"
            course={course}
            setCourse={setCourse}
            courseId={course_id}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
