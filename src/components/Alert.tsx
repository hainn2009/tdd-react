import { ReactNode } from "react";

const Alert = ({ type, center, children }: { type: "success" | "danger" | "secondary"; children?: ReactNode; center?: boolean }) => {
    return <div className={`alert alert-${type} ${center && "text-center"}`}>{children}</div>;
};
export default Alert;
