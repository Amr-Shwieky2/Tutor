import { useContext } from "react";

import { CourseContext } from '../context/CourseContext';


export const useGlobalCourseContext = () => {
  return useContext(CourseContext);
};