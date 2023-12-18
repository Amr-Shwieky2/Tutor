import { useState } from "react";

import { useAuthForm } from "../hooks";

import { Input } from "../components";

import "./style/Auth.css"
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const { formData, errors, handleChange, handleSubmit } =
    useAuthForm(isRegister);

  const navigate = useNavigate();  

  const fields = [
    {
      id: 1,
      name: "Name",
      inputName: "name",
      value: formData.name,
      type: "text",
      error: errors.name,
    },
    {
      id: 2,
      name: "Email",
      inputName: "email",
      value: formData.email,
      type: "text",
      error: errors.email,
    },
    {
      id: 3,
      name: "Password",
      inputName: "password",
      value: formData.password,
      type: "password",
      error: errors.password,
    },
  ];

  const mapFields = isRegister ? fields : fields.slice(1);

  return (
    <div className= {isRegister ? "background-Auth2" : "background-Auth"}>
      <section className="container-Auth">
        <h2>{isRegister ? "Register" : "Log In"}</h2>
        <form onSubmit={handleSubmit}>
          {mapFields.map((field) => (
            <Input key={field.id} {...field} handleChange={handleChange} />
          ))}
          {isRegister && (
            <div className="form-group">
              <label htmlFor="roleSelect">Select Role: </label>
              <select
                id="roleSelect"
                value={formData.role}
                onChange={(e) => handleChange(e)}
                name="role" 
              >
                <option value="">Select</option>
                <option value="user">Student</option>
                <option value="publisher">Tutor</option>
              </select>
              {errors.role && <p className="error-message">{errors.role}</p>}
            </div>
          )}

          <button className="auth-btn" type="submit">
            {isRegister ? "Register": "Log In"}
          </button>

          <p className="switch" onClick={() => setIsRegister(!isRegister)}>
            {isRegister
              ? "Already have an account? Log In"
              : "Don't have an account yet? Register"}
          </p>
        </form>
      </section>
    </div>
  );
};

export default Auth;
