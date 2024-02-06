import React from "react";

const SearchModal = ({ showModal, onClose }) => {
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
              className="w-[70%] mr-2 p-2 mt-4 bg-[#1E213A] text-white border border-[#616475]"
            />
            <button className="bg-[#3C47E9] hover:bg-blue-600 text-white p-2 mt-4">
              Search
            </button>
            <div className="mt-4">
              <select className="bg-[#1E213A] border border-[#616475] text-white p-3 w-full mt-10">
                {/* Opciones del select */}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
