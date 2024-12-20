import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routerConfig } from "../App";
import { setupServer } from "msw/node";
import { rest } from "msw";
import userEvent from "@testing-library/user-event";

let counter = 0;
const server = setupServer(
    rest.post("/api/1.0/users/token/:token", (req, res, ctx) => {
        counter += 1;
        if (req.params.token === "5678") return res(ctx.status(400));
        return res(ctx.status(200));
    })
);
beforeAll(() => server.listen());

beforeEach(() => {
    counter = 0;
    server.resetHandlers();
});

afterAll(() => server.close());
describe("Account Activation Page", () => {
    const setup = (token: string) => {
        render(<RouterProvider router={createMemoryRouter(routerConfig, { initialEntries: [`/activate/${token}`] })} />);
    };
    it("display activation success message when token is valid", async () => {
        setup("1234");
        const message = await screen.findByText("Account is activated");
        expect(message).toBeInTheDocument();
    });
    it("send activation request to backend", async () => {
        setup("1234");
        await screen.findByText("Account is activated");
        expect(counter).toBe(1);
    });
    it("display activation failure message when token is invalid", async () => {
        setup("5678");
        const message = await screen.findByText("Activation failure");
        expect(message).toBeInTheDocument();
    });
    it("send activation request after the token is changed", async () => {
        const successToken = "1234";
        const failureToken = "5678";
        render(<RouterProvider router={createMemoryRouter(routerConfig, { initialEntries: [`/activate/${successToken}`] })} />);
        await screen.findByText("Account is activated");
        render(<RouterProvider router={createMemoryRouter(routerConfig, { initialEntries: [`/activate/${failureToken}`] })} />);
        await screen.findByText("Activation failure");
        expect(counter).toBe(2);
    });
    it("display spinner during activation api call", async () => {
        setup("5678");
        const spinner = screen.getByRole("status", { hidden: true });
        expect(spinner).toBeInTheDocument();
        await screen.findByText("Activation failure");
        expect(spinner).not.toBeInTheDocument();
    });
    it("display spinner after second api call to the changed token", async () => {
        const successToken = "1234";
        const failureToken = "5678";
        render(<RouterProvider router={createMemoryRouter(routerConfig, { initialEntries: [`/activate/${successToken}`] })} />);
        await screen.findByText("Account is activated");
        render(<RouterProvider router={createMemoryRouter(routerConfig, { initialEntries: [`/activate/${failureToken}`] })} />);
        const spinner = screen.getByRole("status");
        expect(spinner).toBeInTheDocument();
        await screen.findByText("Activation failure");
        expect(spinner).not.toBeInTheDocument();
    });
});
