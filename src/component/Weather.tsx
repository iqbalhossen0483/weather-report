import { FC } from "react";

const Weather: FC<{ weather: Weather }> = ({ weather }) => {
  return (
    <div className='weather-report'>
      <h2>Wather Report Of {weather.location.name}</h2>
      <img src={weather.current.weather_icons[0]} alt='' />
      <div className='space-y-2'>
        <p>
          <span>temperature: </span> {weather.current.temperature}
        </p>
        <p>
          <span>wind_speed: </span> {weather.current.wind_speed}
        </p>
        <p>
          <span>precip: </span> {weather.current.precip}
        </p>
      </div>
    </div>
  );
};

export default Weather;
