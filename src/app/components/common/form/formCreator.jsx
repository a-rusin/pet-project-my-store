const FormCreator = ({
  formState,
  submitForm,
  handleChange,
  btnText,
  btnDisabled,
  error,
}) => {
  return (
    <form className="form-content" onSubmit={submitForm}>
      {formState.map((input) => (
        <div className="form-input-item" key={input.id}>
          <label htmlFor={input.name} className="form-input-label">
            {input.label}
          </label>

          {input.type === "text" ? (
            <input
              type={input.type}
              className="form-input-text"
              placeholder={input.placeholder}
              name={input.name}
              id={input.name}
              onChange={(e) => handleChange(input.name, e.target.value)}
              value={input.value}
            />
          ) : (
            <textarea
              className="form-input-text form-textarea"
              name={input.name}
              id={input.name}
              onChange={(e) => handleChange(input.name, e.target.value)}
              value={input.value}
              placeholder={input.placeholder}
            ></textarea>
          )}
        </div>
      ))}

      <p className="form-error-message">{error}</p>

      <button type="submit" className="form-input-btn" disabled={btnDisabled}>
        {btnDisabled ? "Ждите..." : btnText}
      </button>
    </form>
  );
};

export default FormCreator;
