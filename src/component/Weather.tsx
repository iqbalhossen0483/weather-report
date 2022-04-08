import { FC } from "react";

const Weather: FC<{ weather: Weather }> = ({ weather }) => {
  return (
    <>
      <h2 className="weather-report-header">
        Weather Report Of {weather.location.name}
      </h2>
      <div className="weather-report">
        <img src={weather.current.weather_icons[0]} alt="" />
        <div className="space-y-2 ml-5">
          <p>
            <span>temperature: </span> {weather.current.temperature}
            <sup>&deg;</sup>C
          </p>
          <p>
            <span>wind_speed: </span> {weather.current.wind_speed}
            <sup>&deg;</sup>
          </p>
          <p>
            <span>precip: </span> {weather.current.precip}
          </p>
        </div>
      </div>
    </>
  );
};

export default Weather;
