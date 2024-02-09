import React from "react";

function ForecastDisplay({ forecastData, keys }) {
  return (
    <section className="p-8 md:p-0 md:pb-12 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-7">
      {keys.slice(0, 5).map((day) => {
        const minTemp = Math.floor(forecastData[day].minTemp);
        const maxTemp = Math.floor(forecastData[day].maxTemp);
        const weather = forecastData[day].weather;
        return (
          <article
            className="flex flex-col items-center bg-blue-1 py-8 px-2 m-auto"
            key={day}
          >
            <p className="text-base font-normal pb-4">{day}</p>
            <img
              className="w-12 pb-8"
              src={`/${weather}.png`}
              alt={`/${weather}.png`}
            />
            <div className="flex gap-8">
              <span>{maxTemp}°C</span>
              <span className="text-gray-2">{minTemp}°C</span>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default ForecastDisplay;
