import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// modules
const axios = require("axios");

const CourseDetail = props => {
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
      <div>
        <div className="actionBar">
          <div className="edit--form--actions">
            <Link className="button" to={`/courses/id/update`}>
              Update Course
            </Link>
            <button className="button">Delete Course</button>
            <Link className="button buttonSecondaryCourseEdit" to="/">
              Return to List
            </Link>
          </div>
        </div>
        <div className="container md createCourseForm">
          <div className="form--left">
            <h3 style={{ margin: "0" }}>Course</h3>
            <h1>{details.title}</h1>
            <p>
              By {user.firstName} {user.lastName}
            </p>
            <p className="courseDescription">{details.description}</p>
          </div>
          <div className="form--right">
            <div className="estimatedTime">
              <label>Estimated Time</label>
              <p style={{ fontWeight: "bold" }}>{details.estimatedTime}</p>
            </div>
            <div className="materialsNeeded">
              <label>Materials Needed</label>
              <MaterialsNeeded />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <CourseInfo></CourseInfo>;
};

export default CourseDetail;
