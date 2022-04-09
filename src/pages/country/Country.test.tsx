import { render, screen } from "@testing-library/react";
import Provider from "../../contexAPI/Provider";
import { StoreSchema } from "../../contexAPI/Store";
import Country from "./Country";

const fackStore: StoreSchema = {
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
      temperature: 20,
      weather_icons: ["url"],
      wind_speed: "39",
      precip: 20,
    },
  },
  setWeather: jest.fn(),
  fetchCountryAPI: jest.fn(),
  toggleSubmitBtn: jest.fn(),
  getWeatherReport: jest.fn(),
};

describe("country page", () => {
  it("county page is rendering", () => {
    render(<Country />);
    expect(screen.getByTestId("country-page")).toBeInTheDocument();
  });

  it("check country info is rendering", () => {
    render(
      <Provider store={fackStore}>
        <Country />
      </Provider>
    );
    expect(screen.getByText(/bangladesh/i)).toBeInTheDocument();
  });

  it("check weather info is rendering", () => {
    render(
      <Provider store={fackStore}>
        <Country />
      </Provider>
    );
    expect(screen.getByText(/weather report of dhaka/i)).toBeInTheDocument();
  });
});
