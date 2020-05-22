import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Form from "./Form";

const axios = require("axios");

const UpdateCourse = ({ auth }) => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: ""
  });

  const { course_id } = useParams();
  const apiCourse = `http://localhost:5000/api/courses/${course_id}`;

  useEffect(() => {
    axios.get(apiCourse).then(res => {
      const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        User
      } = res.data;
      setCourse({ title, description, estimatedTime, materialsNeeded });
    });
  }, [apiCourse]);

  return (
    <div>
      <nav className="actionBar container md">
        <Link className="button buttonSecondary" to="/">
          Return to List
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
