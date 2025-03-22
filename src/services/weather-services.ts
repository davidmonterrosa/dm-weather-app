import { ForecastData } from "@/interfaces/forecast-interface";
import { CurrentWeather } from "@/interfaces/current-weather-interface";

const APIKEY = process.env.NEXT_PUBLIC_APIKEY;

export const getWeatherData = async (searchQuery: string) => {
    const response: Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${APIKEY}&units=imperial`);
    const data: CurrentWeather = await response.json();
    return data;
}

export const getFiveDayForecast = async (searchQuery: string) => {
    const response: Response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=${APIKEY}&units=imperial`);
    const data: ForecastData = await response.json();
    console.log(data);
    return data;
}
