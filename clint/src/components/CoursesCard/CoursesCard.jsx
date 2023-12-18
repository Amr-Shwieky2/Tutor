import React from "react";
import "./CoursesCard.css";

function CoursesCard({ currentCourse }) {
  return (
    <>
    <div className="Card-sec">
      <h1>Courses</h1>
      {currentCourse.map((course) => (
        <div className="CoursesCard">
          <div key={course._id} className="Course-item">
            <div className="Course-title">{course.title}</div>
            <div className="Course-description">{course.description}</div>
            <div>Price by hour:{" "}<span className="Course-price">{course.tuition}$</span></div>
          </div>
        </div>
      ))}
      </div>
    </>
  );
}

export default CoursesCard;
