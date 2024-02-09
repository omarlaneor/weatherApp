import { useEffect, useState } from "react";
import { ArrowIcon } from "./components/Icons/Icons";

import {
  getForecast,
  getForecastCoord,
  getWeather,
  getWeatherCoord,
} from "./apiKey/api";
import { addPlaceToLocalStorage } from "./storage/storage";
import SearchModal from "./components/SearchModal/SearchModal";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay/ForecastDisplay";

function App() {
  const [weatherData, setWeatherData] = useState({
    airPressure: 0,
    windStatus: 0,
    locationName: "",
    temp: 0,
    humidity: 0,
    weather: "",
    visibilityInMiles: 0,
    dateFormat: "",
  });
  const [forecastData, setForecastData] = useState({});
  const [keys, setKeys] = useState([]);

  const changeWeather = (data) => {
    const { wind, weather, main, name, visibility } = data;
    const date = new Date();
    const dateOptions = { weekday: "short", day: "numeric", month: "short" };

    setWeatherData({
      temp: Math.round(main?.temp ?? 0),
      dateFormat: date.toLocaleDateString("en-US", dateOptions),
      windStatus: Math.round(wind?.speed ?? 0),
      humidity: Math.round(main?.humidity ?? 0),
      airPressure: main?.pressure ?? 0,
      visibilityInMiles: visibility ? visibility / 1609.34 : 0,
      weather: weather[0]?.main ?? "Shower",
      lowercaseWeatherMain,
      locationName: name,
    });
    const progreso = document.getElementById("progress");
    const windStatus = document.getElementById("windStatus");
    progreso.style.width = Math.round(main?.humidity ?? 0) + "%";
    windStatus.style.transform = `rotate(${wind.deg}deg)`;
  };

  const changeForecast = (data) => {
    const dailyForecast = [];

    data.list.forEach((segment) => {
      const fechaTexto = segment.dt_txt;
      const fecha = new Date(fechaTexto);
      const dia = fecha.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });

      if (!dailyForecast[dia]) {
        dailyForecast[dia] = {
          minTemp: segment.main.temp,
          maxTemp: segment.main.temp,
          weather: segment.weather[0].main,
        };
      } else {
        dailyForecast[dia].minTemp = Math.min(
          dailyForecast[dia].minTemp,
          segment.main.temp
        );
        dailyForecast[dia].maxTemp = Math.max(
          dailyForecast[dia].maxTemp,
          segment.main.temp
        );
      }
    });
    const dayKeys = Object.keys(dailyForecast);
    setForecastData(dailyForecast);
    setKeys(dayKeys);
  };

  const coords = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        getWeatherCoord(lat, lon).then((data) => changeWeather(data));
        getForecastCoord(lat, lon).then((data) => changeForecast(data));
      });
    } else {
      console.log("Geolocation no available in this page!");
    }
  };

  const inputSearch = (place) => {
    addPlaceToLocalStorage(place);
    getWeather(place).then((data) => changeWeather(data));
    getForecast(place).then((data) => changeForecast(data));
  };

  useEffect(() => {
    getWeather("alemania").then((data) => changeWeather(data));
    getForecast("alemania").then((data) => changeForecast(data));
  }, []);

  return (
    <main className="md:flex max-w-8xl mx-auto">
      <section className="md:fixed md:top-0 md:bottom-0 md:left-0 md:w-[400px] relative">
        <SearchModal inputSearch={inputSearch} />
        <WeatherDisplay weatherData={weatherData} coords={coords} />
      </section>
      <section className="md:flex-1 md:pl-[200px] md:m-20">
        <ForecastDisplay keys={keys} forecastData={forecastData} />
      </section>

      <section className="p-5">
        <h3 className="text-2xl font-bold pb-8">Today’s Hightlights </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <article className="flex flex-col items-center bg-blue-1 w-full p-6">
            <p className="text-base font-medium pb-2">Wind status</p>
            <p className="text-6xl font-bold">
              {weatherData.windStatus}
              <span className="text-5xl font-medium">mph</span>
            </p>
            <div className="flex items-center pt-5 gap-4">
              <span id="windStatus" className="bg-gray-4 p-3 rounded-full">
                <ArrowIcon />
              </span>
              <span>WSW</span>
            </div>
          </article>
          <article className="flex flex-col items-center bg-blue-1 w-full py-6 px-12">
            <p className="text-base font-medium pb-2">Humidity</p>
            <p className="text-6xl font-bold">
              {weatherData.humidity}
              <span className="text-5xl font-medium">%</span>
            </p>
            <div className="flex justify-between w-full pt-4">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
            <div className="w-full h-2 bg-gray-1 rounded-full overflow-hidden">
              <div
                id="progress"
                className="h-full bg-yellow-1 transition-all duration-300"
              />
            </div>
            <span className="flex justify-end w-full">%</span>
          </article>
          <article className="flex flex-col items-center bg-blue-1 w-full p-6">
            <p className="text-base font-medium pb-2">Visibility</p>
            <p className="text-6xl font-bold">
              {weatherData.visibilityInMiles.toFixed(1)}{" "}
              <span className="text-5xl font-medium">miles</span>
            </p>
          </article>
          <article className="flex flex-col items-center bg-blue-1 w-full p-6">
            <p className="text-base font-medium pb-2">Air Pressure</p>
            <p className="text-6xl font-bold">
              {weatherData.airPressure}{" "}
              <span className="text-5xl font-medium">mb</span>
            </p>
          </article>
        </div>
      </section>
      <footer className="text-sm font-medium text-center p-8">
        created by Omar Milansu Osorio -{" "}
        <a href="https://devchallenges.io/">devChallenges.io</a>
      </footer>
    </main>
  );
}

export default App;
