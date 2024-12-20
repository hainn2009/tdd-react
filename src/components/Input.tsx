import { ChangeEventHandler } from "react";

const Input = ({
    hasError,
    label,
    type,
    placeholder,
    value = "",
    onChange = () => {},
    error = "",
}: {
    hasError?: string;
    label: string;
    type?: string;
    placeholder: string;
    value?: string;
    onChange?: ChangeEventHandler;
    error?: string;
}) => {
    let inputClassName = "form-control";
    if (hasError !== undefined) inputClassName += hasError ? " is-invalid" : " is-valid";

    return (
        <div>
            {label && <label>{label}</label>}
            <input className={inputClassName} type={type || "text"} placeholder={placeholder} value={value} onChange={onChange} />
            {hasError && <span className="invalid-feedback">{error}</span>}
        </div>
    );
};

export default Input;
