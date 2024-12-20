const Input = ({
    id,
    label,
    onChange,
    help,
    type = "text",
}: {
    id?: string;
    label?: string | null;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    help?: string | null;
    type?: string;
}) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input type={type} id={id} onChange={onChange} className={`form-control ${help ? "is-invalid" : ""}`} />
            {help && (
                <span className="invalid-feedback" data-testid="spinner">
                    {help}
                </span>
            )}
        </div>
    );
};

export default Input;
