interface MainDisplayProps {
  location: { name: string; country: string; };
  current: { temperature_c: number; weather_text: string; };
  forecast: { maxtemp_c: number; mintemp_c: number; };
}

export function MainDisplay({ data }: { data: MainDisplayProps }) {
  return (
    <div className="flex flex-col items-center text-white text-center">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-wider">{data.location.name}</h1>
      <p className="text-white/70">{data.location.country}</p>
      <p className="text-7xl sm:text-8xl font-extrabold my-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
        {Math.round(data.current.temperature_c)}°
      </p>
      <p className="font-bold text-lg">{data.current.weather_text}</p>
      <p className="text-white/70">
        H: {Math.round(data.forecast.maxtemp_c)}° / L: {Math.round(data.forecast.mintemp_c)}°
      </p>
    </div>
  );
}