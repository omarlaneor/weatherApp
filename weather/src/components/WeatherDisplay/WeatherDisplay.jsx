import React, { useEffect } from "react";
import { LocationIcon } from "../Icons/Icons";
import { getWeatherCoord, getForecastCoord } from "../../apiKey/api";

function WeatherDisplay({ weatherInfo, cords }) {
  useEffect(() => {
    getWeatherCoord(weatherInfo.lat, weatherInfo.lon).then((data) =>
      weatherInfo.changeWeather(data)
    );
    getForecastCoord(weatherInfo.lat, weatherInfo.lon).then((data) =>
      weatherInfo.changeForecast(data)
    );
  }, [weatherInfo]);

  return (
    <article className="px-4 py-20 bg-blue-1 h-screen">
      <button
        className="absolute top-6 right-4 bg-gray-3 rounded-full p-3"
        onClick={cords}
      >
        <LocationIcon />
      </button>
      <div className="flex flex-col items-center">
        <img
          className="w-36"
          src={`/${weatherInfo.weather}.png`}
          alt={`/${weatherInfo.weather}`}
        />
        <p className="text-[144px] font-medium">
          {weatherInfo.temp}
          <span className="text-gray-2 text-5xl">°C</span>
        </p>
        <p className="text-gray-2 text-4xl font-semibold pb-32">
          {weatherInfo.weather}
        </p>
        <div className="flex gap-4 text-gray-2 text-lg font-medium pb-8">
          <span>Today</span>
          <span>--</span>
          <span>{weatherInfo.dateFormat}</span>
        </div>
        <div className="flex gap-3">
          <LocationIcon />
          <p className="text-gray-2 text-lg font-semibold">
            {weatherInfo.locationName}
          </p>
        </div>
      </div>
    </article>
  );
}

export default WeatherDisplay;
