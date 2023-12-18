import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { courseAPI } from "../api";
import { useGlobalCourseContext } from "./useGlobalCourseContext";

const useCourseForm = (tutorId, courseId) => {
  const navigate = useNavigate();
  const [forceUpdate, setForceUpdate] = useState(false);

  const forceRerender = () => {
    setForceUpdate((prev) => !prev);
  };

  const [course, setCourses] = useState({
    title: "",
    description: "",
    tuition: "",
  });
  const [errors, setErrors] = useState({
    title: null,
    description: null,
    tuition: null,
  });
  const [loading, setLoading] = useState(false);

  const { currentCourse, addNewCourse, editCourse, fetchCourseByTutor } = useGlobalCourseContext();

  useEffect(() => {
    if (courseId) {
      setLoading(true);
      const fetchCourse = async () => {
        const courseData = await courseAPI.getCourse(courseId);
        setCourses(courseData.data);
        setLoading(false);
      };

      fetchCourse();
    }
  }, [courseId]);

  useEffect(() => {
    if (forceUpdate) {
      // Implement any logic you need to re-fetch data or perform other actions
      // For example, you might want to fetch updated data here
      fetchCourseByTutor(tutorId);
      setForceUpdate(false); // Reset the forceUpdate state after triggering the rerender
    }
  }, [forceUpdate, fetchCourseByTutor, tutorId]);

  const handleChange = (e) => {
    setCourses({
      ...course,
      [e.target.name]: e.target.value,
    });
    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {};
    console.log("yes added", course);

    if (!course.title || course.title.length < 3 || course.title.length > 100) {
      newErrors.title = "Please provide a title between 3 and 100 characters";
      isValid = false;
    }

    // Validation for 'description'
    if (!course.description || course.description.length < 2) {
      newErrors.description =
        "Please provide a description with at least 2 characters";
      isValid = false;
    }

    // Validation for 'tuition'
    if (!course.tuition || course.tuition < 1) {
      newErrors.tuition =
        "Please provide a tuition cost greater than or equal to 1";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      if (courseId) {
        // If editing an existing course
        editCourse(course);
        navigate(`/`);
      } else {
        // If adding a new course
        const newCourseId = await addNewCourse(course, tutorId);
        setCourses({
          title: "",
          description: "",
          tuition: "",
        })
        if (newCourseId) {
          // Only navigate if the course was successfully added
          navigate(`/`);
        }
      }
    }
  };

  return { course, loading, errors, handleChange, handleSubmit, forceRerender };

};

export default useCourseForm;
