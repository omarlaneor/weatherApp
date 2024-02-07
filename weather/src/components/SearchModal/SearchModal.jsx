import React, { useState, useEffect } from "react";

const SearchModal = ({ showModal, onClose, onSelectCity }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      const apiKey = "bdb1b19748308daf15192f6310a6eead";
      const apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${searchTerm}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const cityList = data.list.map((city) => city.name);
        setCities(cityList);
      } catch (error) {
        console.error("Error fetching city data", error);
      }
    };

    if (searchTerm.length > 2) {
      fetchCities();
    } else {
      setCities([]);
    }
  }, [searchTerm]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    onSelectCity(city); // Esto es opcional, depende de cómo quieras manejar la selección en App
    onClose();
  };

  return (
    <>
      {showModal && (
        <div className="fixed left-28 top-0 bottom-0 bg-[#6b76d400] bg-opacity-80 flex items-center justify-center">
          <div className="bg-[#1E213A] p-8 w-[334px] h-[800px]">
            <div className="flex justify-end">
              <button
                className="text-white text-2xl cursor-pointer"
                onClick={onClose}
              >
                &times;
              </button>
            </div>
            <input
              type="text"
              placeholder="Search Location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[70%] mr-2 p-2 mt-4 bg-[#1E213A] text-white border border-[#616475]"
            />
            <div className="mt-4">
              <select
                className="bg-[#1E213A] border border-[#616475] text-white p-3 w-full mt-10"
                onChange={(e) => handleCitySelect(e.target.value)}
              >
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
