import { Wind, Droplets, Sun, Sunrise, Sunset, Gauge } from 'lucide-react';

interface DetailGridProps {
  wind_kph: number;
  humidity: number;
  uv: number;
  sunrise: string;
  sunset: string;
  // ## FIX: Mark air_quality as potentially undefined ##
  air_quality?: { "us-epa-index": number }; 
}

const aqiMap: { [key: number]: string } = {
  1: "Good", 2: "Moderate", 3: "Unhealthy for Sensitive", 4: "Unhealthy", 5: "Very Unhealthy", 6: "Hazardous"
};

export function DetailGrid({ data }: { data: DetailGridProps }) {
  // ## FIX: Use optional chaining (?.) and provide a fallback ##
  const aqiValue = data.air_quality ? aqiMap[data.air_quality["us-epa-index"]] : "N/A";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-white">
      <DetailItem icon={<Wind size={20} />} title="Wind Speed" value={`${data.wind_kph} km/h`} />
      <DetailItem icon={<Droplets size={20} />} title="Humidity" value={`${data.humidity}%`} />
      <DetailItem icon={<Sun size={20} />} title="UV Index" value={String(data.uv)} />
      <DetailItem icon={<Sunrise size={20} />} title="Sunrise" value={data.sunrise} />
      <DetailItem icon={<Sunset size={20} />} title="Sunset" value={data.sunset} />
      <DetailItem 
        icon={<Gauge size={20} />} 
        title="Air Quality" 
        value={aqiValue} // Use the safe value
      />
    </div>
  );
}

const DetailItem = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col justify-center">
    <div className="flex items-center gap-2 text-white/70">
      {icon}
      <p className="text-sm">{title}</p>
    </div>
    <p className="text-xl sm:text-2xl font-bold mt-2">{value}</p>
  </div>
);