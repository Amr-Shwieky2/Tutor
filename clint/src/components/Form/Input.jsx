const Input = ({ name, inputName, value, type, handleChange, error }) => {
    return (
      <div className="form-group">
        <label htmlFor={inputName}>{name}</label>
        <input type={type} name={inputName} value={value} onChange={handleChange} />
        <div className="error-message">{error}</div>
      </div>
    );
  };
  
  export default Input;