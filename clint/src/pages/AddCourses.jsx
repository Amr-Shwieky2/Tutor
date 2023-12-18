import React, { useEffect, useState } from "react";
import { useCourseForm, useGlobalCourseContext } from "../hooks";
import { useNavigate, useParams } from "react-router";
import { CoursesCard } from "../components";
import "./style/AddCourses.css";

function AddCourses() {
  const { tutorId } = useParams();
  const { course, loading, errors, handleChange, handleSubmit, forceRerender } = 
    useCourseForm(tutorId, null);

  const { currentCourse, fetchCourseByTutor } = useGlobalCourseContext();
  const [tempTutor, setTempTutor] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!tempTutor) {
      setTempTutor(tutorId);

      fetchCourseByTutor(tutorId);
    } else if (tempTutor !== tutorId) {
      setTempTutor(tutorId);
      fetchCourseByTutor(tutorId);
    }
  }, [tutorId, fetchCourseByTutor, currentCourse]);

  const handleNextSubmit = (e) => {
    e.preventDefault();
    navigate(`/tutor/${tutorId}`)
  };

  return (
    <div className="course-form-container">
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <CoursesCard currentCourse={currentCourse} />
          <form onSubmit={handleSubmit} className="add-course-form">
            <label htmlFor="tuition">Cost by hour:</label>
            <input
              type="number"
              name="tuition"
              id="tuition"
              value={course.tuition}
              onChange={handleChange}
              className="form-input"
            />

            {errors.tuition && <p className="error">{errors.tuition}</p>}
            <br />
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              value={course.title}
              onChange={handleChange}
              className="form-input"
            />
            {errors.title && <p className="error">{errors.title}</p>}
            <br />
            <label htmlFor="description">description: </label>
            <textarea
              name="description"
              id="description"
              value={course.description}
              onChange={handleChange}
              className="form-input"
            />
            {errors.description && <p className="error">{errors.description}</p>}
            <br />
            <button type="submit" className="submit-button" onClick={() => forceRerender()}>
              Add course
            </button>
          </form>
          <button type="submit" className="submit-button" onClick={handleNextSubmit}>
              next
            </button>
        </>
      )}
    </div>
  );
}

export default AddCourses;
