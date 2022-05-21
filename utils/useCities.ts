import create from "zustand";

interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}

interface CitiesState {
  cities: City[];
  add: (city: City) => void;
  remove: (city: City) => void;
}

export const useCities = create<CitiesState>((set) => ({
  cities: [],
  add: (city) =>
    set((state) => {
      const unique = !state.cities.some((e) => e.id === city.id);
      if (unique) {
        localStorage.setItem(
          "cities",
          JSON.stringify([...state.cities.map((e) => e.id), city.id])
        );
        return { cities: [...state.cities, city] };
      } else return { cities: state.cities };
    }),
  remove: (city) =>
    set((state) => {
      const filteredCities = state.cities.filter((e) => {
        return e !== city;
      });

      if (filteredCities.length > 0)
        localStorage.setItem(
          "cities",
          JSON.stringify(filteredCities.map((e) => e.id))
        );
      else localStorage.removeItem("cities");
      return {
        cities: filteredCities,
      };
    }),
}));

export default useCities;
