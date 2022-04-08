import { Button } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Weather from "../../component/Weather";
import useStore from "../../hooks/useStore";

const Country = () => {
  const store = useStore();
  const country = store?.country;
  const { name } = useParams();

  useEffect(() => {
    if (name) {
      store?.fetchCountryAPI(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  //get weather report;
  async function getWeatherReport(country: string | undefined) {
    if (country) {
      store?.getWeatherReport(country);
    }
  }

  if (store?.loading) {
    return (
      <div className="spinner">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {store?.userMessage && (
        <div className="user-message">
          <p>No results matched</p>
        </div>
      )}

      {country && (
        <div className="country-container">
          <h2>{country?.name?.official}</h2>
          <div className="space-y-3">
            <p>
              <span>Capital: </span> {country?.capital?.join(",")}
            </p>
            <p>
              <span>Population: </span> {country?.population}
            </p>
            <p>
              <span>Lat: </span> {country?.latlng[0]}
              <sup>&deg;</sup>
            </p>
            <p>
              <span>Lon: </span> {country?.latlng[1]}
              <sup>&deg;</sup>
            </p>
            <Button
              variant="outlined"
              onClick={() => getWeatherReport(country?.capital[0])}
            >
              Capital Weather
            </Button>
          </div>
          <img src={country?.flags?.png} alt="" />

          {store?.weather && <Weather weather={store?.weather} />}

          {store?.error && (
            <div className="col-span-2 text-xl text-gray-400 font-medium mt-10">
              <p>{store?.error}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Country;
