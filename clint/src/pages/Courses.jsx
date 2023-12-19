import React, { useEffect, useState } from "react";
import { useGlobalCourseContext, useGlobalTutorContext } from "../hooks";
import "./style/Tutors.css";
import { CoursesInf } from "../components";

function Courses() {
  const { tutors, isLoading, fetchTutors } = useGlobalTutorContext();

  const { course } = useGlobalCourseContext();

  const [filterCriteria, setFilterCriteria] = useState({
    gender: "",
    language: "",
    careers: "",
    averageRating: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
  };
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchTutors(filterCriteria);
  };

  useEffect(() =>{
    console.log("course = ", course);
    console.log("tutors = ", tutors);
  },[course, tutors])

  return (
    <div>
      {/* Filter Form */}
      <form className="filter-form">
        <label className="filter-label">
          Language:
          <input
            className="filter-input"
            type="text"
            name="language"
            value={filterCriteria.language}
            onChange={handleFilterChange}
          />
        </label>
        <label className="filter-label">
          Courses:
          <input
            className="filter-input"
            type="text"
            name="careers"
            value={filterCriteria.careers}
            onChange={handleFilterChange}
          />
        </label>
        <label className="filter-label">
          Min Rating (0-10):
          <input
            className="filter-input"
            type="number"
            name="averageRating"
            value={filterCriteria.averageRating}
            onChange={(e) => {
              // Ensure the rating is between 0 and 10
              const value = Math.min(Math.max(e.target.value, 0), 10);
              handleFilterChange({
                target: { name: "averageRating", value },
              });
            }}
          />
        </label>
        <button className="filter-button" onClick={handleFilterSubmit}>
          Apply Filters
        </button>
      </form>
      <CoursesInf tutors={tutors}/>
    </div>
  );
}

export default Courses;
