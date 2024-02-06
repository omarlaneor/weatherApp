import React from "react";

const WeatherCard = ({ place }) => {
  return (
    <div className="bg-[#1E213A] text-center mt-20 p-2 h-[177px] w-[100px] text-white rounded-md ml-5 mr-5">
      <h2 className="text-sm font-semibold">{place.name}</h2>
      <img
        src={place.image}
        alt={place.name}
        className="w-full h-[60px] object-cover mt-2 mb-0 rounded-md"
      />
      <p className="text-xs">{place.temperature} °C</p>
    </div>
  );
};

export default WeatherCard;
