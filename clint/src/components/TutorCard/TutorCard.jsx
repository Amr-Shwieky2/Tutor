import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalAuthContext } from '../../hooks';
import './TutorCard.css';
import staticImage from "../../assets/tutor1.jpg" 

// Static image for testing
// const staticImage = 'https://img.freepik.com/free-photo/portrait-female-teacher-white_114579-77743.jpg?size=626&ext=jpg&ga=GA1.2.1233141113.1701454930&semt=sph'; // Replace with your actual image path

const TutorCard = ({
  id,
  name,
  address,
  gender,
  languages,
  careers,
  averageRating,
  averageCost,
}) => {
  const { loading } = useGlobalAuthContext();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="card">
      <Link to={`/tutor/${id}`}>
        {/* Use static image for all cards */}
        <img className="tutor-imageC" src={staticImage} alt="tutor" />
      </Link>
      <div className="tutor-info">
        <div className="status">
          <h3 className="tutor-name">
            <Link to={`/tutor/${id}`}>{name}</Link>
          </h3>
          <p className="tutor-brand">{gender}</p>
        </div>

        <p className="tutor-rating">{averageRating}</p>
        <p className="tutor-from">{address}</p>

        <div>
          <b>Teach:</b>
          {careers.map((career, idx) => (
            <p key={idx} className="tutor-teach">
              {career}
            </p>
          ))}
        </div>

        <div>
          <b>Speak:</b>
          {languages.map((language, idx) => (
            <p key={idx} className="tutor-speak">
              {language}
            </p>
          ))}
        </div>
        <div className="tutor-stats">
          <span className="tutor-price">
            Average Cost by hour: {averageCost}$
          </span>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;