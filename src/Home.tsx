import { useRef, useState } from "react";
import Details from "./component/Details";

function Home() {
  const [userMessage, setUserMessage] = useState<boolean>(Boolean);
  const [country, setCountry] = useState<Country | null>(null);
  const countryName = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url: string = `https://restcountries.com/v3.1/name/${countryName.current?.value}`;

    const res = await fetch(url);
    if (res.status > 200) {
      setUserMessage(true);
      setCountry(null);
    } else {
      setUserMessage(false);
      const data = await res.json();
      setCountry(data[0]);
    }
  }

  return (
    <div className='home-container'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          ref={countryName}
          type='text'
          required
          placeholder='Enter country'
        />
        <button className='bg-violet-600 rounded-l-none' type='submit'>
          Find Country
        </button>
      </form>
      {userMessage && (
        <div className='text-xl text-gray-400 font-medium mt-10'>
          <p>No results matched</p>
        </div>
      )}
      {country && <Details country={country} />}
    </div>
  );
}

export default Home;
