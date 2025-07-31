// Maps WeatherAPI codes to a simplified condition string
const getWeatherCondition = (code: number, is_day: number): string => {
  if (code === 1000) return is_day ? 'sunny' : 'clear_night';
  if ([1003, 1006, 1009, 1030].includes(code)) return 'cloudy';
  if (code >= 1150 && code <= 1201) return 'rainy';
  if (code >= 1204 && code <= 1237) return 'snowy';
  if (code >= 1273 && code <= 1282) return 'stormy';
  return 'default';
};

export function AnimatedWeatherBackground({ code, is_day }: { code: number | undefined; is_day: number | undefined }) {
  if (code === undefined || is_day === undefined) {
    return <div className="background default"></div>;
  }

  const condition = getWeatherCondition(code, is_day);

  return (
    <div className={`background ${condition}`}>
      {condition === 'sunny' && <div className="sun"></div>}
      {condition === 'clear_night' && (
        <>
          <div className="moon"></div>
          <div className="stars"></div>
          <div className="twinkling"></div>
        </>
      )}
      {condition === 'cloudy' && (
        <>
          <div className="clouds cloud1"></div>
          <div className="clouds cloud2"></div>
          <div className="clouds cloud3"></div>
        </>
      )}
      {condition === 'rainy' && <div className="rain"></div>}
      {condition === 'snowy' && <div className="snow"></div>}
      {condition === 'stormy' && <div className="storm"></div>}
    </div>
  );
}