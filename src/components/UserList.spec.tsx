import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import UserList from "./UserList";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import en from "../locale/en.json";
import vn from "../locale/vn.json";
import LanguageSelector from "./LanguageSelector";

const users = [
    {
        id: 1,
        username: "user1",
        email: "user1@mail.com",
        image: null,
    },
    {
        id: 2,
        username: "user2",
        email: "user2@mail.com",
        image: null,
    },
    {
        id: 3,
        username: "user3",
        email: "user3@mail.com",
        image: null,
    },
    {
        id: 4,
        username: "user4",
        email: "user4@mail.com",
        image: null,
    },
    {
        id: 5,
        username: "user5",
        email: "user5@mail.com",
        image: null,
    },
    {
        id: 6,
        username: "user6",
        email: "user6@mail.com",
        image: null,
    },
    {
        id: 7,
        username: "user7",
        email: "user7@mail.com",
        image: null,
    },
];

const getPage = (page: number, size: number) => {
    const start = page * size;
    const end = start + size;
    const totalPages = Math.ceil(users.length / size);

    return {
        content: users.slice(start, end),
        page,
        size,
        totalPages,
    };
};

const server = setupServer(
    rest.get("/api/1.0/users", (req, res, ctx) => {
        const page = Number(req.url.searchParams.get("page")) || 0;
        const size = Number(req.url.searchParams.get("size")) || 0;
        // console.log(getPage(page, size));
        return res(ctx.status(200), ctx.json(getPage(page, size)));
    })
);
beforeAll(() => server.listen());

beforeEach(() => {
    server.resetHandlers();
});

afterAll(() => server.close());

describe("User List", () => {
    const userAction = userEvent.setup();
    const setup = () => {
        render(
            <MemoryRouter>
                <UserList />
                <LanguageSelector />
            </MemoryRouter>
        );
    };
    describe("Interactions", () => {
        it("Display three users in list", async () => {
            setup();
            const users = await screen.findAllByText(/user/);
            expect(users.length).toBe(3);
        });
        it("display next page link", async () => {
            setup();
            await screen.findByText("user1");
            expect(screen.getByText(/next >/)).toBeInTheDocument();
        });
        it("display next page after clicking on next page link", async () => {
            setup();
            await screen.findByText("user1");
            await userAction.click(screen.getByText(/next >/));
            expect(screen.getByText("user4")).toBeInTheDocument();
        });
        it("hide next page link at last page", async () => {
            setup();
            await screen.findByText("user1");
            const nextPageLink = screen.getByText(/next >/);
            await userAction.click(nextPageLink);
            await userAction.click(nextPageLink);
            expect(nextPageLink).not.toBeInTheDocument();
        });
        it("does not show previous page link when in first page", async () => {
            setup();
            await screen.findByText("user1");
            const previousePageLink = screen.queryByText(/< previous/);
            expect(previousePageLink).not.toBeInTheDocument();
        });
        it("display previous page after clicking previous page link", async () => {
            setup();
            await screen.findByText("user1");
            await userAction.click(screen.getByText(/next >/));
            expect(screen.getByText("user4")).toBeInTheDocument();
            await userAction.click(screen.getByText(/< previous/));
            expect(screen.getByText("user1")).toBeInTheDocument();
        });
    });
    describe("Internalization", () => {
        beforeEach(() => {
            server.use(
                rest.get("/api/1.0/users", (req, res, ctx) => {
                    return res(ctx.status(200), ctx.json(getPage(1, 3)));
                })
            );
        });
        it("initially display header and navigation links in English", async () => {
            setup();
            await screen.findByText("user4");
            expect(screen.getByText(en.users)).toBeInTheDocument();
            expect(screen.getByText(en.nextPage)).toBeInTheDocument();
            expect(screen.getByText(en.previousPage)).toBeInTheDocument();
        });
        it("display header and navigation links in Vietnamese after selecting the language", async () => {
            setup();
            await screen.findByText("user4");
            await userAction.click(screen.getByTitle("Tiếng Việt"));
            expect(screen.getByText(vn.users)).toBeInTheDocument();
            expect(screen.getByText(vn.nextPage)).toBeInTheDocument();
            expect(screen.getByText(vn.previousPage)).toBeInTheDocument();
        });
    });
});
