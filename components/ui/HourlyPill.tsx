interface HourlyPillProps {
  time: string;
  icon: string;
  temp: number;
}

export function HourlyPill({ time, icon, temp }: HourlyPillProps) {
  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0 text-white p-2">
      <p className="text-sm font-medium text-white/80">{time}</p>
      <img src={icon} alt="weather icon" width={32} height={32} />
      <p className="text-xl font-bold">{Math.round(temp)}°</p>
    </div>
  );
}