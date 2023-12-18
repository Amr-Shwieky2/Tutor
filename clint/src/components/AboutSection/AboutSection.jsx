import React, { useState } from 'react';
import './AboutSection.css';

const AboutSection = ({ description }) => {
  const [isFullDescription, setIsFullDescription] = useState(false);

  const toggleDescription = () => {
    setIsFullDescription(!isFullDescription);
  };

  return (
    <div className="about-section">
      <h2>About Me</h2>
      <p>{isFullDescription ? description : `${description.slice(0, 100)}...`}</p>
      <a href="#!" className="read-more" onClick={toggleDescription}>
        {isFullDescription ? 'Read less' : 'Read more'}
      </a>
    </div>
  );
};

export default AboutSection;
