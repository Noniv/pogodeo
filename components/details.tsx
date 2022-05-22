import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

interface Props {
  cityId: number;
  closeFunc: () => void;
}

const Details = ({ cityId, closeFunc }: Props) => {
  const [temperatures, setTemperatures] = useState<Array<String>>([]);
  const [humidities, setHumidities] = useState<Array<String>>([]);
  const [times, setTimes] = useState<Array<String>>([]);
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getWeather = async () => {
    const temperatureList: String[] = [];
    const humiditiesList: String[] = [];
    const timesList: String[] = [];
    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${process.env.API_KEY}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        data.list.forEach(
          (
            e: { dt: number; main: { temp: String; humidity: String } },
            i: number
          ) => {
            if (i > 8) return;
            temperatureList.push((Number(e.main.temp) - 272).toString());
            humiditiesList.push(e.main.humidity);
            const time = new Date(e.dt * 1000);
            timesList.push(time.getHours().toString());
          }
        );
        setCityName(data.city.name);
        setTemperatures(temperatureList);
        setHumidities(humiditiesList);
        setTimes(timesList);
        setLoading(false);
      })
      .catch((error) => setError("Błąd"));
  };

  useEffect(() => {
    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const optionsTemperature = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Godzina",
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Temperatura w ℃",
      },
    },
  };

  const labels = times;

  const dataTemperature = {
    labels,
    datasets: [
      {
        label: "Temperatura",
        data: temperatures,
        borderColor: "rgb(7, 89, 133)",
        backgroundColor: "rgb(7, 89, 133)",
      },
    ],
  };

  const optionsHumidity = {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
      x: {
        title: {
          display: true,
          text: "Godzina",
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Wilgotność w %",
      },
    },
  };

  const dataHumidity = {
    labels,
    datasets: [
      {
        label: "Wilgotność",
        data: humidities,
        borderColor: "rgb(7, 89, 133)",
        backgroundColor: "rgb(7, 89, 133)",
      },
    ],
  };

  return (
    <section className="fixed inset-0 bg-slate-200 z-20 w-screen h-screen pt-16">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 absolute top-0 right-0 m-3 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={closeFunc}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h2 className="text-center py-4 font-bold">{cityName}</h2>
        {loading ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className=" flex flex-col m-auto h-screen max-w-2xl">
            <div className="px-4 py-8 h-[40%]">
              <Line
                options={optionsTemperature}
                data={dataTemperature}
                className="max-h-full"
              />
            </div>

            <div className="px-4 py-8 h-[40%]">
              <Line
                options={optionsHumidity}
                data={dataHumidity}
                className="max-h-full"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Details;
