import { NextPage } from "next";
import { useEffect } from "react";
import Router from "next/router";
import SearchBar from "../components/searchbar";
import useCities from "../utils/useCities";
import CityCard from "../components/city";
import Head from "next/head";

const Home: NextPage = () => {
  const cities = useCities();
  const getCitiesFromStorage = async () => {
    const storageData = localStorage.getItem("cities");
    if (storageData != null) {
      const storageCities = JSON.parse(storageData);
      storageCities.forEach(async (id: number) => {
        if (id == null || isNaN(id)) return;
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.API_KEY}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => {
            cities.add(data);
          })
          .catch((error) => console.log(error));
      });
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) Router.push("/");
    getCitiesFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    localStorage.removeItem("user");
    Router.push("/");
  };

  return (
    <>
      <Head>
        <title>Pogodeo - pogoda online</title>
        <meta name="description" content="Pogodeo" />
      </Head>
      <button
        onClick={handleClick}
        className="fixed p-3 right-0 top-0 z-40"
        aria-label="wyloguj"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </button>

      <main className=" pt-12 pb-28">
        <SearchBar />
        <div className="mt-12 flex gap-6 flex-wrap justify-evenly max-w-6xl mx-auto">
          {useCities((state) => state.cities).map((e) => {
            return <CityCard key={e.id} city={e} />;
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
