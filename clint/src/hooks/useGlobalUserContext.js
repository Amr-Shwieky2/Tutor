import { useContext } from "react";
import { UserContext } from './../context/UserContext';




export const useGlobalUserContext = () => {
  return useContext(UserContext);
};