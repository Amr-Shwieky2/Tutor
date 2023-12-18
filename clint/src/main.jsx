import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { TutorProvider } from "./context/TutorContext.jsx";
import { CourseProvider } from "./context/CourseContext.jsx";
import { ReviewProvider } from "./context/ReviewContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <UserProvider>
      <ReviewProvider>
        <CourseProvider>
          <AuthProvider>
            <TutorProvider>
              <App />
            </TutorProvider>
          </AuthProvider>
        </CourseProvider>
      </ReviewProvider>
    </UserProvider>
  
);
