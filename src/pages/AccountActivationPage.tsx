import { useParams } from "react-router-dom";
import { activate } from "../api/apiCall";
import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const AccountActivationPage = ({ match }: { match?: object }) => {
    const param = useParams();
    const [result, setResult] = useState("");

    useEffect(() => {
        async function activeRequest() {
            setResult("");
            try {
                await activate(param.token || "");
                setResult("success");
            } catch (error) {
                setResult("fail");
            }
        }
        activeRequest();
    }, [param.token]);

    const content = !result ? (
        <Alert type="secondary" center>
            <Spinner size="big" />
        </Alert>
    ) : result === "success" ? (
        <Alert type="success">Account is activated</Alert>
    ) : (
        <Alert type="danger">Activation failure</Alert>
    );
    return (
        <div data-testid="activation-page">
            <h1>Account Activation Page</h1>
            {content}
        </div>
    );
};
export default AccountActivationPage;
