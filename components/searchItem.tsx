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
  return (
    <div
      className="bg-white border-b-2 border-x-2 first-of-type:-mt-2 first-of-type:pt-3 last-of-type:rounded-b-lg py-1 px-2 cursor-pointer hover:bg-slate-100 relative group"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-black absolute top-0 right-0 m-4 group-first-of-type:mt-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      {city.name} <br /> {city.coord.lon} {city.coord.lat}
    </div>
  );
};

export default SearchItem;
