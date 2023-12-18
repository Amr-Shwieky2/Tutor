import axios from "axios";

import { showToast } from "../utils";

const baseURL = "http://localhost:5000/api/v1";

// Create a new instance of the axios library with a base URL of '/api/v1'
const API = axios.create({ baseURL });

// Add a response interceptor that handles errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      showToast(
        "Network error: Please check your internet connection.",
        "error"
      );
      console.error("Network error: Please check your internet connection.");
      return Promise.reject(
        new Error("Network error: Please check your internet connection.")
      );
    }

    const { status, data, statusText } = error.response;

    let message = data?.error || statusText || "An error occurred";

    console.error(`${status} - ${message}`);

    return Promise.reject(error);
  }
);

// Set the authorization token in the headers
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// Auth API endpoints
export const authAPI = {
  // Register a new user
  register: (userData) => API.post("/auth/register", userData),
  // Login a user
  login: (email, password) => API.post("/auth/login", { email, password }),
  // Logout a user
  logout: () => API.get("/auth/logout"),
  // Get the current user
  getCurrentUser: () => API.get("/auth/me"),
  // forgot password
  forgotPassword: (email) => API.post("/auth/forgotpassword", email),
  // Reset Password
  ResetPassword: (userId, newPassword) =>
    API.post(`/auth/resetpassword/${userId}`, newPassword), //return here to chick
  // Update User Details
  UpdateUserDetails: (name, email) =>
    API.post("/auth/updatedetails", { name, email }),
  // Update Password
  UpdatePassword: (currentPassword, newPassword) =>
    API.post("/auth/updatepassword", { currentPassword, newPassword }),
};

// User API endpoints
export const userAPI = {
  // Get all Users
  getAllUsers: () => API.get("/users"),
  // Get a specific User
  getUser: (UserId) => API.get(`/users/${UserId}`),
  // Update a User
  updateUser: (User, UserId) => API.put(`/users/${UserId}`, User),
  // Add a User
  addUser: (User) => API.post("/users", User),
  // Delete a User
  deleteUser: (UserId) => API.delete(`/users/${UserId}`),
};

// tutor API endpoints
export const tutorAPI = {
  // Get all tutors
  getAllTutors: (queryParams) => {
    const url = queryParams ? `/tutors?${queryParams}` : "/tutors";
    return API.get(url);
  },
  //Get near tutor
  getNearTutor: (zipcode, distance) => API.get(`/tutors/radius/${zipcode}/${distance}`),
  // Get a specific tutor
  getTutor: (tutorId) => API.get(`/tutors/${tutorId}`),
  // Update a tutor
  updateTutor: (tutor, tutorId) => API.put(`/tutors/${tutorId}`, tutor),
  // Add a tutor
  addTutor: (tutor) => API.post("/tutors", tutor),
  // Delete a tutor
  deleteTutor: (tutorId) => API.delete(`/tutors/${tutorId}`),
  //Upload Photo tutor
  uploadPhoto: (tutorId) => API.put(`/tutors/${tutorId}/photo`),
};

// Course API endpoints
export const courseAPI = {
  // Get all Courses
  getAllCourses: () => API.get("/courses"),
  // Get Courses For Tutor
  getCourseByTutor: (tutorId) => API.get(`/tutors/${tutorId}/courses`),
  // Get a specific Course
  getCourse: (CourseId) => API.get(`/courses/${CourseId}`),
  // Update a Course
  updateCourse: (Course, CourseId) => API.put(`/courses/${CourseId}`, Course),
  // Add a Course
  addCourse: (Course, tutorId) =>
    API.post(`/tutors/${tutorId}/courses`, Course),
  // Delete a Course
  deleteCourse: (CourseId) => API.delete(`/courses/${CourseId}`),
};

// Review API endpoints
export const reviewAPI = {
  // Get all Reviews
  getAllReviews: () => API.get("/reviews"),
  // Get Reviews For Tutor
  getReviewByTutor: (tutorId) => API.get(`/tutors/${tutorId}/reviews`),
  // Get a specific Review
  getReview: (ReviewId) => API.get(`/reviews/${ReviewId}`),
  // Update a Review
  updateReview: (Review, ReviewId) => API.put(`/reviews/${ReviewId}`, Review),
  // Add a Review
  addReview: (Review, tutorId) =>
    API.post(`/tutors/${tutorId}/reviews`, Review),
  // Delete a Review
  deleteReview: (ReviewId) => API.delete(`/reviews/${ReviewId}`),
};
