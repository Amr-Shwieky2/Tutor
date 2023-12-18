import { useContext } from "react";

import { ReviewContext } from '../context/ReviewContext';


export const useGlobalReviewContext = () => {
  return useContext(ReviewContext);
};