import { Button } from "@mui/material";
import { FC } from "react";
import Weather from "./Weather";

interface Props {
  country: Country;
  weather: Weather | null;
  setWeather: (active: Weather | null) => void;
  error: string | null;
  setError: (active: string | null) => void;
}

const Details: FC<Props> = (props) => {
  const { country, weather, setWeather, error, setError } = props;

  //get weather report;
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

  return (
    <div className='details-container'>
      <h2>{country.name.official}</h2>
      <div className='space-y-3'>
        <p>
          <span>Capital: </span> {country.capital.join(",")}
        </p>
        <p>
          <span>Population: </span> {country.population}
        </p>
        <p>
          <span>Latlng: </span> {country.latlng.join(",")}
        </p>
        <Button
          variant='outlined'
          onClick={() => getWeatherReport(country.capital[0])}
        >
          Capital Weather
        </Button>
      </div>
      <img src={country.flags.png} alt='' />

      {weather && <Weather weather={weather} />}
      {error && (
        <div className='col-span-2 text-xl text-gray-400 font-medium mt-10'>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Details;
