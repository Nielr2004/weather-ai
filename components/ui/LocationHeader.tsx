import { Sun, Cloud, CloudRain } from 'lucide-react';

interface LocationHeaderProps {
  name: string;
  region: string;
  country: string;
  temp: number;
  weatherText: string;
  weatherCode: number;
}

// Maps weather codes to an icon
const getWeatherIcon = (code: number) => {
    if (code === 1000) return Sun;
    if ([1003, 1006, 1009, 1030].includes(code)) return Cloud;
    if (code >= 1150) return CloudRain;
    return Cloud;
};

export function LocationHeader(props: LocationHeaderProps) {
  const Icon = getWeatherIcon(props.weatherCode);

  return (
    <div className="w-full text-white text-center flex flex-col items-center justify-center">
      <h1 className="text-4xl sm:text-5xl font-bold">{props.name}</h1>
      <p className="text-white/70">{`${props.region}, ${props.country}`}</p>
      <div className="flex items-center justify-center gap-4 mt-4">
        <Icon className="w-16 h-16 text-yellow-300" />
        <div>
            <p className="text-6xl sm:text-7xl font-bold">{Math.round(props.temp)}°</p>
            <p className="text-white/70 -mt-2">{props.weatherText}</p>
        </div>
      </div>
    </div>
  );
}