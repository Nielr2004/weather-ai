import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Weather API key not configured' }, { status: 500 });
  }

  if (!city) {
    return NextResponse.json({ error: 'City parameter is required' }, { status: 400 });
  }

  try {
    const weatherResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`
    );

    const data = await weatherResponse.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    // Create a new object with a consistent structure for our frontend
    const responseData = {
      location: {
        name: data.location.name,
        region: data.location.region,
        country: data.location.country,
      },
      current: {
        temperature_c: data.current.temp_c,
        apparent_temperature_c: data.current.feelslike_c,
        relative_humidity: data.current.humidity,
        wind_kph: data.current.wind_kph,
        weather_code: data.current.condition.code,
        weather_text: data.current.condition.text,
      },
    };

    return NextResponse.json(responseData);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch external API data' }, { status: 500 });
  }
}