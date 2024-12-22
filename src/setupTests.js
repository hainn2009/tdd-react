// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
// import '@testing-library/jest-dom/extend-expect';
import i18n from "./locale/i18n";
import { act } from "@testing-library/react";
afterEach(() => {
    act(() => {
        i18n.changeLanguage("en");
    });
});
