import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// modules
const axios = require("axios");

const CreateCourse = props => {
  const {
    match: { params }
  } = props;
  const apiGetCourseDetail = `http://localhost:5000/api/courses/${params.id}`;
  const [details, setCourseDetails] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(apiGetCourseDetail).then(res => {
      const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        User
      } = res.data;
      setCourseDetails({ title, description, estimatedTime, materialsNeeded });
      setUser(User);
    });
  }, []);

  const MaterialsNeeded = () => {
    let materials = details.materialsNeeded
      ? details.materialsNeeded.split("* ")
      : [];

    materials.length ? materials.shift() : materials.unshift("None");

    return materials.map((m, idx) => <li key={idx}>{m}</li>);
  };

  const CourseInfo = () => {
    return (
      <div className="CDPage">
        <div className="actionBar">
          <div className="ABContent"></div>
        </div>
        <div className="courseDetails">
          <div className="courseHeader">
            <h4 className="detailCourseLabel">Course</h4>
            <h1>Create a Course</h1>
            <p>
              By {user.firstName} {user.lastName}
            </p>
          </div>
          <div className="courseDescription">
            <p>{details.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return <CourseInfo></CourseInfo>;
};

export default CreateCourse;
