interface DailyForecastRowProps {
  day: string;
  icon: string;
  high: number;
  low: number;
}

export function DailyForecastRow({ day, icon, high, low }: DailyForecastRowProps) {
  return (
    <div className="flex items-center justify-between text-white py-2 border-b border-white/10">
      <p className="w-1/3 font-medium">{day}</p>
      <img src={icon} alt="weather icon" width={32} height={32} />
      <div className="w-1/3 flex justify-end gap-4">
        <p className="font-bold">{Math.round(high)}°</p>
        <p className="text-white/60">{Math.round(low)}°</p>
      </div>
    </div>
  );
}