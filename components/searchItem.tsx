import { City } from "../types";
import useCities from "../utils/useCities";

interface Props {
  city: City;
  onItemClick: () => void;
}

const SearchItem = ({ city, onItemClick }: Props) => {
  const cities = useCities();
  const handleClick = () => {
    cities.add(city);
    onItemClick();
  };
  const cityAdded = () => {
    let contains = false;
    cities.cities.forEach((e) => {
      if (e === city) contains = true;
    });
    return contains;
  };
  return (
    <div
      className={
        cityAdded()
          ? "bg-sky-800 text-white border-b-2 border-x-2 first-of-type:-mt-2 first-of-type:pt-3 last-of-type:rounded-b-lg py-1 px-2 cursor-pointer relative group"
          : " bg-white  border-b-2 border-x-2 first-of-type:-mt-2 first-of-type:pt-3 last-of-type:rounded-b-lg py-1 px-2 cursor-pointer hover:bg-slate-100 relative group"
      }
      onClick={handleClick}
    >
      {cityAdded() ? (
        <></>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-black absolute top-0 right-0 mx-4 mt-7 group-first-of-type:mt-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      )}
      {city.name}
      <div className="text-sm">
        Długość: {city.coord.lon.toString().slice(0, 5)}° <br />
        Szerokość: {city.coord.lat.toString().slice(0, 5)}°
      </div>
    </div>
  );
};

export default SearchItem;
