import i18n from "../locale/i18n";

const LanguageSelector = () => (
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

export default LanguageSelector;
