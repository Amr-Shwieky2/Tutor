import React, { createContext, useState, useEffect, useCallback } from "react";

import { reviewAPI } from '../api';

import { showToast } from '../utils';

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [review, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const response = await reviewAPI.getAllReviews();
      setReviews(response.data);
    } catch (err) {
      showToast(err.response?.data?.error || 'An error occurred', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReview = useCallback(async (ReviewId) => {
    setIsLoading(true);
    try {
      const response = await reviewAPI.getReview(ReviewId);
      setCurrentReview(response.data);
    } catch (err) {
      showToast(err.response?.data?.error || 'An error occurred', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchReviewByTutor = useCallback(async (tutorId) => {
    setIsLoading(true);
    try {
      const response = await reviewAPI.getReviewByTutor(tutorId);
      setCurrentReview(response.data.data);
    } catch (err) {
      showToast(err.response?.data?.error || 'An error occurred', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, []);

  const addNewReview = async (Review, tutorId) => {
    setIsLoading(true);
    try {
      const response = await reviewAPI.addReview(Review, tutorId);
      handleSuccess('review added successfully');
      return response.data.data.id;
    } catch (err) {
      showToast('An error occurred while adding the review', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const editReview = async (review) => {
    setIsLoading(true);
    try {
      await reviewAPI.updateReview(review, review.id);
      handleSuccess('Review updated successfully');
    } catch (err) {
      showToast('An error occurred while updating the review', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const removeReview = async (id) => {
    setIsLoading(true);
    try {
      await reviewAPI.deleteReview(id);
      handleSuccess('Review deleted successfully');
    } catch (err) {
      showToast('An error occurred while deleting the review', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccess = (message) => {
    fetchReviews();
    showToast(message);
  }  

  return (
    <ReviewContext.Provider
      value={{
        review,
        currentReview,
        isLoading,
        fetchReview,
        fetchReviewByTutor,
        addNewReview,
        editReview,
        removeReview,
      }}>
      {children}
    </ReviewContext.Provider>
  );
};