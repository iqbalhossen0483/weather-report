import { render, screen } from "@testing-library/react";
import { BrowserRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("app component", () => {
  it("app is rendering", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const appComponent = screen.getByTestId("app");
    expect(appComponent).toBeInTheDocument();
  });

  test("render home route", () => {
    const history = createMemoryHistory();
    render(
      <Router navigator={history} location={"/"}>
        <App />
      </Router>
    );
    userEvent.click(screen.getByTestId("home-page"));
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  test("render country route", () => {
    const history = createMemoryHistory();
    render(
      <Router navigator={history} location={"/country/bangladesh"}>
        <App />
      </Router>
    );
    userEvent.click(screen.getByTestId("country-page"));
    expect(screen.getByTestId("country-page")).toBeInTheDocument();
  });
});
