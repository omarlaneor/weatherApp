import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Highlights from "./components/Highlights/Highlights";
import "../src/App.css";

const App = () => {
  const [places, setPlaces] = useState([
    { name: "City 1", image: "url_to_image_1.jpg", temperature: 25 },
    { name: "City 2", image: "url_to_image_2.jpg", temperature: 20 },
    { name: "City 3", image: "url_to_image_3.jpg", temperature: 22 },
    { name: "City 4", image: "url_to_image_4.jpg", temperature: 18 },
    { name: "City 5", image: "url_to_image_5.jpg", temperature: 23 },
  ]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#1E213A] p-4 w-[25%] h-[800px]">
        <button className="bg-gray-300 p-2 border-none rounded-none">
          Search for Places
        </button>
      </div>
      <div className="bg-[#100E1D] p-4 w-3/4 h-[800px] justify-center flex flex-col">
        <div className="flex flex-wrap justify-center">
          {places.map((place, index) => (
            <WeatherCard key={index} place={place} />
          ))}
        </div>
        <Highlights />
      </div>
    </div>
  );
};

export default App;
