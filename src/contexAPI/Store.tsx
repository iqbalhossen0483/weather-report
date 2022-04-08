import { useState } from "react";

export interface StoreSchema {
  userMessage: boolean;
  loading: boolean;
  disable: boolean;
  error: string | null;
  setError: (active: string | null) => void;
  country: Country | null;
  weather: Weather | null;
  setWeather: (active: Weather | null) => void;
  fetchCountryAPI: (countryName: string) => Promise<void>;
  toggleSubmitBtn: (text: string) => void;
  getWeatherReport: (text: string) => void;
}

function Store(): StoreSchema {
  const [userMessage, setUserMessage] = useState<boolean>(Boolean);
  const [country, setCountry] = useState<Country | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(true);

  //handle submit of home page;
  async function fetchCountryAPI(countryName: string) {
    //reset weather state and error;
    setLoading(true);
    setWeather(null);
    setError(null);

    //fetch country data;
    const url: string = `https://restcountries.com/v3.1/name/${countryName}`;

    try {
      const res = await fetch(url);
      if (res.status > 200) {
        setUserMessage(true);
        setCountry(null);
      } else {
        setUserMessage(false);
        const data = await res.json();
        setCountry(data[0]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setDisable(true);
    }
  }

  //toggle submit btn;
  function toggleSubmitBtn(text: string) {
    if (text) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }

  // //get weather report;
  async function getWeatherReport(country: string) {
    const url: string = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API}&query=${country}`;

    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setWeather(data);
      } else {
        setWeather(null);
        setError("There was an error occoured. see The console.");
      }
    } catch (err) {
      setWeather(null);
      setError("There was an error occoured. see The console.");
      console.log(err);
    }
  }

  return {
    fetchCountryAPI,
    userMessage,
    country,
    disable,
    loading,
    weather,
    setWeather,
    error,
    setError,
    toggleSubmitBtn,
    getWeatherReport,
  };
}

export default Store;
