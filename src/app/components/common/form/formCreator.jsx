const FormCreator = ({ formState, submitForm, handleChange, btnText, btnDisabled, error, isSubmitBtnEnabled }) => {
  return (
    <form className="form-content" onSubmit={submitForm}>
      {formState.map((input) => (
        <div className="form-input-item" key={input.id}>
          <label htmlFor={input.name} className="form-input-label">
            {input.label}
          </label>

          {input.type === "input-text" && (
            <input
              type={input.type}
              className="form-input-text"
              placeholder={input.placeholder}
              name={input.name}
              id={input.name}
              onChange={(e) => handleChange(input.name, e.target.value)}
              value={input.value}
            />
          )}
          {input.type === "textarea" && (
            <textarea
              className="form-input-text form-textarea"
              name={input.name}
              id={input.name}
              onChange={(e) => handleChange(input.name, e.target.value)}
              value={input.value}
              placeholder={input.placeholder}
            ></textarea>
          )}
          {input.type === "select" && (
            <select
              name={input.name}
              id={input.name}
              className="form-input-text form-select"
              onChange={(e) => handleChange(input.name, e.target.value)}
              value={input.value}
              placeholder={input.placeholder}
            >
              {input.options.map((item) => (
                <option key={item._id} value={item.path}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
          {input.type === "date" && (
            <input
              type="date"
              id={input.name}
              name={input.name}
              onChange={(e) => handleChange(input.name, e.target.value)}
              value={input.value}
              min="1900-01-01"
              max={`${new Date().getFullYear()}-12-31`}
              className="form-input-text"
            />
          )}
        </div>
      ))}

      <p className="form-error-message">{error}</p>
      {isSubmitBtnEnabled && (
        <button type="submit" className="form-input-btn" disabled={btnDisabled}>
          {btnDisabled ? "Ждите..." : btnText}
        </button>
      )}
    </form>
  );
};

FormCreator.defaultProps = {
  isSubmitBtnEnabled: true,
};

export default FormCreator;
