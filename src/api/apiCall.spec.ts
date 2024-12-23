import axios from "axios";
import * as apiCalls from "./apiCall";

describe("Api Calls", () => {
    describe("Signup", () => {
        it("call /api/1.0/users", () => {
            const mockSignup = jest.fn();
            axios.post = mockSignup;
            apiCalls.signUp({});

            const path = mockSignup.mock.calls[0][0];
            expect(path).toBe("/api/1.0/users");
        });
    });
});
