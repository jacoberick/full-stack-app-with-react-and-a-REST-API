import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

// modules
const axios = require("axios");

const CourseDetail = ({ auth }) => {
  const { course_id } = useParams();
  const apiCourse = `http://localhost:5000/api/courses/${course_id}`;

  // setting state
  const [details, setCourseDetails] = useState({});
  const [user, setUser] = useState({});

  const history = useHistory();

  // on component mount
  useEffect(() => {
    //axios GET request to get selected course information
    axios.get(apiCourse).then(res => {
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
  }, [apiCourse]);

  // formats materials from the GET request
  const MaterialsNeeded = () => {
    let materials = details.materialsNeeded
      ? details.materialsNeeded.split("\n")
      : ["None"];

    return materials.map((m, idx) => <li key={idx}>{m}</li>);
  };

  // formats estimated time from the GET request
  const EstimatedTime = () => {
    let time = details.estimatedTime;
    let eta = time ? time : "No Estimated Time Available";
    return <p style={{ fontWeight: "bold" }}>{eta}</p>;
  };

  // course edit button
  const CourseEdit = () => {
    // if auth and user id matches course id,
    // return the course actions
    if (auth && user.id === auth.userId) {
      return (
        <div className="edit--form--actions">
          <Link className="button" to={`/courses/${course_id}/update`}>
            Update Course
          </Link>
          <button className="button" onClick={deleteCourse}>
            Delete Course
          </button>
        </div>
      );
    }
    return null;
  };

  // delete course button
  const deleteCourse = () => {
    //obtain selected course CourseList
    //delete it, and then push to /
    let confirm = window.confirm(
      "Are you sure you'd like to delete this course?"
    );
    if (confirm) {
      axios.delete(apiCourse).then(res => {
        if (res.status === 204) {
          history.push("/");
        } else {
          alert("Something went wrong.");
        }
      });
    }
  };

  // return course info
  const CourseInfo = () => {
    return (
      <div>
        <div className="action--bar">
          <div className="edit--form--actions">
            <CourseEdit />
            <Link className="button" to="/">
              Return to List
            </Link>
          </div>
        </div>
        <div className="container md" id="courseDetails">
          <div className="form--left">
            <h3 style={{ margin: "0" }}>Course</h3>
            <h1>{details.title}</h1>
            <p>
              By {user.firstName} {user.lastName}
            </p>
            <p className="course--description">{details.description}</p>
          </div>
          <div className="form--right">
            <div className="estimatedTime">
              <label>Estimated Time (Hours)</label>
              <EstimatedTime />
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
