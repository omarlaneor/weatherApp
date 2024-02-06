import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Highlights from "./components/Highlights/Highlights";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import "../src/App.css";
import Temperature from "./components/Temperature/Temperature";
import SearchModal from "./components/SearchModal/SearchModal";

const getFormattedDate = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Augt",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const dayOfMonth = currentDate.getDate();
  const month = months[currentDate.getMonth()];

  return `Today, ${dayOfWeek}, ${dayOfMonth} ${month}`;
};

const App = () => {
  const [places, setPlaces] = useState([
    {
      name: "City 1",
      image: "url_to_image_1.jpg",
      temperature: 25,
      description: "Shower",
    },
    {
      name: "City 2",
      image: "url_to_image_2.jpg",
      temperature: 20,
      description: "Cloudy",
    },
    {
      name: "City 3",
      image: "url_to_image_3.jpg",
      temperature: 22,
      description: "Sunny",
    },
    {
      name: "City 4",
      image: "url_to_image_4.jpg",
      temperature: 18,
      description: "Rainy",
    },
    {
      name: "City 5",
      image: "url_to_image_5.jpg",
      temperature: 23,
      description: "Clear",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const handleSearchClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="ml-28 p-4 w-[420px] h-[800px] bg-cover relative"
        style={{ backgroundImage: "url(back-left.svg)" }}
      >
        <button
          className="bg-[#6E707A] p-2 border-none rounded-none text-white"
          onClick={handleSearchClick}
        >
          Search for Places
        </button>

        {places.map((place, index) => (
          <WeatherInfo
            key={index}
            image={place.image}
            temperature={place.temperature}
            description={place.description}
            date={getFormattedDate()}
          />
        ))}
      </div>

      <div className="bg-[#100E1D] mr-20 p-4 w-[75%] h-[800px] justify-center flex flex-col">
        <div className="flex flex-wrap justify-center">
          <Temperature />
          {places.map((place, index) => (
            <WeatherCard key={index} place={place} />
          ))}
        </div>
        <Highlights />
      </div>

      {/* Incluimos el componente SearchModal */}
      <SearchModal showModal={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
