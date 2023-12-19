import React, { createContext, useState, useEffect, useCallback } from "react";

import { courseAPI } from '../api';

import { showToast } from '../utils';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [course, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await courseAPI.getAllCourses();
      setCourses(response.data.data);
    } catch (err) {
      showToast(err.response?.data?.error || 'An error occurred', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourse = useCallback(async (courseId) => {
    setIsLoading(true);
    try {
      const response = await courseAPI.getCourse(courseId);
      setCurrentCourse(response.data);
    } catch (err) {
      showToast(err.response?.data?.error || 'An error occurred', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCourseByTutor = useCallback(async (tutorId) => {
    setIsLoading(true);
    try {
      const response = await courseAPI.getCourseByTutor(tutorId);
      
      setCurrentCourse(response.data.data);
      
    } catch (err) {
      showToast(err.response?.data?.error || 'An error occurred', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchCourses();
  }, []);

  const addNewCourse = async (Course, tutorId) => {
    setIsLoading(true);
    try {
      const response = await courseAPI.addCourse(Course, tutorId);
      handleSuccess('course added successfully');
      return response.data.id;
    } catch (err) {
      showToast('An error occurred while adding the course', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const editCourse = async (course) => {
    setIsLoading(true);
    try {
      await courseAPI.updateCourse(course, course.id);
      handleSuccess('Course updated successfully');
    } catch (err) {
      showToast('An error occurred while updating the course', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const removeCourse = async (id) => {
    setIsLoading(true);
    try {
      await courseAPI.deleteCourse(id);
      handleSuccess('Course deleted successfully');
    } catch (err) {
      showToast('An error occurred while deleting the course', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = (message) => {
    fetchCourses();
    showToast(message);
  }  

  return (
    <CourseContext.Provider
      value={{
        course,
        currentCourse,
        isLoading,
        fetchCourse,
        fetchCourseByTutor,
        addNewCourse,
        editCourse,
        removeCourse,
      }}>
      {children}
    </CourseContext.Provider>
  );
};