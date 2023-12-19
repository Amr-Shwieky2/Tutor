import React from "react";
import "./style.css";
import { useTutorForm } from "../../hooks";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

const TutorForm = ({ tutorId, btnText }) => {
  const {
    tutor,
    loading,
    errors,
    handleChange,
    handleSubmit,
  } = useTutorForm(tutorId);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="tutor-foSc">
      <form onSubmit={handleSubmit} className="tutor-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={tutor.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={tutor.description}
            onChange={handleChange}
            required
          />
          {errors.description && (
            <div className="error">{errors.description}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={tutor.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={tutor.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={tutor.address}
            onChange={handleChange}
            required
          />
          {errors.address && <div className="error">{errors.address}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={tutor.gender || ""}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <div className="error">{errors.gender}</div>}
        </div>

        {/* <LanguageSelector
          selectedLanguages={tutor.languages}
          onLanguageChange={(selectedLanguages) =>
            handleChange({
              target: { name: "languages", value: selectedLanguages },
            })
          }
        /> */}
        <div className="form-group">
          <label htmlFor="careers">What would you want to teach?:</label>
          <input
            type="text"
            id="languages"
            name="languages"
            value={tutor.languages.join(", ")}
            onChange={(e) => {
              const languages = e.target.value.split(", ");
              handleChange({ target: { name: "languages", value: languages } });
            }}
            required
          />
          {errors.languages && <div className="error">{errors.languages}</div>}
        </div>
        

        <div className="form-group">
          <label htmlFor="careers">What would you want to teach?:</label>
          <input
            type="text"
            id="careers"
            name="careers"
            value={tutor.careers.join(", ")}
            onChange={(e) => {
              const careers = e.target.value.split(", ");
              handleChange({ target: { name: "careers", value: careers } });
            }}
            required
          />
          {errors.careers && <div className="error">{errors.careers}</div>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TutorForm;
