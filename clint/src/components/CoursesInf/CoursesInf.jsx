import React from "react";
import "./CoursesInf.css";
import { Link } from "react-router-dom";

function CoursesInf({ tutors }) {
  return (
    <>
      <div className="Card-inf">
        {tutors.map((tutor) => (
          <div key={tutor._id}>
            {tutor.courses.map((course) => (
              <div key={course._id} className="CoursesCard-inf">
                <div key={course._id} className="Course-item-inf">
                  <Link to={`/tutor/${course.tutor.id}`}>
                    <h3 className="Course-title-inf">{course.title}</h3>
                  </Link>
                  <p className="Course-description-inf">{course.description}</p>
                  <p>
                    Price by hour:{" "}
                    <span className="Course-price">{course.tuition}$</span>
                  </p>
                  <p>{course.tutor.name}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default CoursesInf;
