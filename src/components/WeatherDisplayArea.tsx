"use client"
import React from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import DailyForecastCard from './DailyForecastCard'

const WeatherDisplayArea = () => {
  return (
    <main className='grid grid-cols-12 grid-rows-8 col-span-10 row-span-6 gap-5'>
        <section className='grid col-start-2 row-start-2 col-span-10 row-span-3 gap-5'>
            <Card className='grid row-start-2 col-span-6 bg-[#00000066] border-none text-white py-4 px-5'>
                <div className='flex justify-between'>
                    <p className='text-2xl'>Today is: Day, Month 1</p>
                    <img src="/heartEmpty.png" alt="Favorite Icon" />
                </div>
                <div className='text-center'>
                    <h2 className='text-5xl'>City, ST</h2>
                </div>
                <div className='flex justify-evenly'>
                    <div className='flex-col w-[9.375rem]'>
                        <img src="null" alt="Weather Icon" />
                        <p className='text-2xl'>Description</p>
                    </div>
                    <div className='flex-col w-[9.375rem]'>
                        <div className='text-center'>
                            <p className='text-2xl'>Current</p>
                            <h1 className='text-6xl'>0</h1>
                        </div>
                        <div className='flex justify-between'>
                            <div className='text-center'>
                                <p className='text-2xl'>High</p>
                                <p className='text-[2rem]'>0</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-2xl'>Low</p>
                                <p className='text-[2rem]'>0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className='grid row-start-2 col-span-4 bg-[#00000066] border-none py-0'>
                <div className='w-full max-h-16 bg-[#D9D9D9] rounded-t-xl'>
                    <div className='flex justify-between'>
                        <Input placeholder='Search for a city'/>
                        <Button className='bg-transparent hover:bg-[#FFFFFF40] hover:cursor-pointer'>
                            <img src="/searchIcon.png" alt="search icon" />
                        </Button>
                    </div>

                </div>

            </Card>
        </section>
        <section className='grid col-start-2 row-start-5 col-span-10 row-span-3 gap-5'>
            <div className='grid col-start-1 col-span-2'> 
                <DailyForecastCard /> 
            </div>

            <div className='grid col-start-3 col-span-2'> 
                <DailyForecastCard /> 
            </div>

            <div className='grid col-start-5 col-span-2'> 
                <DailyForecastCard /> 
            </div>

            <div className='grid col-start-7 col-span-2'> 
                <DailyForecastCard /> 
            </div>

            <div className='grid col-start-9 col-span-2'> 
                <DailyForecastCard /> 
            </div>

            
            
            
            
            
        </section>

    </main>
  )
}

export default WeatherDisplayArea