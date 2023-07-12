import React from 'react'
import { FcInfo } from 'react-icons/fc'

export const JobTeachPractice = () => {
  return (
    <div className='w-full'>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className='border-2 border-primary-500 p-6 rounded-primary'>
            <div className='grid grid-cols-[25%_1fr] items-center'>
              <FcInfo className='text-6xl md:text-7xl mx-auto'/>
              <h3 className='text-2xl md:text-3xl font-medium font-head ml-4'>Lorem, ipsum dolor.</h3>
            </div>
            <p className='text mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium est beatae ad fugiat aperiam quisquam illo, eligendi dolorem nesciunt quo?</p>
          </div>
          <div className='border-2 border-primary-500 p-6 rounded-primary'>
            <div className='grid grid-cols-[25%_1fr] items-center'>
              <FcInfo className='text-6xl md:text-7xl mx-auto'/>
              <h3 className='text-2xl md:text-3xl font-medium font-head ml-4'>Lorem, ipsum dolor.</h3>
            </div>
            <p className='text mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium est beatae ad fugiat aperiam quisquam illo, eligendi dolorem nesciunt quo?</p>
          </div>
          <div className='border-2 border-primary-500 p-6 rounded-primary'>
          <div className='grid grid-cols-[25%_1fr] items-center'>
              <FcInfo className='text-6xl md:text-7xl mx-auto'/>
              <h3 className='text-2xl md:text-3xl font-medium font-head ml-4'>Lorem, ipsum dolor.</h3>
            </div>
            <p className='text mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium est beatae ad fugiat aperiam quisquam illo, eligendi dolorem nesciunt quo?</p>
          </div>
        </div>
      </div>
    </div>
  )
}
