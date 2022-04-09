import useStore from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";

function Home() {
  const [countryName, setCountryName] = useState<string>("");
  const store = useStore();
  const navigate = useNavigate();

  //handle submit;
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`/country/${countryName}`);
  }

  const handleInput = (text: string) => {
    store?.toggleSubmitBtn(text);
    setCountryName(text);
  };

  return (
    <div data-testid="home-page" className="home-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => handleInput(e.target.value)}
          type="text"
          required
          placeholder="Enter country"
        />
        <Button type="submit" disabled={store?.disable} variant="contained">
          Find Country
        </Button>
      </form>
    </div>
  );
}

export default Home;
