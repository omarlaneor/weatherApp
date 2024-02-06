import React from "react";

const WeatherCard = ({ place }) => {
  return (
    <div className="h-[120px] w-[120px] mt-4 mr-6">
      <div className="bg-[#1E213A] text-center p-2 h-[120px] text-white rounded-md">
        <h2 className="text-sm font-semibold">{place.name}</h2>
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-[60px] object-cover mt-2 mb-0 rounded-md"
        />
        <p className="text-xs">{place.temperature} °C</p>
      </div>
    </div>
  );
};

export default WeatherCard;
