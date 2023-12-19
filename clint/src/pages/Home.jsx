import React from "react";
import "./style/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homepage-container">
      <div className="home-content">
        <p className="learn-from-home-text">
          <span className="learn-sub-0">Looking for your  <span className="perfect">perfect
            </span></span>
      
          <br />
          <span className="learn-sub-2"> Private Tutor </span>
        </p>
        <p className="lorem-ipsum-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id interdum
          dui mollis. Suspendisse nulla:
        </p>

        <button className="your-button">
          <Link to="Tutors"> See more </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;