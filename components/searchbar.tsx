import React, { useEffect, useState } from "react";
import { City } from "../types";
import SearchItem from "./searchItem";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [cities, setCities] = useState<Array<City>>([]);
  const [error, setError] = useState("");
  const [data, setData] = useState({});

  const getData = async () => {
    await fetch("/city.list.json", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = () => {
    const filteredCities = (data as Array<City>).filter(
      (val) => val.name.toLowerCase() === searchText.toLowerCase()
    );
    if (filteredCities.length > 0) setCities(filteredCities);
    else setError("Nie znaleziono miasta.");
  };

  const handleClose = () => {
    setCities([]);
    setError("");
    setSearchText("");
  };

  return (
    <div className="w-4/5 max-w-5xl mx-auto z-10 relative">
      <input
        type="text"
        className="block border-2 rounded-lg w-full px-2 py-2 relative z-10"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
          else {
            setCities([]);
            setError("");
          }
        }}
        value={searchText}
        placeholder="Wpisz nazwę miasta..."
      />
      {cities.length ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 absolute right-4 top-2 z-50 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={handleClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <></>
      )}
      <div className="absolute w-full">
        {cities.map((city, i) => {
          return <SearchItem key={i} city={city} onItemClick={handleClose} />;
        })}
      </div>
      <div className="text-red-500 h-6">{error}</div>
      <button
        onClick={handleSubmit}
        className="block border-2 border-sky-800 rounded-lg bg-sky-800 py-2 px-4 w-full mt-4 text-white hover:bg-sky-600"
      >
        Szukaj
      </button>
    </div>
  );
};

export default SearchBar;
