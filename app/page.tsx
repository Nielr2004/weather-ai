'use client';

import { useState, Suspense, useEffect } from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { HourlyForecast } from '@/components/ui/HourlyForecast';
import { MainDisplay } from '@/components/ui/MainDisplay';
import { DetailGrid } from '@/components/ui/DetailGrid';
import { AnimatedWeatherBackground } from '@/components/ui/AnimatedWeatherBackground';

interface WeatherData {
  location: { name: string; country: string; };
  current: {
    temperature_c: number;
    weather_code: number;
    weather_text: string;
    wind_kph: number;
    humidity: number;
    uv: number;
    is_day: number;
    air_quality?: { "us-epa-index": number };
  };
  forecast: {
    maxtemp_c: number;
    mintemp_c: number;
    sunrise: string;
    sunset: string;
    hourly: { time: string; temp_c: number; icon_url: string; }[];
  };
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Let's search for a default city on load, like your local city.
    handleSearch("Jorhat");
  }, []);

  const handleSearch = async (city: string) => {
    // ## FIX 1: Add a guard clause to prevent empty searches ##
    if (!city || city.trim() === "") {
      setError('Please enter a city name to search.');
      return;
    }

    setLoading(true); 
    setWeatherData(null); 
    setError(null);

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      
      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ error: "An unknown API error occurred." }));
        throw new Error(errorBody.error || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setWeatherData(data);

    } catch (err: any) { 
      setError(err.message); 
    } 
    finally { setLoading(false); }
  };

  return (
    <main className="relative w-screen h-screen overflow-y-auto font-sans">
      <AnimatedWeatherBackground 
        code={weatherData?.current.weather_code} 
        is_day={weatherData?.current.is_day} 
      />
      
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-8 space-y-8">
        <SearchBar onSearch={handleSearch} loading={loading} />

        {loading && <p className="text-white text-center pt-20 text-lg">Summoning the weather spirits...</p>}
        {error && <p className="text-red-300 bg-red-900/50 p-4 rounded-lg text-center pt-4">{error}</p>}
        
        {weatherData && (
          <div className="space-y-8 animate-in fade-in duration-1000">
            <MainDisplay data={weatherData} />
            
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-4">
              <p className="text-white/70 text-sm font-bold uppercase tracking-wider mb-2 px-2">Hourly Forecast</p>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {weatherData.forecast.hourly.map((hour) => (
                  <HourlyForecast key={hour.time} time={hour.time} temp={hour.temp_c} icon={hour.icon_url} />
                ))}
              </div>
            </div>
            
            <DetailGrid data={{
              wind_kph: weatherData.current.wind_kph,
              humidity: weatherData.current.humidity,
              uv: weatherData.current.uv,
              sunrise: weatherData.forecast.sunrise,
              sunset: weatherData.forecast.sunset,
              air_quality: weatherData.current.air_quality,
            }} />
          </div>
        )}
      </div>
    </main>
  );
}