import React from 'react'
import { FcInfo } from 'react-icons/fc'

export const JobTeachPractice = () => {
  return (
    <div className='w-full'>
      <div className="container">
        <div className="grid grid-cols-3 gap-8">
          <div className='border-4 border-primary-500 p-6 rounded-primary'>
            <div className='grid grid-cols-[25%_1fr] items-center'>
              <FcInfo className='text-7xl'/>
              <h3 className='text-3xl font-medium font-head'>Lorem, ipsum dolor.</h3>
            </div>
            <p className='text mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium est beatae ad fugiat aperiam quisquam illo, eligendi dolorem nesciunt quo?</p>
          </div>
          <div className='border-4 border-primary-500 p-6 rounded-primary'>
            <div className='grid grid-cols-[25%_1fr] items-center'>
              <FcInfo className='text-7xl'/>
              <h3 className='text-3xl font-medium font-head'>Lorem, ipsum dolor.</h3>
            </div>
            <p className='text mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium est beatae ad fugiat aperiam quisquam illo, eligendi dolorem nesciunt quo?</p>
          </div>
          <div className='border-4 border-primary-500 p-6 rounded-primary'>
            <div className='grid grid-cols-[25%_1fr] items-center'>
              <FcInfo className='text-7xl'/>
              <h3 className='text-3xl font-medium font-head'>Lorem, ipsum dolor.</h3>
            </div>
            <p className='text mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium est beatae ad fugiat aperiam quisquam illo, eligendi dolorem nesciunt quo?</p>
          </div>
        </div>
      </div>
    </div>
  )
}
