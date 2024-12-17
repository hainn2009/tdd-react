import { render, screen } from "@testing-library/react";
import Input from "./InputComponent";

it("has is-invalid class for Input when help is set", () => {
    render(<Input help="Error message" />);
    const input = screen.getByRole("textbox");
    expect(input.classList).toContain("is-invalid");
});
it("has invalid-feedback class for span when help is set", () => {
    render(<Input help="Error message" />);
    const input = screen.getByRole("status");
    expect(input.classList).toContain("invalid-feedback");
});
it("does not have is-invalid class for Input when help is not set", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input.classList).not.toContain("is-invalid");
});
