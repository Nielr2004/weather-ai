interface HourlyForecastProps {
  time: string;
  temp: number;
  icon: string;
}

export function HourlyForecast({ time, temp, icon }: HourlyForecastProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white/10 rounded-lg backdrop-blur-md border border-white/20 flex-shrink-0 w-24">
      <p className="text-sm text-white/80">{time}</p>
      <img src={icon} alt="weather icon" width={40} height={40} />
      <p className="text-lg font-bold text-white">{Math.round(temp)}°</p>
    </div>
  );
}