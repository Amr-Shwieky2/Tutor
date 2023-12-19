import { useEffect, useState } from "react";
import "./Review.css"; // Make sure to create and import the CSS file
import { useGlobalUserContext } from "../../hooks";

const Review = ({ currentReview, currentTutor }) => {
  // const { user, isLoading, fetchUser } = useGlobalUserContext();
  // const [tempTutor, setTempTutor] = useState("");
  const [visibleReviews, setVisibleReviews] = useState(1); // Initial number of reviews to display

  const handleShowMoreReviews = () => {
    // Increase the number of visible reviews by, for example, 3
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 3);
  };

  const [reviewSummary, setReviewSummary] = useState({
    totalRating: 0,
    totalReviews: 0,
    ratingDetails: {
      10: 0,
      9: 0,
      8: 0,
      7: 0,
      6: 0,
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    },
  });

  useEffect(() => {
    if (currentReview && currentReview.length > 0) {
      const newReviewSummary = {
        totalRating: currentTutor.averageRating,
        totalReviews: currentReview.length,
        ratingDetails: {
          10: 0,
          9: 0,
          8: 0,
          7: 0,
          6: 0,
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        },
      };

      currentReview.forEach((review) => {
        const rating = review.rating;
        newReviewSummary.ratingDetails[rating]++;
      });

      setReviewSummary(newReviewSummary);
    }
  }, [currentReview, currentTutor]);

  // useEffect(() => {
  //   if (!isLoading && currentReview && currentReview.length > 0) {
  //     currentReview.forEach(async (review) => {
  //       const reviewUser = review.user;

  //       if (reviewUser && tempTutor !== reviewUser) {
  //         setTempTutor(reviewUser);
  //         await fetchUser(reviewUser);
  //       }
  //     });
  //   }
  // }, [currentReview, isLoading, tempTutor]);

  const reviews = [
    {
      name: "Jaquon Hart",
      rating: 5,
      comment:
        "Very understanding, patient and will help you improve your English. I highly recommend this teacher.",
      date: "July 1, 2021",
    },
    // ... more reviews
  ];

  return (
    <div className="review-container">
      <h2>Review</h2>
      <div className="review-summary">
        <div className="average-rating">{reviewSummary.totalRating}</div>
        <div className="star-rating">
          {/* Render stars based on the rating */}
          {"★".repeat(reviewSummary.totalRating)}
        </div>
        <div className="total-reviews">{reviewSummary.totalReviews} Review</div>
        <div className="rating-bars">
          {Object.keys(reviewSummary.ratingDetails).map((stars) => (
            <div key={stars} className="rating-bar">
              <span>{stars} Stars</span>
              <div className="bar-container">
                <div
                  className="bar"
                  style={{
                    width: `${reviewSummary.ratingDetails[stars] * 20}%`,
                  }}
                ></div>
              </div>
              <span>({reviewSummary.ratingDetails[stars]})</span>
            </div>
          ))}
        </div>
      </div>

      {/* /////////////////////////////////////////////////////////////////// */}
      <div className="individual-reviews">
        {currentReview.slice(0, visibleReviews).map((review, index) => (
          <div key={index} className="individual-review">
            <div className="reviewer-name">{review.title}</div>
            <div className="reviewer-rating">{review.rating}</div>
            <div className="reviewer-rating">{"★".repeat(review.rating)}</div>
            <div className="reviewer-comment">{review.text}</div>
            <div className="review-date">Posted on {review.createdAt}</div>
          </div>
        ))}
      </div>
      {visibleReviews < currentReview.length && (
        <button className="load-more-reviews" onClick={handleShowMoreReviews}>
          Show more reviews
        </button>
      )}
    </div>
  );
};

export default Review;
