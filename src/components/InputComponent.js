const Input = ({ id, label, onChange, help }) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input type="text" id={id} onChange={onChange} className={`form-control ${help ? "is-invalid" : ""}`} />
            <span className="invalid-feedback">{help}</span>
        </div>
    );
};

export default Input;
