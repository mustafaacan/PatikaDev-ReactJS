import cloudyImage from "../assets/cloudy.png";
import fogImage from "../assets/fog.png";
import rainyImage from "../assets/rainy.png";
import snowImage from "../assets/snow.png";
import stormImage from "../assets/storm.png";
import sunnyImage from "../assets/sunny.png";
import unknownImage from "../assets/unknown.png";
import partiallySunnyImage from "../assets/partialSunny.png";

const WEATHER_CODES = {
  CLEAR: [0, 1],
  PARTLY_CLOUDY: [2],
  CLOUDY: [3, 45, 48],
  DRIZZLE: [51, 53, 55, 56, 57],
  RAIN: [61, 63, 65, 66, 67],
  SHOWERS: [80, 81, 82],
  SNOW: [71, 73, 75, 77, 85, 86],
  THUNDERSTORM: [95, 96, 99],
};

const DISPLAY_ICONS = {
  clearDay: "☀️",
  clearNight: "🌙",
  partlyCloudyDay: "🌤️",
  partlyCloudyNight: "☁️",
  cloudy: "☁️",
  rainy: "🌧️",
  thunderRain: "⛈️",
  snowy: "❄️",
  unknown: "🌡️",
};

const WEATHER_IMAGE_BY_TYPE = {
  clearDay: sunnyImage,
  clearNight: sunnyImage,
  partlyCloudyDay: cloudyImage,
  partlyCloudyNight: cloudyImage,
  cloudy: cloudyImage,
  rainy: rainyImage,
  thunderRain: stormImage,
  snowy: snowImage,
  unknown: unknownImage,
};

function getWeatherDescription(code) {
  const descriptions = {
    0: "Clear",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",

    45: "Fog",
    48: "Rime fog",

    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",

    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",

    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",

    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",

    85: "Light snow showers",
    86: "Heavy snow showers",

    95: "Thunderstorm",
    96: "Thunderstorm with light hail",
    99: "Thunderstorm with heavy hail",
  };

  return descriptions[code] ?? "Unknown";
}

function getWeatherImage(code) {
  const descriptions = {
    0: sunnyImage,
    1: sunnyImage,
    2: partiallySunnyImage,
    3: partiallySunnyImage,

    45: fogImage,
    48: fogImage,

    51: rainyImage,
    53: rainyImage,
    55: rainyImage,
    56: rainyImage,
    57: rainyImage,

    61: rainyImage,
    63: rainyImage,
    65: rainyImage,
    66: rainyImage,
    67: rainyImage,

    71: snowImage,
    73: snowImage,
    75: snowImage,
    77: snowImage,

    80: rainyImage,
    81: rainyImage,
    82: rainyImage,

    85: snowImage,
    86: snowImage,

    95: stormImage,
    96: stormImage,
    99: stormImage,
  };

  return descriptions[code] ?? unknownImage;
}

function getWeatherImageByType(weatherType, weatherCode = null) {
  if (
    weatherCode !== null &&
    isInGroup(weatherCode, WEATHER_CODES.CLOUDY) &&
    !isInGroup(weatherCode, WEATHER_CODES.PARTLY_CLOUDY)
  ) {
    return getWeatherImage(weatherCode);
  }

  return WEATHER_IMAGE_BY_TYPE[weatherType] ?? getWeatherImage(weatherCode);
}

function isInGroup(code, group) {
  return group.includes(code);
}

function getMax(values) {
  const validValues = values.filter((value) => typeof value === "number");

  if (!validValues.length) {
    return 0;
  }

  return Math.max(...validValues);
}

function getDayName(date, timeZone = "UTC") {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone,
  }).format(new Date(`${date}T12:00:00`));
}

function getWeatherTypeFromCode(weatherCode, isDay = true) {
  if (isInGroup(weatherCode, WEATHER_CODES.CLEAR)) {
    return isDay ? "clearDay" : "clearNight";
  }

  if (isInGroup(weatherCode, WEATHER_CODES.PARTLY_CLOUDY)) {
    return isDay ? "partlyCloudyDay" : "partlyCloudyNight";
  }

  if (isInGroup(weatherCode, WEATHER_CODES.CLOUDY)) {
    return "cloudy";
  }

  if (
    isInGroup(weatherCode, WEATHER_CODES.DRIZZLE) ||
    isInGroup(weatherCode, WEATHER_CODES.RAIN) ||
    isInGroup(weatherCode, WEATHER_CODES.SHOWERS)
  ) {
    return "rainy";
  }

  if (isInGroup(weatherCode, WEATHER_CODES.SNOW)) {
    return "snowy";
  }

  if (isInGroup(weatherCode, WEATHER_CODES.THUNDERSTORM)) {
    return "thunderRain";
  }

  return "unknown";
}

function getHourlyEntriesForDate(hourly, date) {
  if (!hourly?.time?.length) {
    return [];
  }

  return hourly.time
    .map((time, index) => ({
      time,
      weatherCode: hourly.weather_code?.[index] ?? null,
      precipitationProbability:
        hourly.precipitation_probability?.[index] ?? null,
      precipitation: hourly.precipitation?.[index] ?? 0,
      rain: hourly.rain?.[index] ?? 0,
      showers: hourly.showers?.[index] ?? 0,
      snowfall: hourly.snowfall?.[index] ?? 0,
      cloudCover: hourly.cloud_cover?.[index] ?? null,
      windGust: hourly.wind_gusts_10m?.[index] ?? null,
    }))
    .filter((entry) => entry.time.startsWith(date));
}

function getDaytimeEntries(hourlyEntries) {
  const daytimeEntries = hourlyEntries.filter((entry) => {
    const hour = Number(entry.time.slice(11, 13));
    return hour >= 6 && hour <= 22;
  });

  return daytimeEntries.length ? daytimeEntries : hourlyEntries;
}

function getForecastDisplayWeather(day, hourlyEntries) {
  const entries = getDaytimeEntries(hourlyEntries);
  const hourlyCodes = entries.map((entry) => entry.weatherCode);

  const maxWindGustFromHourly = getMax(entries.map((entry) => entry.windGust));

  const dailyCode = day.weatherCode;
  const weatherType = getWeatherTypeFromCode(dailyCode, true);
  const description = getWeatherDescription(dailyCode);

  const warnings = [];

  if (hourlyCodes.some((code) => isInGroup(code, WEATHER_CODES.THUNDERSTORM))) {
    warnings.push("Thunderstorm possible");
  }

  if (
    (day.precipitationProbability ?? 0) >= 65 &&
    !isInGroup(dailyCode, WEATHER_CODES.RAIN) &&
    !isInGroup(dailyCode, WEATHER_CODES.SHOWERS) &&
    !isInGroup(dailyCode, WEATHER_CODES.THUNDERSTORM)
  ) {
    warnings.push("Rain possible later");
  }

  if ((day.maxWindGust ?? 0) >= 60 || maxWindGustFromHourly >= 60) {
    warnings.push("Strong wind possible");
  }

  return {
    weatherType,
    icon: DISPLAY_ICONS[weatherType] ?? DISPLAY_ICONS.unknown,
    imageUrl: getWeatherImageByType(weatherType, dailyCode),
    description,
    warnings,
  };
}

async function getForecast(location) {
  try {
    const dailyParams = [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "precipitation_probability_max",
      "precipitation_sum",
      "rain_sum",
      "showers_sum",
      "snowfall_sum",
      "precipitation_hours",
      "wind_speed_10m_max",
      "wind_gusts_10m_max",
    ];

    const hourlyParams = [
      "weather_code",
      "precipitation_probability",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "cloud_cover",
      "wind_gusts_10m",
    ];

    const params = new URLSearchParams({
      latitude: String(location.lat),
      longitude: String(location.lon),
      timezone: location.t,
      forecast_days: "10",
      temperature_unit: "celsius",
      wind_speed_unit: "kmh",
      precipitation_unit: "mm",
      daily: dailyParams.join(","),
      hourly: hourlyParams.join(","),
    });

    const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      return {
        forecast: [],
      };
    }

    const data = await response.json();

    const daily = data?.daily;
    const hourly = data?.hourly;

    if (!daily?.time?.length) {
      return {
        forecast: [],
      };
    }

    const forecast = daily.time.map((date, index) => {
      const day = {
        city: location.city ?? null,
        region: location.region ?? null,
        latitude: location.lat,
        longitude: location.lon,
        timezone: location.t,

        date,
        dayName: getDayName(date, location.t),

        weatherCode: daily.weather_code?.[index] ?? null,

        maxTemp: daily.temperature_2m_max?.[index] ?? null,
        minTemp: daily.temperature_2m_min?.[index] ?? null,

        apparentMaxTemp: daily.apparent_temperature_max?.[index] ?? null,
        apparentMinTemp: daily.apparent_temperature_min?.[index] ?? null,

        precipitationProbability:
          daily.precipitation_probability_max?.[index] ?? null,
        precipitationSum: daily.precipitation_sum?.[index] ?? null,
        rainSum: daily.rain_sum?.[index] ?? null,
        showersSum: daily.showers_sum?.[index] ?? null,
        snowfallSum: daily.snowfall_sum?.[index] ?? null,
        precipitationHours: daily.precipitation_hours?.[index] ?? null,

        maxWindSpeed: daily.wind_speed_10m_max?.[index] ?? null,
        maxWindGust: daily.wind_gusts_10m_max?.[index] ?? null,
      };

      const hourlyEntries = getHourlyEntriesForDate(hourly, date);
      const displayWeather = getForecastDisplayWeather(day, hourlyEntries);

      return {
        ...day,
        weatherType: displayWeather.weatherType,
        icon: displayWeather.icon,
        imageUrl: displayWeather.imageUrl,
        description: displayWeather.description,
        warnings: displayWeather.warnings,
      };
    });

    return {
      forecast,
    };
  } catch {
    return {
      forecast: [],
    };
  }
}

export default getForecast;
