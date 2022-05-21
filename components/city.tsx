import { useEffect, useState } from "react";
import useCities from "../utils/useCities";
import { City } from "../types";
import Details from "./details";

interface Props {
  city: City;
}

const City = ({ city }: Props) => {
  const [cityName, setCityName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [details, setDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const cities = useCities();

  const getWeather = async () => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${process.env.API_KEY}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCityName(data.name);
        setTemperature(data.main.temp);
        setHumidity(data.main.humidity);
      });
      setLoading(false);
  };

  const handleClick = () => {
    cities.remove(city);
  };

  const handleButtonClick = () => {
    setDetails(!details);
  };

  useEffect(() => {
    getWeather();
    const weatherInterval = setInterval(() => getWeather(), 60000);
    return () => {
      clearInterval(weatherInterval);
    };
  });

  return (
    <>
      {details ? <Details cityId={city.id} closeFunc={handleButtonClick}/> : <></>}
      {loading ? <></> :  <div className="basis-1/3 h-46 border-2 shadow-lg border-black text-center bg-slate-100 flex flex-col relative text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute right-0 top-0 text-white m-2 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={handleClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <div className="bg-sky-800 text-white py-2 px-4">{cityName}</div>
        <div className="flex justify-center text-xl py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
          {Math.round(Number(temperature) - 272)} ℃
        </div>
        <div className="text-lg py-3">Wilgotność: {humidity} %</div>
        <button
          className="block border-2 border-sky-800 rounded-lg bg-sky-800 py-2 px-4 w-4/5 mx-auto mb-4 text-white hover:bg-sky-600"
          onClick={handleButtonClick}
        >
          Szczegóły
        </button>
      </div>}
      
    </>
  );
};

export default City;
