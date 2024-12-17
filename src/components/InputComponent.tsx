const Input = ({
    id,
    label,
    onChange,
    help,
    type = "text",
}: {
    id: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    help: string;
    type?: string;
}) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input type={type} id={id} onChange={onChange} className={`form-control ${help ? "is-invalid" : ""}`} />
            {help && <span className="invalid-feedback">{help}</span>}
        </div>
    );
};

export default Input;
