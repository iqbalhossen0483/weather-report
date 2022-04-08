import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./Home";

it("home page render and check has input and button", () => {
  render(<Home />);
  const inputElement = screen.getByPlaceholderText(/Enter country/i);
  const buttonElement = screen.getByRole("button", { name: /Find Country/i });
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

it("check button is disable when input feild is empty", () => {
  render(<Home />);
  const buttonElement = screen.getByRole("button", { name: /Find Country/i });
  expect(buttonElement).toBeDisabled();
});

it("check button is enable when input feild is not empty", () => {
  render(<Home />);
  const inputElement = screen.getByPlaceholderText(
    /Enter country/i
  ) as HTMLInputElement;
  const buttonElement = screen.getByRole("button", { name: /Find Country/i });
  expect(buttonElement).toBeDisabled();
  fireEvent.change(inputElement, { target: { value: "bangladesh" } });
  expect(buttonElement).not.toBeDisabled();
  expect(inputElement.value).toBe("bangladesh");
});

it("fetch api", async () => {
  render(<Home />);
  const inputElement = screen.getByPlaceholderText(/Enter country/i);
  const buttonElement = screen.getByRole("button", { name: /Find Country/i });
  fireEvent.change(inputElement, { target: { value: "bangladesh" } });
  fireEvent.click(buttonElement);
});