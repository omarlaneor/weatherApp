import React, { useState, useEffect } from "react";
import { ExitIcon, RightIcon, SearchIcon } from "./Icons";
import { getPlacesFromLocalStorage } from "../utils/storage";

const SearchModal = ({ showModal, onClose, inputSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [place, setPlaces] = useState(null);
  const [searchPlace, setSearchPlace] = useState("");

  const toggleMenu = () => {
    if (isMenuOpen) {
      document.body.classList.remove("no-scrollbar");
    } else {
      document.body.classList.add("no-scrollbar");
    }
    setIsMenuOpen((prev) => !prev);
  };

  const selectAndClose = (place) => {
    inputSearch(place);
    toggleMenu();
  };

  const search = (e) => {
    e.preventDefault();
    inputSearch(searchPlace);
  };

  useEffect(() => {
    setPlaces(getPlacesFromLocalStorage());
  }, []);

  return (
    <header className="bg-blue-1">
      <div className="py-6 px-4">
        <button className="bg-gray-3 py-3 px-5" onClick={toggleMenu}>
          Search For Places
        </button>
      </div>
      <nav
        className={`${
          isMenuOpen ? "fixed" : "hidden"
        } p-3 bg-blue-1 top-0 left-0 right-0 bottom-0 justify-center text-center z-50 no-scrollbar items-center overflow-auto`}
      >
        <button className="p-4 flex ml-auto" onClick={toggleMenu}>
          <ExitIcon />
        </button>
      </nav>
    </header>
  );
};

export default SearchModal;
