import { useParams } from "react-router";
import { TutorForm } from "../components";


function ManageTutor() {
  const { tutorId } = useParams();

  const details = {
    title: tutorId ? "Edit Tutor" : "Add Tutor",
    btnText: tutorId ? "Update" : "Add",
  };
  const { title, btnText } = details;

  return (
    <div className="single-column-container">
      
      <TutorForm tutorId={tutorId} btnText={btnText} />
    </div>
  );
}
export default ManageTutor;
