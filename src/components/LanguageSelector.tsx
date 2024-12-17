import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    return (
        <>
            <img
                src="images/vietnam-flag.png"
                title="Tiếng Việt"
                onClick={() => {
                    i18n.changeLanguage("vn");
                }}
                width="24px"
                alt="Vietnam flag"
                className="me-1"
            />
            <img
                src="images/english-flag.png"
                title="English"
                onClick={() => {
                    i18n.changeLanguage("en");
                }}
                width="24px"
                alt="English flag"
            />
        </>
    );
};
export default LanguageSelector;
