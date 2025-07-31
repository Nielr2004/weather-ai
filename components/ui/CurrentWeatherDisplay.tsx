interface CurrentWeatherProps {
  location: string;
  temp: number;
  condition: string;
  high: number;
  low: number;
}

export function CurrentWeatherDisplay({ data }: { data: CurrentWeatherProps }) {
  return (
    <div className="flex flex-col items-center text-center text-white animate-in fade-in duration-1000">
      <h1 className="text-4xl sm:text-5xl font-light tracking-wide">{data.location}</h1>
      <p className="text-8xl sm:text-9xl font-thin my-2">{Math.round(data.temp)}°</p>
      <p className="text-xl sm:text-2xl font-medium">{data.condition}</p>
      <p className="text-lg">
        H: {Math.round(data.high)}° L: {Math.round(data.low)}°
      </p>
    </div>
  );
}