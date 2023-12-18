import { useContext } from "react";

import { TutorContext } from '../context/TutorContext';


export const useGlobalTutorContext = () => {
  return useContext(TutorContext);
};


