import { useState } from "react";
import { useNavigate } from "react-router";
import { useGlobalAuthContext } from ".";

const useAuthForm = (isRegister) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    role: null,
  });

  const { login, register } = useGlobalAuthContext();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let isValid = true;
  
    const newErrors = {};
  
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
    if (isRegister) {
      if (formData.name.length < 3) {
        newErrors.name = "Name must be at least 3 characters long";
        isValid = false;
      }
      // Use proper conditions to check the role
      if (formData.role !== "user" && formData.role !== "publisher") {
        newErrors.role = "Please enter a valid role";
        isValid = false;
      }
    }
  
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
  
    if (formData.password.length < 6) {
      newErrors.password = "password must be at least 6 characters long";
      isValid = false;
    }
  
    setErrors(newErrors);
  
    if (isValid) {
      if (isRegister) {
        register(formData);
        
        if(formData.role === "publisher"){
          console.log("from in side",formData.role);
          navigate("/add"); 
        }
      } else {
        login(formData.email, formData.password);
      }
      
      navigate("/");
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useAuthForm;
