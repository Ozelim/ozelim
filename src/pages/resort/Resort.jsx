import React from 'react'
import { ResortSlider } from './ui/ResortSlider'
import { ResortDetails } from './ui/ResortDetails'

export const Resort = () => {
  return (
    <div className='w-full'>
      <div className="container">
        <div className='relative rounded-primary overflow-hidden space-y-2 pb-4'>
          <h1 className=" text-4xl mb-2">Lorem ipsum dolor sit.</h1>
          <p>Lorem, ipsum dolor.</p>
          <div className='grid grid-cols-1 md:grid-cols-[60%_auto] border-gray-100 border-solid border-2 w-full rounded-primary'>
            <ResortSlider/>
            <ResortDetails/>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}
