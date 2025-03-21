export interface ForecastData {
    cod: string,
    message: number,
    cnt: number,
    list: List[],
    city: CityData
}

interface List {
    dt: number,
    main: Main,
    weather: Weather[],
    clouds: Cloud,
    wind: Wind,
    visibility: number,
    pop: number,
    rain: Rain,
    sys: Sys,
    dt_txt: string
}

interface Main {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    sea_level: number,
    grnd_level: number,
    humidity: number,
    temp_kf: number
}

interface Weather {
    id: number,
    main: string,
    description: string,
    icon: string
}

interface Cloud {
    all: number
}

interface Wind {
    speed: number,
    deg: number,
    gust: number
}

interface Rain {
    "3h": number
}

interface Sys {
    pod: string
}

interface CityData {
    id: number,
    name: string,
    coord: {
        lat: number,
        lon: number
    },
    country: string,
    population: number,
    timezone: number,
    sunrise: number,
    sunset: number,
}