import i18n from "../locale/i18n";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    return (
        <>
            <img
                src="images/japanese-flag.png"
                title="Tiếng Việt"
                onClick={() => {
                    i18n.changeLanguage("vn");
                }}
                width="24px"
            />
            <img
                src="images/english-flag.png"
                title="English"
                onClick={() => {
                    i18n.changeLanguage("en");
                }}
                width="24px"
            />
        </>
    );
};
export default LanguageSelector;
