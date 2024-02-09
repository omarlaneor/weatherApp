import { useEffect, useState } from "react";
import { ArrowIcon } from "./components/Icons/Icons";

import {
  getForecast,
  getForecastCoord,
  getWeather,
  getWeatherCoord,
} from "./apiKey/api";
import SearchModal from "./components/SearchModal/SearchModal";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay/ForecastDisplay";

function App() {
  const [weatherInfo, setWeatherInfo] = useState({
    temp: 0,
    dateFormat: "",
    windStatus: 0,
    humidity: 0,
    airPressure: 0,
    visibilityInMiles: 0,
    weather: "",
    locationName: "",
    lat: 0,
    lon: 0,
    changeWeather: (data) => {
      const { weather, main, visibility, wind, name } = data;
      const date = new Date();
      const dateOptions = { weekday: "short", day: "numeric", month: "short" };

      setWeatherInfo({
        temp: Math.round(main?.temp ?? 0),
        dateFormat: date.toLocaleDateString("en-US", dateOptions),
        windStatus: Math.round(wind?.speed ?? 0),
        humidity: Math.round(main?.humidity ?? 0),
        airPressure: main?.pressure ?? 0,
        visibilityInMiles: visibility ? visibility / 1609.34 : 0,
        weather: weather[0]?.main ?? "Shower",
        locationName: name,
        lat: weatherInfo.lat,
        lon: weatherInfo.lon,
        changeWeather: weatherInfo.changeWeather,
        changeForecast: weatherInfo.changeForecast,
      });

      const progreso = document.getElementById("progress");
      const windStatus = document.getElementById("windStatus");
      progreso.style.width = Math.round(main?.humidity ?? 0) + "%";
      windStatus.style.transform = `rotate(${wind.deg}deg)`;
    },
    changeForecast: (data) => {
      const dailyForecast = [];
      data.list.forEach((segment) => {
        const fechaTexto = segment.dt_txt;
        const fecha = new Date(fechaTexto);
        const day = fecha.toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        });

        if (!dailyForecast[day]) {
          dailyForecast[day] = {
            minTemp: segment.main.temp,
            maxTemp: segment.main.temp,
            weather: segment.weather[0].main,
          };
        } else {
          dailyForecast[day].minTemp = Math.min(
            dailyForecast[day].minTemp,
            segment.main.temp
          );
          dailyForecast[day].maxTemp = Math.max(
            dailyForecast[day].maxTemp,
            segment.main.temp
          );
        }
      });

      const dayKeys = Object.keys(dailyForecast);
      setForecastData(dailyForecast);
      setKeys(dayKeys);
    },
  });

  const [forecastData, setForecastData] = useState({});
  const [keys, setKeys] = useState([]);

  const coords = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        getWeatherCoord(lat, lon).then((data) =>
          weatherInfo.changeWeather(data)
        );
        getForecastCoord(lat, lon).then((data) =>
          weatherInfo.changeForecast(data)
        );
      });
    } else {
      console.log("Geolocation is not available for this version of Chrome.");
    }
  };

  const inputSearch = (place) => {
    getWeather(place).then((data) => weatherInfo.changeWeather(data));
    getForecast(place).then((data) => weatherInfo.changeForecast(data));
  };

  useEffect(() => {
    getWeather("Germany").then((data) => weatherInfo.changeWeather(data));
    getForecast("Germany").then((data) => weatherInfo.changeForecast(data));
  }, []);

  return (
    <main className="md:flex max-w-8xl mx-auto">
      <section className="md:fixed md:top-0 md:bottom-0 md:left-0 md:w-[400px] relative">
        <SearchModal inputSearch={inputSearch} />
        <WeatherDisplay
          weatherInfo={weatherInfo}
          forecastData={forecastData}
          keys={keys}
          coords={coords}
        />
      </section>
      <section className="md:flex-1 md:pl-[400px] md:m-20">
        <ForecastDisplay forecastData={forecastData} keys={keys} />
        <section className="p-5">
          <h3 className="text-2xl font-bold pb-8">Today’s Hightlights </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="flex flex-col items-center bg-blue-1 w-full p-6">
              <p className="text-base font-medium pb-2">Wind status</p>
              <p className="text-6xl font-bold">
                {weatherInfo.windStatus}
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
                {weatherInfo.humidity}
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
                {weatherInfo.visibilityInMiles.toFixed(1)}{" "}
                <span className="text-5xl font-medium">miles</span>
              </p>
            </article>
            <article className="flex flex-col items-center bg-blue-1 w-full p-6">
              <p className="text-base font-medium pb-2">Air Pressure</p>
              <p className="text-6xl font-bold">
                {weatherInfo.airPressure}{" "}
                <span className="text-5xl font-medium">mb</span>
              </p>
            </article>
          </div>
        </section>
        <footer className="text-sm font-medium text-center p-8">
          created by Omar Milansu Osorio -{" "}
          <a href="https://devchallenges.io/">devChallenges.io</a>
        </footer>
      </section>
    </main>
  );
}

export default App;
