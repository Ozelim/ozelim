import { Button } from '@mantine/core'
import React from 'react'

const url = 'https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252_640.jpg'

export const CourseUsefulFor = () => {
  return (
    <div className='w-full'>
      <div className="container">
        <div className="grid grid-cols-2 gap-10">
          <div className='grid grid-cols-2 grid-rows-3 gap-6'>
            <img src={url} alt="" className='row-span-2 w-full h-full rounded-primary' />
            <img src={url} alt="" className='rounded-primary'  />
            <img src={url} alt="" className='row-span-2 w-full h-full rounded-primary' />
            <img src={url} alt="" className='rounded-primary' />
          </div>
          <div>
            <h1 className='heading'>Lorem ipsum dolor sit amet consectetur.</h1>
            <ul className='space-y-4 mt-8'>
              {Array(6).fill(1).map((_, i) => {
                return (
                  <li key={i} className='flex gap-4'>
                    <div className='bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0'/>
                    <p className='text'>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum voluptatibus accusamus modi voluptatum quo dolor.
                    </p>
                  </li>
                )
              })}
            </ul>
            <div className='mt-6'>
              <Button>
                Подробнее
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
