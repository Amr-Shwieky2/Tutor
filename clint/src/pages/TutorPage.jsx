import { useEffect, useState } from "react";
import {
  AboutSection,
  CoursesCard,
  Review,
  Schedule,
  SessionCard,
  TutorProfile,
} from "../components";
import {
  useGlobalCourseContext,
  useGlobalReviewContext,
  useGlobalTutorContext,
} from "../hooks";
import { useNavigate, useParams } from "react-router";

const TutorPage = () => {
  const { tutorId } = useParams();
  const { fetchTutor, currentTutor, isLoading } = useGlobalTutorContext();
  const { currentCourse, fetchCourseByTutor } = useGlobalCourseContext();
  const { currentReview, fetchReviewByTutor } = useGlobalReviewContext();
  const [tempTutor, setTempTutor] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !tempTutor) {
      setTempTutor(tutorId);
      fetchTutor(tutorId);
      fetchCourseByTutor(tutorId);
      fetchReviewByTutor(tutorId);
    } else if (tempTutor !== tutorId) {
      setTempTutor(tutorId);
      fetchTutor(tutorId);
      fetchCourseByTutor(tutorId);
      fetchReviewByTutor(tutorId);
    }
  }, [fetchTutor, isLoading, tutorId, fetchCourseByTutor, currentCourse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/tutor/${tutorId}/addReview`)
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <TutorProfile key={currentTutor.id} {...currentTutor} />
      <SessionCard currentCourse={currentCourse} handleSubmit={handleSubmit} />
      <CoursesCard currentCourse={currentCourse} />
      {/* <Schedule /> */}
      <Review currentReview={currentReview} currentTutor={currentTutor} />
    </>
  );
};

export default TutorPage;
