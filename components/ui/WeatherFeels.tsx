import { Droplets, Thermometer, Wind } from 'lucide-react';

interface WeatherFeelsProps {
  temp: number;
  wind: number;
  humidity: number;
}

const getFeelsLike = (temp: number, wind: number, humidity: number): string => {
  if (temp > 30 && humidity > 70) return "It's hot and humid! 🥵";
  if (temp > 25) return "Perfect t-shirt weather! 😎";
  if (temp < 10) return "Brrr! Grab a warm jacket. 🧥";
  if (wind > 20) return "It's a windy day out there! 🌬️";
  return "A lovely and pleasant day! 😊";
};

export function WeatherFeels({ data }: { data: WeatherFeelsProps }) {
  return (
    // ## ADDED: transition and hover classes ##
    <div className="bg-black/25 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-white text-center transition-transform duration-300 hover:scale-105 hover:border-white/20">
      <p className="text-2xl font-bold mb-4">{getFeelsLike(data.temp, data.wind, data.humidity)}</p>
      <div className="flex justify-around items-center">
        <div className="flex items-center gap-2">
          <Thermometer className="text-red-400" />
          <span>{Math.round(data.temp)}°</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="text-blue-300" />
          <span>{data.wind} km/h</span>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="text-sky-400" />
          <span>{data.humidity}%</span>
        </div>
      </div>
    </div>
  );
}