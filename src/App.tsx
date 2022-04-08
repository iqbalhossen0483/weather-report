import React from "react";
import { Route, Routes } from "react-router-dom";
import Provider from "./contexAPI/Provider";
import Store from "./contexAPI/Store";
import Country from "./pages/country/Country";
import Home from "./pages/home/Home";

const App = () => {
  const store = Store();
  return (
    <div>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:name" element={<Country />} />
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
