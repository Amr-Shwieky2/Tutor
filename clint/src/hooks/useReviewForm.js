import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { reviewAPI } from "../api";
import { useGlobalReviewContext } from "./useGlobalReviewContext";

const useReviewForm = (tutorId , reviewId = "") => {
  const navigate = useNavigate();

  const [review, setReviews] = useState({
    title: "",
    text: "",
    rating: "",
  });
  const [errors, setErrors] = useState({
    title: null,
    text: null,
    rating: null,
  });
  const [loading, setLoading] = useState(false);

  const { currentReview, addNewReview, editReview } = useGlobalReviewContext();

  useEffect(() => {
    if (reviewId) {
      setLoading(true);
      const fetchReview = async () => {
        const reviewData = await reviewAPI.getReview(reviewId);
        setReviews(reviewData.data);
        setLoading(false);
      };

      fetchReview();
    }
  }, [reviewId]);

  const handleChange = (e) => {
    setReviews({
      ...review,
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

    if (!review.title || review.title.length < 3 || review.title.length > 100) {
      newErrors.title = "Please provide a title between 3 and 100 characters";
      isValid = false;
    }

    // Validation for 'text'
    if (!review.text || review.text.length < 2) {
      newErrors.text = "Please provide a text with at least 2 characters";
      isValid = false;
    }

    // Validation for 'rating'
    if (!review.rating || review.rating < 1 || review.rating > 10) {
      newErrors.rating = "Please provide a rating between 1 and 10";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      if (reviewId) {
        editReview(review);
        navigate(`/`);
      } else {
        const newReviewId = await addNewReview(review, tutorId);
        navigate(`/`);
      }
    }
  };

  return { review, loading, errors, handleChange, handleSubmit };
};

export default useReviewForm;
