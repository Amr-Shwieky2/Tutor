import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';

const LanguageSelector = ({ selectedLanguages, onLanguageChange }) => {
  const allLanguages = [
    "English",
    "Mandarin Chinese",
    "Hindi",
    "Spanish",
    "French",
    "Standard Arabic",
    "Bengali",
    "Russian",
    "Portuguese",
    "Urdu",
    "Indonesian",
    "German",
    "Italian",
    "Japanese",
    "Swahili",
    "Telugu",
    "Turkish",
    "Marathi",
    "Tamil",
    "Vietnamese",
    "Korean",
    "Yoruba",
    "Malayalam",
    "Odia",
    "Czech",
    "Gujarati",
    "Hungarian",
    "Nepali",
    "Dutch",
    "Assamese",
    "Arabic",
    "Hebrew",
  ];

  const languageOptions = allLanguages.map((language) => ({
    label: language,
    value: language,
  }));

  const formik = useFormik({
    initialValues: {
      selectedLanguages: selectedLanguages,
    },
    validationSchema: Yup.object({
      selectedLanguages: Yup.array().min(1, 'Please select at least one language'),
    }),
    onSubmit: (values) => {
      // Handle form submission here
      console.log('Submitted values:', values);
      onLanguageChange(values.selectedLanguages); // Pass selected languages to the parent component
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="selectedLanguages">Select languages:</label>
        <Select
          id="selectedLanguages"
          name="selectedLanguages"
          isMulti
          options={languageOptions}
          value={formik.values.selectedLanguages}
          onChange={(selectedOptions) => {
            formik.setFieldValue('selectedLanguages', selectedOptions);
            formik.setFieldTouched('selectedLanguages', true);
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.selectedLanguages && formik.errors.selectedLanguages && (
          <div className="error">{formik.errors.selectedLanguages}</div>
        )}
      </div>
    </form>
  );
};

export default LanguageSelector;
