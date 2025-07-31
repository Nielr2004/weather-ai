interface WeatherDisplayCardProps {
  location: {
    name: string;
  };
  current: {
    temperature_c: number;
    weather_text: string;
    icon_url: string;
  };
  forecast: {
    maxtemp_c: number;
    mintemp_c: number;
  };
}

export function WeatherDisplayCard({ data }: { data: WeatherDisplayCardProps }) {
  return (
    <div className="cardContainer">
      <div className="card">
        <p className="city">{data.location.name.toUpperCase()}</p>
        <p className="weatherText">{data.current.weather_text.toUpperCase()}</p>
        
        {/* We use an img tag now for the weather icon URL */}
        <img 
          src={data.current.icon_url} 
          alt={data.current.weather_text} 
          width="50" 
          height="50" 
        />
        
        <p className="temp">{Math.round(data.current.temperature_c)}°</p>
        
        <div className="minmaxContainer">
          <div className="min">
            <p className="minHeading">Min</p>
            <p className="minTemp">{Math.round(data.forecast.mintemp_c)}°</p>
          </div>
          <div className="max">
            <p className="maxHeading">Max</p>
            <p className="maxTemp">{Math.round(data.forecast.maxtemp_c)}°</p>
          </div>
        </div>
      </div>
    </div>
  );
}