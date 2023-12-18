import React from "react";
import { useParams } from "react-router";
import { useReviewForm } from "../hooks";
import "./style/AddReview.css";

function AddReview() {
  const { tutorId } = useParams(); 
  const { review, loading, errors, handleChange, handleSubmit } =
    useReviewForm(tutorId, null);

    return (
        <div className="review-form-container">
          {loading && <p>Loading...</p>}
          {!loading && (
            <form onSubmit={handleSubmit} className="add-review-form">
              <label htmlFor="rating">Rating:</label>
              <input
                type="range"
                name="rating"
                id="rating"
                min="0"
                max="10"
                value={review.rating}
                onChange={handleChange}
                className="form-input"
              />
              <p className="rating-display">{review.rating}</p>
      
              {errors.rating && <p className="error">{errors.rating}</p>}
              <br />
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                value={review.title}
                onChange={handleChange}
                className="form-input"
              />
              {errors.title && <p className="error">{errors.title}</p>}
              <br />
              <label htmlFor="text">description: </label>
              <textarea
                name="text"
                id="text"
                value={review.text}
                onChange={handleChange}
                className="form-input"
              />
      
              {errors.text && <p className="error">{errors.text}</p>}
              <br />
              <button type="submit" className="submit-button">Submit Review</button>
            </form>
          )}
        </div>
      );
      
}

export default AddReview;
