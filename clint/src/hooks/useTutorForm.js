import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { tutorAPI } from "../api";
import { useGlobalTutorContext } from "./useGlobalTutorContext";

const useTutorForm = (tutorId) => {
  const navigate = useNavigate();

  const [tutor, setTutor] = useState({
    name: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
    languages: [],
    careers: [],
    photo: "",
  });

  const [errors, setErrors] = useState({
    name: null,
    description: null,
    phone: null,
    email: null,
    address: null,
    gender: null,
    languages: null,
    careers: null,
    photo: null,
  });

  const [loading, setLoading] = useState(false);

  const { currentTutor, addNewTutor, editTutor, uploadTutorPhoto } = useGlobalTutorContext();

  useEffect(() => {
    if (tutorId) {
      setLoading(true);

      const fetchTutor = async () => {
        try {
          const tutorData = await tutorAPI.getTutor(tutorId);
          setTutor(tutorData.data.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching tutor:", error);
          setLoading(false);
        }
      };

      fetchTutor();
    }
  }, [tutorId]);

  const handleChange = (e) => {
    setTutor({
      ...tutor,
      [e.target.name]: e.target.value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: null,
    }));
  };

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleFileChange = (e) => {
    // Handle file upload logic here
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedPhoto(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedPhoto(null);
  };
  const handleSubmitPhoto = async (e) => {
    e.preventDefault();

    const tutorData = await tutorAPI.getTutor(tutorId);
    const temp = await uploadTutorPhoto(tutor)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = {};
    

    // Validation for 'name'
    if (tutor.name.trim() === "") {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Validation for 'description'
    if (tutor.description.trim() === "") {
      newErrors.description = "Description is required";
      isValid = false;
    }

    // Validation for 'phone'
    if (tutor.phone.trim() !== "" && !/^\d{10}$/.test(tutor.phone)) {
      newErrors.phone = "Invalid phone number";
      isValid = false;
    }

    // Validation for 'email'
    if (tutor.email.trim() !== "" && !/^\S+@\S+\.\S+$/.test(tutor.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    // Validation for 'address'
    if (tutor.address.trim() === "") {
      newErrors.address = "Address is required";
      isValid = false;
    }

    // Validation for 'languages'
    if (!tutor.languages || tutor.languages.length === 0) {
      newErrors.languages = "At least one language is required";
      isValid = false;
    }

    // Validation for 'careers'
    if (!tutor.careers || tutor.careers.length === 0) {
      newErrors.careers = "At least one career is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        setLoading(true);

        if (tutorId) {
          // Update existing tutor
          editTutor(tutor);
          navigate(`/tutor/${tutorId}`);
        } else {
          // Add a new tutor
          const newTutorId = await addNewTutor(tutor);
          navigate(`/tutor/${newTutorId}/addCourses`);
        }
      } catch (error) {
        console.error("Error submitting tutor:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
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
  };
};

export default useTutorForm;
