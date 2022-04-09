import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Provider from "../../contexAPI/Provider";
import { StoreSchema } from "../../contexAPI/Store";
import Home from "./Home";

const store: StoreSchema = {
  userMessage: true,
  loading: false,
  disable: true,
  error: null,
  setError: jest.fn(),
  country: {
    name: { official: "bangladesh" },
    capital: ["dhaka"],
    population: "1200000",
    latlng: [20, 90],
    flags: { png: "url" },
  },
  weather: {
    location: { name: "dhaka" },
    current: {
      temperature: 30,
      weather_icons: ["url"],
      wind_speed: "30",
      precip: 30,
    },
  },
  setWeather: jest.fn(),
  fetchCountryAPI: jest.fn(),
  toggleSubmitBtn: jest.fn(),
  getWeatherReport: jest.fn(),
};

describe("Home page", () => {
  it("check button is disable when input feild is empty", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>
    );
    const buttonElement = screen.getByRole("button", { name: /Find Country/i });
    expect(buttonElement).toBeDisabled();
  });

  it("check button is enable when input feild is not empty", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const inputElement = screen.getByPlaceholderText(
      /Enter country/i
    ) as HTMLInputElement;
    const buttonElement = screen.getByRole("button", { name: /Find Country/i });

    fireEvent.change(inputElement, { target: { value: "bangladesh" } });
    expect(buttonElement).not.toBeDisabled();
    expect(inputElement.value).toBe("bangladesh");
  });
});
