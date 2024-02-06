import React from "react";

const WeatherInfo = ({ image, temperature, description, date }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
      <img
        src={image}
        alt="Descripción de la imagen"
        className="w-26 h-26 mx-auto mb-6 mt-32"
      />

      <p className="text-6xl mt-28 mb-10">20°</p>

      <p className="text-sm mb-48">Shower</p>

      <p className="text-xs mb-8">{date}</p>

      <div className="flex items-center justify-center">
        <img
          src="location.svg"
          alt="Icono de ubicación"
          className="w-4 h-4 mr-1"
        />
        <p className="text-xs">City</p>
      </div>
    </div>
  );
};

export default WeatherInfo;
