export interface CurrentWeather {
    coord: Coordinates,
    weather: WeatherData[],
    base: string,
    main: MainData,
    visibility: number,
    wind: WindData,
    rain: RainData,
    clouds: CloudData,
    dt: number,
    sys: SysData,
    timezone: number,
    id: number,
    name: string,
    cod: number
}

interface Coordinates {
    lon: number,
    lat: number
}

interface WeatherData {
    id: number,
    main: string,
    description: string,
    icon: string
}

interface MainData {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number
}

interface WindData {
    speed: number,
    deg: number,
    gust: number
}

interface RainData {
    "1h": number
}

interface CloudData {
    all: number
}

interface SysData {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
}                         