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

  const handleClick = () => {
    const filteredCities = (data as Array<City>).filter(
      (val) => val.name.toLowerCase() === searchText.toLowerCase()
    );
    if (filteredCities.length > 0) setCities(filteredCities);
    else setError("Nie znaleziono miasta.");
  };

  const handleItemClick = () => {
    setCities([]);
    setError("");
    setSearchText("")
  };

  return (
    <div className="w-4/5 max-w-5xl mx-auto relative z-10">
      <input
        type="text"
        className="block border-2 rounded-lg w-full px-2 py-2 relative z-10"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Backspace") {
            setCities([]);
            setError("");
          } else if (e.key === "Enter") handleClick();
        }}
        value={searchText}
        placeholder="Wpisz nazwę miasta..."
      />
      <div className="absolute w-full">
        {cities.map((city, i) => {
          return (
            <SearchItem key={i} city={city} onItemClick={handleItemClick} />
          );
        })}
      </div>
      <div className="text-red-500 h-6">{error}</div>
      <button
        onClick={handleClick}
        className="block border-2 border-sky-800 rounded-lg bg-sky-800 py-2 px-4 w-full mt-4 text-white hover:bg-sky-600"
      >
        Szukaj
      </button>
    </div>
  );
};

export default SearchBar;
