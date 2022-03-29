import { FC, useState } from "react";
import Weather from "./Weather";

const Details: FC<{ country: Country }> = ({ country }) => {
  const [weather, setWeather] = useState<Weather | null>(null);

  function getWeatherReport(country: string) {
    const url: string = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API}&query=${country}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }
  console.log(weather);

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
        <button
          onClick={() => getWeatherReport(country.capital[0])}
          className='bg-violet-600'
        >
          See Capital Weather
        </button>
      </div>
      <img src={country.flags.png} alt='' />

      {weather && <Weather weather={weather} />}
    </div>
  );
};

export default Details;
