import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured.' }, { status: 500 });
  }
  if (!city) {
    return NextResponse.json({ error: 'City parameter is required.' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || 'Failed to fetch weather data.');
    }
    const data = await response.json();

    const getDayName = (dateStr: string) => new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long' });

    const responseData = {
      location: { name: data.location.name, country: data.location.country },
      current: {
        temp_c: data.current.temp_c,
        condition_text: data.current.condition.text,
        feelslike_c: data.current.feelslike_c,
        wind_kph: data.current.wind_kph,
        humidity: data.current.humidity,
        uv: data.current.uv,
      },
      forecast: {
        daily: data.forecast.forecastday.map((day: any) => ({
            date: getDayName(day.date),
            maxtemp_c: day.day.maxtemp_c,
            mintemp_c: day.day.mintemp_c,
            icon_url: `https:${day.day.condition.icon}`
        })),
        hourly: data.forecast.forecastday[0].hour
          .slice(new Date().getHours())
          .slice(0, 8)
          .map((hour: any) => ({
            time: hour.time.substring(11, 16),
            temp_c: hour.temp_c,
            icon_url: `https:${hour.condition.icon}`
        }))
      }
    };
    return NextResponse.json(responseData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}