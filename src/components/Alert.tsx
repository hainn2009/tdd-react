const Alert = ({ type, text }: { type: "success" | "fail"; text: string }) => {
    return <div className={`alert alert-${type} mt-3`}>{text}</div>;
};
export default Alert;
