"use client"
import React, {useEffect, useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import DailyForecastCard from './DailyForecastCard'
import { getFiveDayForecast, getWeatherData } from '@/services/weather-services'
import { getFromLocalStorage, saveToLocalStorage, removeFromLocalStorage } from '@/services/local-storage'
import { CurrentWeather } from '@/interfaces/current-weather-interface'
import { ForecastData } from '@/interfaces/forecast-interface'

const WeatherDisplayArea = () => {
    const today = new Date();
    const dayOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [startIndex, setStartIndex] = useState<number>(0);
    const [apiSearchString, setApiSearchString] = useState<string>("stockton, us");
    const [isFavorited, setIsFavorited] = useState<boolean>(false);
    const [favoritesListArr, setFavoritesListArr] = useState<string[]>([]);
    const [fiveDayForcast, setFiveDayForecast] = useState<ForecastData>({
        cod: "",
        message: 0,
        cnt: 0,
        list: [],
        city: {
            id: 0,
            name: "",
            coord: {
                lat: 0,
                lon: 0
            },
            country: "",
            population: 0,
            timezone: 0,
            sunrise: 0,
            sunset: 0,
        }
    });
    const [currentWeatherData, setCurrentWeatherData] = useState<CurrentWeather>({
        coord: {
            lon: 0,
            lat: 0,
        },
        weather: [],
        base: "",
        main: {
            temp: 0,
            feels_like: 0,
            temp_min: 0,
            temp_max: 0,
            pressure: 0,
            humidity: 0,
            sea_level: 0,
            grnd_level: 0,
        },
        visibility: 0,
        wind: {
            speed: 0,
            deg: 0,
            gust: 0,
        },
        rain: {
            "1h": 0,
        },
        clouds: {
            all: 0,
        },
        dt: 0,
        sys: {
            type: 0,
            id: 0,
            country: "",
            sunrise: 0,
            sunset: 0,
        },
        timezone: 0,
        id: 0,
        name: "",
        cod: 0
    });
    const getforecastStartIndex = (data: ForecastData) => {
        for (let i: number = 0; i < data.list.length; i++) {
            if (data.list[i].dt_txt.includes("00:00:00")) {
                setStartIndex(i);
            }
        }
        setStartIndex(0);
    }

    const getForcastWeatherIcon = (data: ForecastData, indexValue: number) => {
        if(data.list.length != 0) {
            const endIndex: number = indexValue + 8;
            let topOfIconHierarchy: string = "00d";
            const iconArray: string[] = [];
            for (let i: number = indexValue; i < endIndex; i++) {
                if (data.list[i].weather[0].icon == "50d" || data.list[i].weather[0].icon == "50n") {
                    iconArray.push("05d");
                } else {
                    iconArray.push(data.list[i].weather[0].icon);
                }
            }
            for (let j = 0; j < iconArray.length; j++) {
                if (topOfIconHierarchy.localeCompare(iconArray[j]) == -1) {
                    topOfIconHierarchy = iconArray[j];
                }
            }
            return `https://openweathermap.org/img/wn/${topOfIconHierarchy}@2x.png`;
        }
        return "https://openweathermap.org/img/wn/00d@2x.png";
    }

    const getForcastDescription = (data: ForecastData, indexValue: number) => {
        if(data.list.length != 0) {
            const endIndex: number = indexValue + 8;
            const descriptionArray: string[] = [];
            for (let i: number = indexValue; i < endIndex; i++) {
                descriptionArray.push(data.list[i].weather[0].description);
            }
    
            return descriptionArray[4];
        }
        return "Description Unavailable";
    }
    

    const getMaxTemp = (data: ForecastData, indexValue: number) => {
        let maxTemp: number = -150;
        if(data.list.length != 0) {
            const endIndex: number = indexValue + 8;
            for (let i: number = indexValue; i < endIndex; i++) {
                if (data.list.length !=0 && data.list[i].main.temp_max > maxTemp) {
                    maxTemp = Math.round(data.list[i].main.temp_max);
                }
            }
            return `${maxTemp}°`;
        }
        return `${maxTemp}°`;
    }

    const getMinTemp = (data: ForecastData, indexValue: number) => {
        let minTemp: number = 150;
        if(data.list.length != 0) {
            const endIndex: number = indexValue + 8;
            for (let i: number = indexValue; i < endIndex; i++) {
                if (data.list.length != 0 && data.list[i].main.temp_min < minTemp) {
                    minTemp = Math.round(data.list[i].main.temp_min);
                }
            }
            return `${minTemp}°`;
        }
        return `${minTemp}°`;
    }
    
    const searchOnClick = async () => {
        const locationInput: string = apiSearchString.toLowerCase().trim();
        const handle: string[] = locationInput.split(',');
        const tempArr: string[] = [];
        let tempString: string = "";
        for (let j: number = 0; j < handle[0].length; j++) {
            if (handle[0].charAt(j) == ' ') {
                tempString += '+';
            } else {
                tempString += handle[0].charAt(j);
            }
        }
        tempArr.push(tempString);
        tempString = "";
        for (let i: number = 1; i < handle.length; i++) {
            for (let k: number = 0; k < handle[i].length; k++) {
                if (handle[i].charAt(k) == ' ') {
                    tempString += '';
                } else {
                    tempString += handle[i].charAt(k);
                }
            }
            tempArr.push(tempString);
            tempString = "";
        }
        setApiSearchString(tempArr.join(","));
        console.log(isFavorited);
        console.log(apiSearchString);
        getFiveDayForecast(apiSearchString);
        setCurrentWeatherData(await getWeatherData(apiSearchString));
    
    }

    // const displayFavorites = (favorites: string[]) => {
    //     favorites.map(city => {
            
    //     });
    // }

    const addToFavoritesOnClick = () => {
        setIsFavorited(!isFavorited);
        console.log(isFavorited);
        if (isFavorited) {
            saveToLocalStorage(currentWeatherData.name);
            setFavoritesListArr(getFromLocalStorage());
            console.log(favoritesListArr)
        } else {
            removeFromLocalStorage(currentWeatherData.name);
            setFavoritesListArr(getFromLocalStorage());
            console.log(favoritesListArr)
        }
    
    }
    useEffect( () => {
        const fetchWeatherData = async () => {
            setFavoritesListArr(getFromLocalStorage());
            setCurrentWeatherData(await getWeatherData("Stockton"));
            setFiveDayForecast(await getFiveDayForecast("Stockton"));
            // displayFavorites(favoritesListArr);
        }
        fetchWeatherData();
    }, [])

    useEffect(() => {
        if(favoritesListArr.includes(apiSearchString)){
            setIsFavorited(true);
        } else {
            setIsFavorited(false);
        }
    }, [currentWeatherData])

    useEffect(() => {
        getforecastStartIndex(fiveDayForcast);
        getMaxTemp(fiveDayForcast, startIndex);
        getMinTemp(fiveDayForcast, startIndex);
        getForcastWeatherIcon(fiveDayForcast, startIndex);
        getForcastDescription(fiveDayForcast, startIndex);
    }, [fiveDayForcast])

  return (
    <main className='grid grid-cols-1 grid-rows-7 gap-4 mx-3 py-3 md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-8 lg:col-span-10 lg:row-span-6 lg:gap-5'>
        <section className='grid row-start-1 row-span-2 gap-4 md:col-span-2 lg:col-start-2 lg:row-start-2 lg:col-span-10 lg:row-span-3 lg:gap-5'>
            <Card className='grid row-start-1 md:col-start-1 lg:row-start-2 lg:col-span-6 bg-[#00000066] border-none text-white py-4 px-5'>
                <div className='flex justify-between'>
                    <p className='text-2xl'>{`Today is: ${today.toLocaleDateString()}`}</p>
                    <Button className='bg-transparent hover:bg-[#FFFFFF40] hover:cursor-pointer' onClick={addToFavoritesOnClick}>
                        {
                            favoritesListArr.includes(currentWeatherData.name) ?
                                <img id='addFavoriteIcon' src="/heartFilled.png" alt="Favorite Icon" />
                            :
                                <img id='addFavoriteIcon' src="/heartEmpty.png" alt="Favorite Icon" />
                        }
                    </Button>
                </div>
                <div className='text-center'>
                    <h2 className='text-5xl'>{currentWeatherData.name}</h2>
                </div>
                <div className='flex justify-evenly'>
                    <div className='flex-col w-[9.375rem]'>
                        {
                            currentWeatherData.weather.length == 0 ?
                            <>
                                <img src={`https://openweathermap.org/img/wn/10d@2x.png`} alt="Weather Icon" />
                                <p className='text-2xl'>Description</p>
                            </>
                            :
                            <>
                                <img src={`https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`} alt="Weather Icon" />
                                <p className='text-2xl'>{currentWeatherData.weather[0].description}</p>
                            </>
                        }
                    </div>
                    <div className='flex-col w-[9.375rem]'>
                        <div className='text-center'>
                            <p className='text-2xl'>Current</p>
                            <h1 className='text-6xl'>
                                {
                                    currentWeatherData.weather.length != 0 ?
                                    `${Math.round(currentWeatherData.main.temp)}°`
                                    :
                                    0
                                }
                            </h1>
                        </div>
                        <div className='flex justify-between'>
                            <div className='text-center'>
                                <p className='text-2xl'>High</p>
                                <p className='text-[2rem]'>{`${Math.round(currentWeatherData.main.temp_max)}°`}</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-2xl'>Low</p>
                                <p className='text-[2rem]'>{`${Math.round(currentWeatherData.main.temp_min)}°`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className='grid row-start-2 md:col-start-2 md:row-start-1 lg:row-start-2 lg:col-span-4 bg-[#00000066] border-none py-0'>
                <div className='w-full max-h-16 bg-[#D9D9D9] rounded-t-xl'>
                    <div className='flex justify-between'>
                        <Input placeholder='Search for a city' onChange={(event) => setApiSearchString(event.target.value)}/>
                        <Button className='bg-transparent hover:bg-[#FFFFFF40] hover:cursor-pointer' onClick={searchOnClick}>
                            <img src="/searchIcon.png" alt="search icon" />
                        </Button>
                    </div>
                </div>
                <div className='flex-col'>
                    {
                        favoritesListArr.length > 0 ?
                        favoritesListArr.map((city, index) => (
                            <div className='flex justify-between mx-4' key={index}>
                                <div className='text-white'>
                                    <p>{city}</p>
                                </div>
                                <Button className='bg-transparent hover:bg-[#FFFFFF40] hover:cursor-pointer' onClick={addToFavoritesOnClick}>
                                    <img src="/heartFilled.png" alt="Heart icon" />
                                </Button>
                            </div>
                        ))
                        :
                        null
                    }
                </div>

            </Card>
        </section>
        <section className='grid row-start-3 row-span-5 md:col-span-2 gap-4 lg:col-start-2 lg:row-start-5 lg:col-span-10 lg:row-span-3 lg:gap-5'>
            <div className='grid lg:col-start-1 lg:col-span-2'> 
                <DailyForecastCard day={dayOfTheWeek[(today.getDay()) % 7]} image={currentWeatherData.weather.length != 0 ? `https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png` : "https://openweathermap.org/img/wn/00d@2x.png"} description={currentWeatherData.weather.length != 0 ? currentWeatherData.weather[0].description : "Error"} high={getMaxTemp(fiveDayForcast, startIndex)} low={getMinTemp(fiveDayForcast, startIndex)}   /> 
            </div>

            <div className='grid md:col-start-2 lg:col-start-3 lg:col-span-2'> 
                <DailyForecastCard day={dayOfTheWeek[(today.getDay() + 1) % 7]} image={getForcastWeatherIcon(fiveDayForcast, startIndex)} description={getForcastDescription(fiveDayForcast, startIndex)} high={getMaxTemp(fiveDayForcast, startIndex)} low={getMinTemp(fiveDayForcast, startIndex)}  /> 
            </div>

            <div className='grid lg:col-start-5 lg:col-span-2'> 
                <DailyForecastCard day={dayOfTheWeek[(today.getDay() + 2) % 7]} image={getForcastWeatherIcon(fiveDayForcast, startIndex + 8)} description={getForcastDescription(fiveDayForcast, startIndex + 8)} high={getMaxTemp(fiveDayForcast, startIndex + 8)} low={getMinTemp(fiveDayForcast, startIndex + 8)}  /> 
            </div>

            <div className='grid md:col-start-2 lg:col-start-7 lg:col-span-2'> 
                <DailyForecastCard day={dayOfTheWeek[(today.getDay() + 3) % 7]} image={getForcastWeatherIcon(fiveDayForcast, startIndex + 16)} description={getForcastDescription(fiveDayForcast, startIndex + 16)} high={getMaxTemp(fiveDayForcast, startIndex + 16)} low={getMinTemp(fiveDayForcast, startIndex + 16)} /> 
            </div>

            <div className='grid lg:col-start-9 lg:col-span-2'> 
                <DailyForecastCard day={dayOfTheWeek[(today.getDay() + 4) % 7]} image={getForcastWeatherIcon(fiveDayForcast, startIndex +24)} description={getForcastDescription(fiveDayForcast, startIndex + 24)} high={getMaxTemp(fiveDayForcast, startIndex + 24)} low={getMinTemp(fiveDayForcast, startIndex + 24)}  /> 
            </div>
        </section>
    </main>
  )
}

export default WeatherDisplayArea