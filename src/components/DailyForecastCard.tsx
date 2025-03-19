import React from 'react'
import { Card } from './ui/card'


const DailyForecastCard = () => {
  return (
    <Card className='flex-col bg-[#00000066] border-none text-white text-center px-2.5 py-4'>
        <div className='pb-10'>
            <p className='text-2xl'>Day #</p>
        </div>
        <div className='flex-col pb-10'>
            <img src="null" alt="weather icon" />
            <p className='text-2xl'>Description</p>
        </div>
        <div className='flex justify-between'>
            <div className='flex-col '>
                <p className='text-2xl'>High</p>
                <p className='text-[2rem]'>0</p>
            </div>
            <div className='flex-col '>
                <p className='text-2xl'>Low</p>
                <p className='text-[2rem]'>0</p>
            </div>
        </div>

    </Card>
  )
}

export default DailyForecastCard