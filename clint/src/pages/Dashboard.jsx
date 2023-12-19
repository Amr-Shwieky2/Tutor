import React from "react";
import { useParams } from "react-router";
import { useGlobalTutorContext, useTutorForm } from "../hooks";
import { TutorForm } from "../components";

function Dashboard() {
  const { tutorId } = useParams();
  const { currentTutor, fetchTutor } = useGlobalTutorContext();
  const {
    tutor,
    loading,
    errors,
    selectedPhoto,
    setSelectedPhoto,
    handleRemoveImage,
    handleChange,
    handleSubmit,
    handleSubmitPhoto,
    handleFileChange,
  } = useTutorForm(tutorId);

  return (
    <div>
      <h1>Tutor Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <dev>
          <div>
            <label htmlFor="photo">Photo:</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
            />
            {selectedPhoto && (
              <img
                src={selectedPhoto}
                alt="Selected Tutor Photo"
                className="selected-photo"
              />
            )}
            {errors.photo && <p className="error">{errors.photo}</p>}
            {selectedPhoto && (
              <button type="button" onClick={handleRemoveImage}>
                Remove Photo
              </button>
            )}
          </div>
          <button onClick={handleSubmitPhoto}>Save</button>

          
        </dev>
      )}
    </div>
  );
}

export default Dashboard;
