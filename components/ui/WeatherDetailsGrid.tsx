import { Thermometer, Sun, Wind, Droplets } from 'lucide-react';
import { ReactNode } from 'react';

interface WeatherDetailsProps {
  feelsLike: number;
  windSpeed: number;
  humidity: number;
  uvIndex: number;
}

const DetailItem = ({ icon, title, value }: { icon: ReactNode; title: string; value: string }) => (
  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
    <div className="text-white/70">{icon}</div>
    <div>
      <p className="text-sm text-white/70">{title}</p>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  </div>
);

export function WeatherDetailsGrid({ data }: { data: WeatherDetailsProps }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <DetailItem icon={<Thermometer size={24} />} title="Feels Like" value={`${Math.round(data.feelsLike)}°`} />
      <DetailItem icon={<Wind size={24} />} title="Wind Speed" value={`${data.windSpeed} km/h`} />
      <DetailItem icon={<Droplets size={24} />} title="Humidity" value={`${data.humidity}%`} />
      <DetailItem icon={<Sun size={24} />} title="UV Index" value={String(data.uvIndex)} />
    </div>
  );
}