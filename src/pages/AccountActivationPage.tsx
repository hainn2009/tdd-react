import { useParams } from "react-router-dom";
import { activate } from "../api/apiCall";
import { useEffect, useState } from "react";
import Alert from "../components/Alert";

const AccountActivationPage = ({ match }: { match?: object }) => {
    const param = useParams();
    const [result, setResult] = useState("");

    useEffect(() => {
        setResult("");
        activate(param.token || "")
            .then(() => {
                setResult("success");
            })
            .catch(() => {
                setResult("fail");
            });
    }, [param.token]);

    const content = !result ? (
        <span className="spinner-border" role="status"></span>
    ) : result === "success" ? (
        <Alert type="success" text="Account is activated" />
    ) : (
        <Alert type="success" text="Activation failure" />
    );
    return (
        <div data-testid="activation-page">
            <h1>Account Activation Page</h1>
            {content}
        </div>
    );
};
export default AccountActivationPage;
