import React from "react";

const Highlights = () => {
  return (
    <div className="mt-8 text-center">
      <h2 className="text-xl text-white font-semibold mt-2 mb-6 text-left ml-16">
        Today's Highlights'
      </h2>
      <div className="flex justify-center items-center">
        <div className="bg-[#1E213A] text-center mr-10 p-4 h-[204px] w-[38%] text-white rounded-md">
          <h3 className="text-md font-semibold mb-2 mt-6">Wind Status</h3>
          <p className="text-5xl font-bold mb-2">7mph</p>
          <p className="text-md">Direction: N</p>
        </div>

        <div className="bg-[#1E213A] text-center p-4 h-[204px] w-[38%] text-white rounded-md">
          <h3 className="text-md font-semibold mb-2 mt-6">Humidity</h3>
          <p className="text-5xl font-bold mb-2">84%</p>
          <div className="relative w-full h-2 bg-[#E7E7EB] rounded-md">
            <div
              className="absolute top-0 left-0 h-2 bg-[#FFEC65] rounded-md"
              style={{ width: "84%" }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-8">
        <div className="bg-[#1E213A] text-center mr-10 p-4 h-[159px] w-[38%] text-white rounded-md">
          <h3 className="text-md font-semibold mb-2 mt-4">Visibility</h3>
          <p className="text-5xl font-bold mb-2">6,4 miles</p>
        </div>

        <div className="bg-[#1E213A] text-center p-4 h-[159px] w-[38%] text-white rounded-md">
          <h3 className="text-md font-semibold mb-2 mt-4">Air Pressure</h3>
          <p className="text-5xl font-bold mb-2">998 mb</p>
        </div>
      </div>
      <div>
        <p className="text-white mt-10">
          Created by Omar Jr. Osorio - devChallenges.io
        </p>
      </div>
    </div>
  );
};

export default Highlights;
