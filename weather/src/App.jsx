import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import Highlights from "./components/Highlights/Highlights";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import Temperature from "./components/Temperature/Temperature";
import SearchModal from "./components/SearchModal/SearchModal";
import "../src/App.css";

const App = () => {
  const [places, setPlaces] = useState([
    {
      name: { currentDate },
      image: "url_to_image_1.jpg",
      temperature: 25,
      description: "Shower",
    },
    {
      name: "Imagen 2",
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

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = "bdb1b19748308daf15192f6310a6eead";
      const cities = ["Image 1", "City 2", "City 3", "City 4", "City 5"];
      const weatherData = [];

      for (const city of cities) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          const tomorrowData = data.list[8];
          const weatherInfo = {
            name: city,
            temperature: tomorrowData.main.temp,
            description: tomorrowData.weather[0].main,
            image: getWeatherImage(tomorrowData.weather[0].main),
          };
          weatherData.push(weatherInfo);
        } catch (error) {
          console.error(`Error fetching weather data for ${city}`, error);
        }
      }

      setPlaces(weatherData);
    };

    const getWeatherImage = (description) => {
      switch (description) {
        case "Clear":
          return "Clear.png";
        case "Hail":
          return "Hail.png";
        case "HeavyCloud":
          return "HeavyCloud.png";
        case "HeavyRain":
          return "HeavyRain.png";
        case "LightCloud":
          return "LightCloud.png";
        case "LightRain":
          return "LightRain.png";
        case "Shower":
          return "Shower.png";
        case "Sleet":
          return "Sleet.png";
        case "Snow":
          return "Snow.png";
        default:
          return "Unknown.png";
      }
    };

    fetchWeatherData();
  }, []);

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

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="ml-28 p-4 w-[400px] h-[800px] relative bg-[#1E213A]">
        <div
          className="bg-cover"
          style={{
            background: `url(Cloud-background.png)`,
            backgroundPosition: "center",
            marginLeft: "-14px",
            width: "320px",
            height: "210px",
            position: "absolute",
            marginTop: "70px",
          }}
        ></div>
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
