import "./TutorProfile.css"; // Make sure to create and import the CSS file
import tutorImage from "../../assets/tutor1.jpg";
import { useGlobalAuthContext } from "../../hooks";
import { useEffect } from "react";
import AboutSection from "../AboutSection/AboutSection";

const TutorProfile = ({
  id,
  name,
  location,
  gender,
  languages,
  description,
  careers,
  photo,
  email,
  averageRating,
  averageCost,
}) => {
  // const { loading } = useGlobalAuthContext();

  // if (!photo || loading) {
  //   return <div className="loading">Loading...</div>;
  // }

  return (
    <>
      <div className="tutor-profile-card">
        <img className="tutor-image" src={tutorImage} alt={name} />
        <div className="tutor-info">
          <div className="status">
            <h2 className="tutor-name">{name}</h2>
            <p className="tutor-status">{gender}</p>
          </div>

          <p className="tutor-rating">Rating: {averageRating}</p>
          <p className="tutor-from">
            {/* <b>From:</b> {location} */}
          </p>
          <p className="tutor-teach">
            {" "}
            <b> Teach: </b>
            {careers}
          </p>
          <p className="tutor-speak">
            {" "}
            <b>Also Speak: </b> {languages}
          </p>
          <p className="tutor-speak">
            {" "}
            <b>Email: </b> {email}
          </p>
          <div className="tutor-stats">
            <span>{averageCost} average Cost</span>
          </div>
        </div>
      </div>
      <div>
        <AboutSection description={description}/>
      </div>
    </>
  );
};

export default TutorProfile;
