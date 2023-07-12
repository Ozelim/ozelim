import React from 'react'
import { FcInfo } from 'react-icons/fc'

export const TeachComfort = () => {
  return (
    <div className='w-full'>
      <div className="container">
        <div className="w-full">
          <h1 className="heading">
            Lorem, ipsum.
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5 md:mt-10">
            {Array(6).fill(1).map((_, i) => {
              return (
                <div key={i} className='bg-white p-4 rounded-primary shadow-md'>
                  <div className='border-b-4 pb-2'>
                    <FcInfo className='text-2xl'/>
                  </div>
                  <p className="text mt-2">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde at natus animi, id amet neque nostrum dolorem et ullam commodi.
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
