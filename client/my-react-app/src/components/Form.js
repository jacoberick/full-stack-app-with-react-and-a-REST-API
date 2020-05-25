import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const axios = require("axios");

const Form = ({ auth, action, course, setCourse, courseId }) => {
  const history = useHistory();
  // set up new state for errors
  const [errors, setErrors] = useState([]);

  // create course form action
  const createCourse = async e => {
    e.preventDefault();

    // axios POST request
    axios
      .post("http://localhost:5000/api/courses", {
        ...course,
        userId: auth.userId
      })
      .then(() => {
        history.push("/");
      })
      .catch(e => {
        const { errors } = e.response.data;
        setErrors(errors);
      });
  };

  // update course form action
  const updateCourse = async e => {
    e.preventDefault();

    // axios POST request
    axios
      .put(`http://localhost:5000/api/courses/${courseId}`, {
        ...course,
        userId: auth.userId
      })
      .then(() => {
        history.push(`/courses/${courseId}`);
      })
      .catch(e => {
        const { errors } = e.response.data;
        setErrors(errors);
      });
  };

  // determine form action
  let formAction;
  if (action === "create") {
    formAction = createCourse;
  } else if (action === "update") {
    formAction = updateCourse;
  }

  // validation error component
  const ValidationErrors = () => {
    if (errors.length) {
      let list = errors.map((e, i) => <li key={i}>{e}</li>);

      return (
        <div className="top--validation">
          <h2 className="primary">Validation Errors</h2>
          <ul>{list}</ul>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="form--container">
      <ValidationErrors></ValidationErrors>
      <form
        id="createCourseForm"
        className="form"
        onSubmit={e => formAction(e)}
      >
        <div className="form--left">
          <label htmlFor="">Course</label>
          <input
            type="text"
            placeholder="Course title..."
            onChange={e => setCourse({ ...course, title: e.target.value })}
            value={course.title || ""}
          />
          <p>By </p>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Course description..."
            onChange={e =>
              setCourse({ ...course, description: e.target.value })
            }
            value={course.description || ""}
          ></textarea>
        </div>
        <div className="form--right">
          <label htmlFor="">Estimated Time (Hours)</label>
          <input
            type="text"
            placeholder="Hours"
            onChange={e =>
              setCourse({ ...course, estimatedTime: e.target.value })
            }
            value={course.estimatedTime || ""}
          />
          <label htmlFor="">Materials Needed</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="List materials..."
            onChange={e =>
              setCourse({
                ...course,
                materialsNeeded: e.target.value
              })
            }
            value={course.materialsNeeded || ""}
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
  );
};

export default Form;
