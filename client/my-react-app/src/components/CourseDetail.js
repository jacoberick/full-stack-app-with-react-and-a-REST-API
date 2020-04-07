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
      <div id="courseDetails">
        <div id="actionBar">
          <div id="ABContent">
            <Link className="button" to={`/courses/id/update`}>
              Update Course
            </Link>
            <button className="button">Delete Course</button>
            <Link className="button buttonSecondary" to="/">
              Return to List
            </Link>
          </div>
        </div>
        <div id="courseDetails"></div>
      </div>
      // <div>
      //   <div>
      //     <div className="actions--bar">
      //       <div className="grid-100">
      //         <div>
      // <Link className="button" to={`/courses/id/update`}>
      //   Update Course
      // </Link>
      // <button className="button">Delete Course</button>
      // <Link className="button button-secondary" to="/">
      //   Return to List
      // </Link>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   <div className="course--detail">
      //     <div className=" grid-66">
      //       <div className="course--header">
      //         <h4 className="course--label">Course</h4>
      //         <h1>{details.title}</h1>
      //         <p>
      //           By {user.firstName} {user.lastName}
      //         </p>
      //       </div>
      //       <div className="course-description">
      //         <p>{details.description}</p>
      //       </div>
      //     </div>
      //     <aside className="grid-25 grid-right">
      //       <div className="course-stats">
      //         <div className="course--stats--list">
      //           <h4>Estimated Time</h4>
      //           <ul className="course--stats--list--eta">
      //             <li>{details.estimatedTime}</li>
      //           </ul>
      //           <h4>Materials Needed</h4>
      //           <ul
      //             className="course--stats--list--matNeed"
      //             style={{ listStyle: "circle", paddingLeft: "1rem" }}
      //           >
      //             <MaterialsNeeded></MaterialsNeeded>
      //           </ul>
      //         </div>
      //       </div>
      //     </aside>
      //   </div>
      // </div>
    );
  };

  return <CourseInfo></CourseInfo>;
};

export default CourseDetail;
