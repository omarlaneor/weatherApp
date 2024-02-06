import React, { useState } from "react";

const Temperature = () => {
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
  };

  return (
    <div className="absolute flex flex-row right-28 p-6">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-black font-bold mr-2 cursor-pointer transition ${
          selectedUnit === "C" ? "bg-white" : "bg-[#585676]"
        }`}
        onClick={() => handleUnitClick("C")}
      >
        °C
      </div>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-black font-bold cursor-pointer transition ${
          selectedUnit === "F" ? "bg-white" : "bg-[#585676]"
        }`}
        onClick={() => handleUnitClick("F")}
      >
        °F
      </div>
    </div>
  );
};

export default Temperature;
