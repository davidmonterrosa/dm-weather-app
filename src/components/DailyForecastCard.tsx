import React from 'react'
import { Card } from './ui/card'


interface ForecastProps {
    day: string,
    image: string,
    description: string,
    high: string,
    low: string
}

const DailyForecastCard = (props: ForecastProps) => {
  return (
    <Card className='flex-col bg-[#00000066] border-none text-white text-center px-2.5 py-4'>
        <div className='pb-10'>
            <p className='text-2xl'>{props.day}</p>
        </div>
        <div className='flex-col pb-10 place-items-center'>
            <img src={props.image} alt="weather icon" />
            <p className='text-2xl'>{props.description}</p>
        </div>
        <div className='flex justify-between'>
            <div className='flex-col '>
                <p className='text-2xl'>High</p>
                <p className='text-[2rem]'>{props.high}</p>
            </div>
            <div className='flex-col '>
                <p className='text-2xl'>Low</p>
                <p className='text-[2rem]'>{props.low}</p>
            </div>
        </div>

    </Card>
  )
}

export default DailyForecastCard