import { Sunset, Sunrise, Wind, Droplets, Sun } from 'lucide-react';
import { DetailWidget } from './DetailWidget';

interface WeatherDetailsProps {
  uv: number;
  wind_kph: number;
  wind_dir: string;
  humidity: number;
  sunrise: string;
  sunset: string;
}

const uvIndexMap: { [key: number]: { text: string; color: string } } = {
  1: { text: "Low", color: "bg-green-500" }, 2: { text: "Low", color: "bg-green-500" },
  3: { text: "Moderate", color: "bg-yellow-500" }, 4: { text: "Moderate", color: "bg-yellow-500" }, 5: { text: "Moderate", color: "bg-yellow-500" },
  6: { text: "High", color: "bg-orange-500" }, 7: { text: "High", color: "bg-orange-500" },
  8: { text: "Very High", color: "bg-red-500" }, 9: { text: "Very High", color: "bg-red-500" }, 10: { text: "Very High", color: "bg-red-500" },
  11: { text: "Extreme", color: "bg-purple-500" },
};

export function WeatherDetails({ data }: { data: WeatherDetailsProps }) {
  const uvInfo = uvIndexMap[Math.round(data.uv)] || { text: "Unknown", color: "bg-gray-500" };

  return (
    <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6">
      <h2 className="font-bold text-white text-lg mb-4">TODAY'S HIGHLIGHTS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DetailWidget icon={<Sun size={20} />} title="UV Index" value={data.uv}>
          <div className="w-full bg-gray-600/50 rounded-full h-2.5 mt-2">
            <div className={`${uvInfo.color} h-2.5 rounded-full`} style={{ width: `${(data.uv / 11) * 100}%` }}></div>
          </div>
          <p className="text-xs text-white/70 mt-1">{uvInfo.text}</p>
        </DetailWidget>

        <DetailWidget icon={<Wind size={20} />} title="Wind Status" value={data.wind_kph} unit="km/h">
          <p className="text-xs text-white/70 mt-2">Direction: {data.wind_dir}</p>
        </DetailWidget>

        <DetailWidget icon={<Sunrise size={20} />} title="Sunrise" value={data.sunrise} />
        <DetailWidget icon={<Sunset size={20} />} title="Sunset" value={data.sunset} />
        
        <DetailWidget icon={<Droplets size={20} />} title="Humidity" value={data.humidity} unit="%" />
      </div>
    </div>
  );
}