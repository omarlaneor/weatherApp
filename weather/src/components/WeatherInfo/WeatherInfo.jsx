const WeatherInfo = ({ image, temperature, description, date }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
      <img
        src={image}
        alt="Pronóstico"
        className="w-26 h-26 mx-auto mb-6 mt-32"
      />

      <p className="text-6xl mt-28 mb-10">{temperature}°</p>

      <p className="text-sm mb-48">{description}</p>

      <p className="text-xs mb-8">{date}</p>

      <div className="flex items-center justify-center">
        <img
          src="location.svg"
          alt="Icono de ubicación"
          className="w-4 h-4 mr-1"
        />
        <p className="text-xs">{selectedCity.name}</p>
      </div>
    </div>
  );
};

export default WeatherInfo;
