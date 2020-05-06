import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const axios = require("axios");

const CreateCourse = ({ auth }) => {
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: ""
  });

  // set up new state for errors
  const [errors, setErrors] = useState({
    errors: []
  });

  const createCourse = async e => {
    e.preventDefault();

    let response = axios.post("http://localhost:5000/api/courses", {
      ...newCourse,
      userId: auth.userId
    });
  };

  const ValidationErrors = () => (
    <div className="top--validation">
      <h2 className="primary">Validation Errors</h2>
      <ul></ul>
    </div>
  );

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
            <h1>Create Course</h1>
          </div>
          <ValidationErrors></ValidationErrors>
        </div>
        <div className="bottom">
          <form
            id="createCourseForm"
            className="form"
            onSubmit={e => createCourse(e)}
          >
            <div className="form--left">
              <label htmlFor="">Course</label>
              <input
                type="text"
                placeholder="Course title..."
                onChange={e =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
              />
              <p>By </p>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Course description..."
                onChange={e =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
              ></textarea>
            </div>
            <div className="form--right">
              <label htmlFor="">Estimated Time (Hours)</label>
              <input
                type="text"
                placeholder="Hours"
                onChange={e =>
                  setNewCourse({ ...newCourse, estimatedTime: e.target.value })
                }
              />
              <label htmlFor="">Materials Needed</label>
              <div>
                <p>Format as...</p>
                <ul>
                  <li>* item 1</li>
                  <li>* item 2</li>
                  <li>* item 3</li>
                </ul>
              </div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="List materials..."
                onChange={e =>
                  setNewCourse({
                    ...newCourse,
                    materialsNeeded: e.target.value
                  })
                }
              ></textarea>
            </div>
            <div className="form--submit w-100">
              <button
                className="button w-100"
                type="submit"
                style={{ marginTop: "2rem" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
