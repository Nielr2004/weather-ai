'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { CurrentWeatherDisplay } from '@/components/ui/CurrentWeatherDisplay';
import { InfoCard } from '@/components/ui/InfoCard';
import { HourlyPill } from '@/components/ui/HourlyPill';
import { DailyForecastRow } from '@/components/ui/DailyForecastRow';
import { WeatherDetailsGrid } from '@/components/ui/WeatherDetailsGrid';

interface WeatherData {
  location: { name: string; country: string; };
  current: {
    temp_c: number;
    condition_text: string;
    feelslike_c: number;
    wind_kph: number;
    humidity: number;
    uv: number;
  };
  forecast: {
    daily: { date: string; maxtemp_c: number; mintemp_c: number; icon_url: string; }[];
    hourly: { time: string; temp_c: number; icon_url: string; }[];
  };
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleSearch("Guwahati");
  }, []);

  const handleSearch = async (city: string) => {
    if (!city || city.trim() === "") {
      setError('Please enter a city name.');
      return;
    }
    setLoading(true); setWeatherData(null); setError(null);
    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-y-auto p-4 sm:p-6">
      <div className="aurora-background" />
      
      <div className="w-full max-w-lg mx-auto space-y-6">
        <SearchBar onSearch={handleSearch} loading={loading} />

        {loading && <p className="text-white text-center pt-20 text-lg animate-pulse">Fetching the skies...</p>}
        {error && <p className="text-red-300 bg-red-900/50 p-4 rounded-lg text-center">{error}</p>}
        
        {weatherData && (
          <div className="space-y-6 animate-in fade-in duration-700">
            <CurrentWeatherDisplay data={{
              location: weatherData.location.name,
              temp: weatherData.current.temp_c,
              condition: weatherData.current.condition_text,
              high: weatherData.forecast.daily[0].maxtemp_c,
              low: weatherData.forecast.daily[0].mintemp_c,
            }} />
            
            <InfoCard title="Today's Details">
                <WeatherDetailsGrid data={{
                    feelsLike: weatherData.current.feelslike_c,
                    windSpeed: weatherData.current.wind_kph,
                    humidity: weatherData.current.humidity,
                    uvIndex: weatherData.current.uv,
                }} />
            </InfoCard>

            <InfoCard title="Hourly Forecast">
              <div className="flex justify-between overflow-x-auto py-2">
                {weatherData.forecast.hourly.map((hour) => (
                  <HourlyPill key={hour.time} time={hour.time} temp={hour.temp_c} icon={hour.icon_url} />
                ))}
              </div>
            </InfoCard>

            <InfoCard title="7-Day Forecast">
                {weatherData.forecast.daily.map((day) => (
                    <DailyForecastRow 
                        key={day.date}
                        day={day.date}
                        icon={day.icon_url}
                        high={day.maxtemp_c}
                        low={day.mintemp_c}
                    />
                ))}
            </InfoCard>
          </div>
        )}
      </div>
    </main>
  );
}