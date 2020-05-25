import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

const CreateCourse = ({ auth }) => {
  // set state for input fields
  const [course, setCourse] = useState({
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: ""
  });

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
        </div>
        <div className="bottom">
          <Form
            auth={auth}
            action="create"
            course={course}
            setCourse={setCourse}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
