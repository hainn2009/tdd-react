const Input = ({ id, label, onChange, help }) => {
    return (
        <div className="mb-3">
            <label htmlFor="username" className="form-label">
                {label}
            </label>
            <input type="text" id={id} onChange={onChange} className="form-control" />
            <span>{help}</span>
        </div>
    );
};

export default Input;
