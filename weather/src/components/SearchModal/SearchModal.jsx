import React, { useState } from "react";
import { ExitIcon, SearchIcon } from "../Icons/Icons";

const SearchModal = ({ inputSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchPlace, setSearchPlace] = useState("");

  const toggleMenu = () => {
    if (isMenuOpen) {
      document.body.classList.remove("no-scrollbar");
    } else {
      document.body.classList.add("no-scrollbar");
    }
    setIsMenuOpen((prev) => !prev);
  };

  const search = (e) => {
    e.preventDefault();
    inputSearch(searchPlace);
    toggleMenu();
  };

  return (
    <header className="bg-blue-1">
      <div className="py-6 px-4">
        <button className="bg-gray-3 py-3 px-10" onClick={toggleMenu}>
          Search For Places
        </button>
      </div>
      <nav
        className={`${
          isMenuOpen ? "fixed" : "hidden"
        } p-3 bg-blue-1 top-0 left-0 right-3/4 bottom-0 justify-center text-center z-50 no-scrollbar items-center overflow-auto`}
      >
        <button className="mt-4 mb-2p-2 flex ml-auto" onClick={toggleMenu}>
          <ExitIcon />
        </button>
        <form className="mt-6 flex gap-2" onSubmit={search}>
          <div className="pl-3 gap-3 flex items-center p-1 border w-full border-gray-1">
            <SearchIcon />
            <input
              className="bg-transparent w-full py-2 focus:outline-none"
              placeholder="Type the place..."
              type="text"
              value={searchPlace}
              onChange={(event) => setSearchPlace(event.target.value)}
            />
          </div>
          <button className="bg-[#3C47E9] px-4 py-4" type="submit">
            Search
          </button>
        </form>
      </nav>
    </header>
  );
};

export default SearchModal;
