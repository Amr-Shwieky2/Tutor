import { Link } from "react-router-dom";
import { useGlobalAuthContext, useGlobalTutorContext } from "../../hooks";
import NavListItem from "./NavListItem";
import "./style.css";
import { useEffect } from "react";

const Navbar = () => {
  const { user, loading, logout } = useGlobalAuthContext();
  const { currentTutor, tutors, fetchTutors, fetchTutor } =
    useGlobalTutorContext();

  const navListItems = [
    {
      to: "/",
      text: "Home",
      condition: true,
    },
    {
      to: "/",
      text: "About",
      condition: true,
    },
    {
      to: "/",
      text: "Blog",
      condition: true,
    },
    {
      to: "/add",
      text: "Add Tutor",
      condition:
        user &&
        (user.role === "admin" || user.role === "publisher") &&
        Object.keys(currentTutor).length === 0,
    },
    {
      to: `/tutor/${currentTutor.id}/dashboard`,
      text: "dashboard",
      condition:
        user &&
        (user.role === "admin" || user.role === "publisher") &&
        Object.keys(currentTutor).length !== 0,
    },
  ];

  useEffect(() => {
    if (user && (user.role === "admin" || user.role === "publisher")) {
      if (!tutors.length) {
        fetchTutors([]);
      } else {
        // Find the tutor whose user field matches user._id
        const tempTutor = tutors.find((tutor) => tutor.user === user._id);

        if (tempTutor) {
          fetchTutor(tempTutor.id); // Fetch the tutor if found
        }
      }
    }
  }, [loading, user, fetchTutors]);

  return (
    <nav className="navbar">
      <Link to="/">
        <h1 className="logo">TutorHub</h1>
      </Link>
      <ul className="nav-links">
        {navListItems.map(
          (link) => link.condition && <NavListItem key={link.text} {...link} />
        )}
      </ul>
      <div className="log-in-and-out">
        {user && !loading ? (
          <>
            <div className="login-sec">
              <p className="user-name">{`Hello ${user.name}`}</p>
              <Link to="/" className="btn logout-btn" onClick={logout}>
                Log Out
              </Link>
            </div>
          </>
        ) : (
          <div className="login-sec">
            <Link to="/auth" className="login-btn">
              Log In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
