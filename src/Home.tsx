import { useRef, useState } from "react";
import Details from "./component/Details";
import LoadingButton from "@mui/lab/LoadingButton";

function Home() {
  const [userMessage, setUserMessage] = useState<boolean>(Boolean);
  const [country, setCountry] = useState<Country | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const countryName = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(true);

  //handle submit btn;
  function handleSubmitBtn(text: string) {
    if (text) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }

  //handle submit;
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //prevent default dehavior and reset weather state and error;
    e.preventDefault();
    setLoading(true);
    setWeather(null);
    setError(null);

    //fetch country data;
    const url: string = `https://restcountries.com/v3.1/name/${countryName.current?.value}`;

    const res = await fetch(url);
    if (res.status > 200) {
      setUserMessage(true);
      setCountry(null);
      setLoading(false);
    } else {
      setUserMessage(false);
      const data = await res.json();
      setCountry(data[0]);
      setLoading(false);
    }
  }

  return (
    <div className='home-container'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => handleSubmitBtn(e.target.value)}
          ref={countryName}
          type='text'
          required
          placeholder='Enter country'
        />
        <LoadingButton
          type='submit'
          disabled={disable}
          loading={loading}
          loadingIndicator='Loading...'
          variant='contained'
        >
          Find Country
        </LoadingButton>
      </form>

      {userMessage && (
        <div className='text-xl text-gray-400 font-medium mt-10'>
          <p>No results matched</p>
        </div>
      )}

      {country && (
        <Details
          country={country}
          weather={weather}
          setWeather={setWeather}
          error={error}
          setError={setError}
        />
      )}
    </div>
  );
}

export default Home;
