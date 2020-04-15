import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CreateCourse = () => {
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    hours: "",
    materials: ""
  });

  // set up new state for errors

  const ValidationErrors = () => (
    <div className="top--validation">
      <h2 className="primary">Validation Errors</h2>
      <ul></ul>
    </div>
  );

  return (
    <div>
      <div className="actionBar">
        <div className="edit--form--actions">
          <button className="button">Submit Course</button>
          <Link className="button buttonSecondaryCourseEdit" to="/">
            Return to List
          </Link>
        </div>
      </div>
      <div className="container md">
        <div className="top">
          <div className="top--heading">
            <h1>Create Course</h1>
          </div>
          <ValidationErrors></ValidationErrors>
        </div>
        <div className="bottom">
          <form className="form" action="" className="createCourseForm">
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
              <label htmlFor="">Estimated Time</label>
              <input
                type="text"
                placeholder="Hours"
                onChange={e =>
                  setNewCourse({ ...newCourse, hours: e.target.value })
                }
              />
              <label htmlFor="">Materials Needed</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="List materials..."
                onChange={e =>
                  setNewCourse({ ...newCourse, materials: e.target.value })
                }
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
