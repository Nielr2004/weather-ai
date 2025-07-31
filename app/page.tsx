'use client';

import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Thermometer, Wind, Droplets } from 'lucide-react';

import { SearchBar } from '@/components/ui/SearchBar';
import { WeatherScene } from '@/components/3d/WeatherScene';
import { LocationHeader } from '@/components/ui/LocationHeader';
import { WeatherWidget } from '@/components/ui/WeatherWidget';

// Define the structure of the data we expect from our API
interface WeatherData {
  location: { name: string; region: string; country: string; };
  current: {
    temperature_c: number;
    apparent_temperature_c: number;
    relative_humidity: number;
    wind_kph: number;
    weather_code: number;
    weather_text: string;
  };
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (city: string) => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }
    setLoading(true);
    setWeatherData(null);
    setError(null);

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data.');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative w-screen h-screen">
      {/* 3D Background Canvas */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Suspense fallback={<div className="w-full h-full bg-gray-900" />}>
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <WeatherScene weatherCode={weatherData?.current?.weather_code} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </Suspense>
      </div>

      {/* UI Content */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <SearchBar onSearch={handleSearch} loading={loading} />

          {loading && <p className="text-white text-center">Fetching weather...</p>}
          {error && <p className="text-red-400 text-center">{error}</p>}
          
          {weatherData && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <LocationHeader 
                name={weatherData.location.name}
                region={weatherData.location.region}
                country={weatherData.location.country}
                temp={weatherData.current.temperature_c}
                weatherText={weatherData.current.weather_text}
                weatherCode={weatherData.current.weather_code}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <WeatherWidget 
                    icon={<Thermometer size={20} />}
                    title="Feels Like"
                    value={Math.round(weatherData.current.apparent_temperature_c)}
                    unit="°C"
                />
                <WeatherWidget 
                    icon={<Wind size={20} />}
                    title="Wind Speed"
                    value={weatherData.current.wind_kph}
                    unit="km/h"
                />
                <WeatherWidget 
                    icon={<Droplets size={20} />}
                    title="Humidity"
                    value={weatherData.current.relative_humidity}
                    unit="%"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}