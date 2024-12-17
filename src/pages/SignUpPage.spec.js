import SignUpPage from "./SignUpPage";
import LanguageSelector from "../components/LanguageSelector";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import i18n from "../locale/i18n";
import en from "../locale/en.json";
import vn from "../locale/vn.json";

describe("Signup Page", () => {
    let requestBody;
    let counter = 0;
    let acceptLanguageHeader;
    const server = setupServer(
        rest.post("/api/1.0/users", async (req, res, ctx) => {
            requestBody = await req.json();
            counter += 1;
            acceptLanguageHeader = req.headers.get("Accept-Language");
            return res(ctx.status(200));
        })
    );
    let passwordInput;
    let passwordRepeatInput;
    let signUpButton;
    let usernameInput;
    let emailInput;
    beforeAll(() => {
        server.listen();
    });
    const setupTest = () => {
        render(
            <>
                <SignUpPage />
                <LanguageSelector />
            </>
        );
    };

    beforeEach(() => {
        i18n.changeLanguage("en");
        requestBody = null;
        counter = 0;
        setupTest();
        usernameInput = screen.getByLabelText("Username");
        emailInput = screen.getByLabelText("Email");
        passwordInput = screen.getByLabelText("Password");
        passwordRepeatInput = screen.getByLabelText("Password Repeat");
        signUpButton = screen.queryByRole("button", { name: "Sign Up" });
    });
    afterEach(() => {
        // quan trong vi no se thiet lap lai rest.post cho chung ta
        // nhung truong hop nao can override handler thi viet truc tiep tai tung case
        server.resetHandlers();
    });
    afterAll(() => server.close());
    describe("Layout", () => {
        it("has header", () => {
            const header = screen.queryByRole("heading", { name: "Sign Up" });
            expect(header).toBeInTheDocument();
        });
        it("has username input", () => {
            const input = screen.getByLabelText("Username");
            expect(input).toBeInTheDocument();
        });
        it("has email input", () => {
            const input = screen.getByLabelText("Email");
            expect(input).toBeInTheDocument();
        });
        it("has password input", () => {
            const input = screen.getByLabelText("Password");
            expect(input).toBeInTheDocument();
        });
        it("has password type for password input", () => {
            const input = screen.getByLabelText("Password");
            expect(input.type).toBe("password");
        });
        it("has password repeat input", () => {
            const input = screen.getByLabelText("Password Repeat");
            expect(input).toBeInTheDocument();
        });
        it("has password type for password repeat input", () => {
            const input = screen.getByLabelText("Password Repeat");
            expect(input.type).toBe("password");
        });
        it("has Sign up button", () => {
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeInTheDocument();
        });
        it("disables the Sign Up button initially", () => {
            // const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(signUpButton).toBeDisabled();
        });
    });
    describe("Interactions", () => {
        beforeEach(() => {
            userEvent.type(usernameInput, "user1");
            userEvent.type(emailInput, "user1@mail.com");
            userEvent.type(passwordInput, "Password");
            userEvent.type(passwordRepeatInput, "Password");
        });
        it("enables the Sign Up button when password and password repeat are the same", () => {
            expect(signUpButton).toBeEnabled();
        });
        it("sends username, email and password to the backend when click the Sign Up button", async () => {
            // Đây là cách mock function đơn giản của jest,
            // const mockfn = jest.fn();
            // axios.post = mockfn;
            // window.fetch = mockfn;
            // userEvent.click(button);
            // const firstCallOfMockFuntion = mockfn.mock.calls[0]; call chứa danh sách tất cả các lần gọi, ta lấy lần 1
            // //firstCallOfMockFuntion[1] là lấy params thứ 2 của lời gọi (param 1 chính là url, aixos.post(url, body))
            // const body = firstCallOfMockFuntion[1];
            // expect(body).toEqual

            // The server config code is above but it's actually difficult to follow
            userEvent.click(signUpButton);
            await screen.findByText("Please check your e-mail to activate your account");
            expect(requestBody).toEqual({ username: "user1", email: "user1@mail.com", password: "Password" });
        });
        it("disables sign up button when there is an ongoing api call", async () => {
            const button = screen.queryByRole("button", { name: "Sign Up" });

            // const mockfn = jest.fn();
            // // axios.post = mockfn;
            // window.fetch = mockfn;

            userEvent.click(button);
            userEvent.click(button);
            await screen.findByText("Please check your e-mail to activate your account");

            // const firstCallOfMockFuntion = mockfn.mock.calls[0];
            // const body = JSON.parse(firstCallOfMockFuntion[1].body);
            expect(counter).toBe(1);
        });
        it("display the spinner after click the Sign Up button", async () => {
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(screen.queryByRole("status", { hidden: true })).not.toBeInTheDocument(); //tìm cả những thẻ mà aria-idden: true
            userEvent.click(button);
            const spinner = screen.getByRole("status", { hidden: true });
            // Cần phải thực hiện việc waif for ở đây nghĩa là đợi cho các update state chạy hết
            // Sau khi click button, nó còn gọi về backend, update state dựa trên kết quả trả về
            // Bình thường thì test case kết thúc mà không chờ toàn bộ hành động update state
            // Nên sẽ báo warning ở đây dù test case vẫn pass
            // Thật ra cũng có thể check thêm vì có thể dùng findBy và nó hỗ trợ async/await
            await waitFor(() => {
                expect(spinner).toBeInTheDocument();
            });
        });
        it("display account activation notification after successful sign up request", async () => {
            const button = screen.queryByRole("button", { name: "Sign Up" });
            const message = "Please check your e-mail to activate your account";
            expect(screen.queryByText(message)).not.toBeInTheDocument();
            userEvent.click(button);
            // cái này nghĩa là chờ cho đến khi
            const text = await screen.findByText(message);
            expect(text).toBeInTheDocument();
        });
        it("hides sign up form after successful sign up request", async () => {
            const button = screen.queryByRole("button", { name: "Sign Up" });
            const form = screen.getByTestId("form-sign-up");
            userEvent.click(button);
            await waitFor(() => {
                expect(form).not.toBeInTheDocument();
            });
            // await waitForElementToBeRemoved(form);
        });
        const generateValidationError = (field, message) =>
            rest.post("/api/1.0/users", (req, res, ctx) => {
                return res(
                    ctx.status(400),
                    ctx.json({
                        validationErrors: { [field]: message },
                    })
                );
            });
        it.each`
            field         | message
            ${"username"} | ${"Username cannot be null"}
            ${"email"}    | ${"E-mail cannot be null"}
            ${"password"} | ${"Password cannot be null"}
        `("displays $message for $field", async ({ field, message }) => {
            server.use(generateValidationError(field, message));
            const button = screen.queryByRole("button", { name: "Sign Up" });
            userEvent.click(button);
            expect(await screen.findByText(message)).toBeInTheDocument();
        });
        it("hide the spinner and enable the sign up button after api response received", async () => {
            server.use(generateValidationError("username", "Username cannot be null"));
            const button = screen.queryByRole("button", { name: "Sign Up" });
            userEvent.click(button);
            await screen.findByText("Username cannot be null");
            // get the spinner, We have indicated in the span tag that the role field has a value of status
            expect(screen.queryByRole("status")).not.toBeInTheDocument();
            expect(button).toBeEnabled();
        });
        it("displays error message when password repeat mismatch", async () => {
            userEvent.type(passwordInput, "Password");
            userEvent.type(passwordRepeatInput, "Mismatch Password");
            await screen.findByText("Password mismatch");
        });
        it.each`
            field         | message                      | label
            ${"username"} | ${"Username cannot be null"} | ${"Username"}
            ${"email"}    | ${"E-mail cannot be null"}   | ${"Email"}
            ${"password"} | ${"Password cannot be null"} | ${"Password"}
        `("clear the validation error after $field field is updated", async ({ field, message, label }) => {
            server.use(generateValidationError(field, message));
            const button = screen.queryByRole("button", { name: "Sign Up" });
            userEvent.click(button);
            const validationError = await screen.findByText(message);
            userEvent.type(screen.queryByLabelText(label), "updated");
            expect(validationError).not.toBeInTheDocument();
        });
    });
    describe("Internationalization", () => {
        let englishToggle, vietnameseToggle;

        beforeEach(() => {
            // i18n.changeLanguage("en");
            // render(
            //     <>
            //         <SignUpPage />
            //         <LanguageSelector />
            //     </>
            // );
            englishToggle = screen.getByTitle("English");
            vietnameseToggle = screen.getByTitle("Tiếng Việt");
            userEvent.type(usernameInput, "user1");
            userEvent.type(emailInput, "user1@mail.com");
            userEvent.type(passwordInput, "Password");
            userEvent.type(passwordRepeatInput, "Password");
        });
        it("Initially display all texts in English", () => {
            expect(screen.getByRole("heading", { name: en.signUp })).toBeInTheDocument();
            expect(screen.getByRole("button", { name: en.signUp })).toBeInTheDocument();
            expect(screen.getByLabelText(en.username)).toBeInTheDocument();
            expect(screen.getByLabelText(en.email)).toBeInTheDocument();
            expect(screen.getByLabelText(en.password)).toBeInTheDocument();
            expect(screen.getByLabelText(en.passwordRepeat)).toBeInTheDocument();
        });
        it("Display all texts in Vietnamese after changing the language", () => {
            userEvent.click(vietnameseToggle);

            expect(screen.getByRole("heading", { name: vn.signUp })).toBeInTheDocument();
            expect(screen.getByRole("button", { name: vn.signUp })).toBeInTheDocument();
            expect(screen.getByLabelText(vn.username)).toBeInTheDocument();
            expect(screen.getByLabelText(vn.email)).toBeInTheDocument();
            expect(screen.getByLabelText(vn.password)).toBeInTheDocument();
            expect(screen.getByLabelText(vn.passwordRepeat)).toBeInTheDocument();
        });
        it("Display all texts in English after changing back from Vietnamese", () => {
            userEvent.click(vietnameseToggle);
            userEvent.click(englishToggle);

            expect(screen.getByRole("heading", { name: en.signUp })).toBeInTheDocument();
            expect(screen.getByRole("button", { name: en.signUp })).toBeInTheDocument();
            expect(screen.getByLabelText(en.username)).toBeInTheDocument();
            expect(screen.getByLabelText(en.email)).toBeInTheDocument();
            expect(screen.getByLabelText(en.password)).toBeInTheDocument();
            expect(screen.getByLabelText(en.passwordRepeat)).toBeInTheDocument();
        });
        it("Display password mismatch validation in Vietnamese", () => {
            userEvent.click(vietnameseToggle);
            const passwordInput = screen.getByLabelText(vn.password); // need to remove
            userEvent.type(passwordInput, "1");
            expect(screen.getByText(vn.passwordMismatchValidation)).toBeInTheDocument();
        });
        it("send accept language header as en for outgoing request", async () => {
            userEvent.type(passwordInput, "P4ssword");
            userEvent.type(passwordRepeatInput, "P4ssword");
            const form = screen.queryByTestId("form-sign-up");
            userEvent.click(signUpButton);
            await waitForElementToBeRemoved(form);
            expect(acceptLanguageHeader).toBe("en");
        });
        it("send accept language header as vn for outgoing request after selecting that language", async () => {
            userEvent.type(passwordInput, "P4ssword");
            userEvent.type(passwordRepeatInput, "P4ssword");
            userEvent.click(vietnameseToggle);
            const form = screen.queryByTestId("form-sign-up");
            userEvent.click(signUpButton);
            await waitForElementToBeRemoved(form);
            expect(acceptLanguageHeader).toBe("vn");
        });
    });
});
