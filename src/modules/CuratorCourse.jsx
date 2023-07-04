import React from 'react'
import { FcInfo } from 'react-icons/fc'

export const CuratorCourse = () => {
  return (
    <div className='w-full'>
      <div className="container">
        <div className="grid grid-cols-[35%_auto]">
          <div>
            <h1 className="heading">Lorem, ipsum.</h1>
            <p className="text mt-4 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
          </div>
          <div className='shadow-md p-4 rounded-primary bg-primary-50 flex gap-8'>
            <div className='aspect-square rounded-primary w-80 h-72 bg-primary-500'/>
            <div>
              <h4 className='text-2xl font-head'>Lorem, ipsum.</h4>
              <p className='mt-2 text-lg'>Lorem, ipsum dolor.</p>

              <p className="text mt-6">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio, dolorem.
              </p>
              <div className='space-y-2'>
                <div className='flex gap-2 items-center mt-4'>
                  <FcInfo className='text-2xl'/> 
                  <span className='text-lg text-primary-500'>Lorem ipsum dolor sit.</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <FcInfo className='text-2xl'/> 
                  <span className='text-lg text-primary-500'>Lorem ipsum dolor sit.</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <FcInfo className='text-2xl'/> 
                  <span className='text-lg text-primary-500'>Lorem ipsum dolor sit.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
