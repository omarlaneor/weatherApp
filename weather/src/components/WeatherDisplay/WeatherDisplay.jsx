import React from "react";
import { LocationIcon, SignalIcon } from "../Icons/Icons"; // Ajusta la ruta según la estructura de tu proyecto

const WeatherDisplay = ({ weatherData, coords }) => {
  return (
    <article className="px-4 py-20 bg-blue-1 h-screen ">
      <button
        className="absolute top-6 right-4 bg-gray-3 rounded-full p-3 "
        onClick={coords}
      >
        <SignalIcon />
      </button>
      <div className="flex flex-col items-center">
        <img
          className="w-36"
          src={`/${weatherData.weather}.png`}
          alt={`/${weatherData.weather}`}
        />
        <p className="text-[144px] font-medium">
          {weatherData.temp}
          <span className="text-gray-2 text-5xl">°C</span>
        </p>
        <p className="text-gray-2 text-4xl font-semibold pb-12">
          {weatherData.weather}
        </p>
        <div className="flex gap-6 text-gray-2 text-lg font-medium pb-14 mt-24">
          <span>Today</span>
          <span>-</span>
          <span>{weatherData.dateFormat}</span>
        </div>
        <div className="flex gap-3">
          <LocationIcon />
          <p className="text-gray-2 text-lg font-semibold">
            {weatherData.locationName}
          </p>
        </div>
      </div>
    </article>
  );
};

export default WeatherDisplay;
