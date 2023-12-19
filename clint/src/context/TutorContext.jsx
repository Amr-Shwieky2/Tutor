import React, { createContext, useState, useEffect, useCallback } from "react";

import { tutorAPI } from "../api";

import { showToast } from "../utils";

export const TutorContext = createContext();

export const TutorProvider = ({ children }) => {
  const [tutors, setTutors] = useState([]);
  const [currentTutor, setCurrentTutor] = useState({});
  
  const [isLoading, setIsLoading] = useState(true);

  const fetchTutors = async (filters = {}) => {
    setIsLoading(true);
    try {
      // Construct query parameters based on filters
      const queryParams = Object.keys(filters)
        .filter((key) => filters[key] !== "")
        .map((key) => {
          if (key === "averageRating") {
            // Special handling for averageRating
            const numericRating = parseFloat(filters[key]);
            if (!isNaN(numericRating)) {
              return `${key}[gte]=${numericRating}`;
            }
          } else {
            return `${key}=${encodeURIComponent(filters[key])}`;
          }
        })
        .filter(Boolean) // Remove falsy values (handles averageRating not being a number)
        .join("&");

      const response = await tutorAPI.getAllTutors(queryParams);
      setTutors(response.data.data);
    } catch (err) {
      showToast(err.response?.data?.error || "An error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNearTutor = useCallback(async (zipcode, distance) => {
    setIsLoading(true);
    try {
      const response = await tutorAPI.getNearTutor(zipcode, distance);
      setTutors(response.data.data);
    } catch (err) {
      showToast(err.response?.data?.error || "An error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTutor = useCallback(
    async (tutorId) => {
      setIsLoading(true);
      try {
        if(!currentTutor){
          const response = await tutorAPI.getTutor(tutorId);
          
          setCurrentTutor(response.data.data);
        }else if(tutorId !== currentTutor.id){
          const response = await tutorAPI.getTutor(tutorId);
          
          setCurrentTutor(response.data.data);
        }
        
      } catch (err) {
        showToast(err.response?.data?.error || "An error occurred", "error");
      } finally {
        setIsLoading(false);
      }
    },
    [currentTutor.id]
  );

  // useEffect(() => {
  //   fetchTutors([]);
  // }, []);

  const addNewTutor = async (tutor) => {
    setIsLoading(true);
    try {
      console.log(tutor);
      const response = await tutorAPI.addTutor(tutor);
      console.log(response);
      handleSuccess("tutor added successfully");
      fetchTutor(response.data.data.id);
      return response.data.data.id;
    } catch (err) {
      showToast("An error occurred while adding the tutor", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadTutorPhoto = async (tutor) => {
    setIsLoading(true);
    try {
      const response = await tutorAPI.uploadPhoto(tutor.id);
      handleSuccess("tutor add photo successfully");
    } catch {
      showToast("An error occurred while adding the tutor", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const editTutor = async (tutor) => {
    setIsLoading(true);
    try {
      await tutorAPI.updateTutor(tutor, tutor.id);
      handleSuccess("Tutor updated successfully");
    } catch (err) {
      showToast("An error occurred while updating the tutor", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const removeTutor = async (id) => {
    setIsLoading(true);
    try {
      await tutorAPI.deleteTutor(id);
      handleSuccess("Tutor deleted successfully");
    } catch (err) {
      showToast("An error occurred while deleting the tutor", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = (message) => {
    fetchTutors();
    showToast(message);
  };

  return (
    <TutorContext.Provider
      value={{
        tutors,
        currentTutor,
        isLoading,
        fetchTutor,
        fetchTutors,
        fetchNearTutor,
        addNewTutor,
        uploadTutorPhoto,
        editTutor,
        removeTutor,
      }}
    >
      {children}
    </TutorContext.Provider>
  );
};
