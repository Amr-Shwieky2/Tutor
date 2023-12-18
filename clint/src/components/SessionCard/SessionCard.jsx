import "./SessionCard.css";
import tutorImage from "../../assets/tutor1.jpg";
import { useGlobalAuthContext } from "../../hooks";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SessionCard = ({ currentCourse, handleSubmit }) => {
  const { loading } = useGlobalAuthContext();
  

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  

  return (
    <div className="session-card">
      <img src={tutorImage} alt="Tutor" className="session-image" />

      {currentCourse.map((course) => (
        <div key={course._id} className="session-item">
          <div className="session-title">{course.title}</div>
          <div className="session-price">{course.tuition}</div>
        </div>
      ))}

      <button className="message-btn">Send Message</button>
      <button className="message-btn" onClick={handleSubmit}>Write Review</button>

    </div>
  );
};

export default SessionCard;
