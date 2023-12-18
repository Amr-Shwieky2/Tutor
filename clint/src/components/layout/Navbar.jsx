import { Link } from "react-router-dom";
import { useGlobalAuthContext, useGlobalTutorContext } from "../../hooks";
import NavListItem from "./NavListItem";
import "./style.css";
import { useEffect } from "react";

const Navbar = () => {
  const { user, loading, logout } = useGlobalAuthContext();
  const { currentTutor, addNewTutor, editTutor } = useGlobalTutorContext();

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
      condition: user && (user.role === "admin" || user.role === "publisher"),
    },
   
  ];


  return (
    <nav className="navbar">
      <Link to="/">
        <h1 className="logo">Tutor</h1>
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
