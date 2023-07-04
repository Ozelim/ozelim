import React from 'react'

export const CourseAbout = () => {
  return (
    <div className='w-full'>
      <div className="container">
        <div className='grid grid-cols-[30%_auto] gap-8 bg-primary-50 p-6 rounded-primary'>
          <h1 className="heading">Lorem ipsum dolor sit.</h1>
          <div className="grid grid-cols-2 gap-4">
            <ul className='space-y-4 marker:'>
              {Array(6).fill(1).map((_, i) => {
                return (
                  <li key={i} className='flex gap-4'>
                    <div className='bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0'/>
                    <p className='text'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, autem! 
                    </p>
                  </li>
                )
              })}
            </ul>

            <ul role='list' className='space-y-4 '>
              {Array(6).fill(1).map((_, i) => {
                return (
                  <li key={i} className='flex gap-4'>
                    <div className='bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0'/>
                    <p className='text'>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima velit officia odio, Lorem, ipsum dolor.
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
