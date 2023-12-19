import React, { useEffect, useState } from "react";
import { useGlobalTutorContext } from "../hooks";
import { TutorCard } from "../components";
import "./style/Tutors.css";

const Tutors = () => {
  const { tutors, isLoading, fetchTutors, fetchNearTutor } = useGlobalTutorContext();
 

  
  useEffect(() => {
    fetchTutors([]);
  }, []);

  const [nearTutorCriteria, setNearTutorCriteria] = useState({
    zipcode: "",
    distance: "",
  });
  const handleNearTutorChange = (e) => {
    const { name, value } = e.target;
    setNearTutorCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
  };

  

  const handleNearTutorSubmit = (e) => {
    e.preventDefault();
    fetchNearTutor(nearTutorCriteria.zipcode, nearTutorCriteria.distance);
  };

  
  

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <>
      <div className="Filter-section">
        {/* Near Tutor Form */}
        <form className="filter-form">
          <label className="filter-label">
            Zipcode:
            <input
              className="filter-input"
              type="text"
              name="zipcode"
              value={nearTutorCriteria.zipcode}
              onChange={handleNearTutorChange}
            />
          </label>
          <label className="filter-label">
            Distance (in miles):
            <input
              className="filter-input"
              type="number"
              name="distance"
              value={nearTutorCriteria.distance}
              onChange={handleNearTutorChange}
            />
          </label>
          <button className="filter-button" onClick={handleNearTutorSubmit}>
            Find Near Tutors
          </button>
        </form>
      </div>

      {/* Tutor Cards */}
      <div className="cards">
        {tutors.map((tutor, idx) => (
          <TutorCard key={tutor.id || idx} {...tutor} />
        ))}
      </div>
    </>
  );
};

export default Tutors;
