/// <reference types="react-scripts" />

interface Country {
  name: { official: string };
  capital: string[];
  population: string;
  latlng: number[];
  flags: { png: string };
}

interface Weather {
  location: { name: string };
  current: {
    temperature: number;
    weather_icons: string[];
    wind_speed: string;
    precip: number;
  };
}
