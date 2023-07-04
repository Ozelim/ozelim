import React from 'react'

import { FcInfo } from 'react-icons/fc'

export const NewFormat = () => {
  return (
    <div className='w-full'>
      <div className="container">
        <div className='w-full'>
          <h1 className='heading'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className='text mt-6'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ad neque nemo delectus commodi porro expedita distinctio vero aut placeat.
          </p>
          <div className='grid grid-cols-3 gap-4 mt-8'>
            <div className='space-y-4'>
              <FcInfo className='text-5xl'/>
              <h3 className='text-xl font-semibold'>Lorem, ipsum.</h3>
              <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, deleniti dolorem! Iure officiis voluptatum perspiciatis aspernatur? Eligendi, quia.</p>
            </div>
            <div className='space-y-4'>
              <FcInfo className='text-5xl'/>
              <h3 className='text-xl font-semibold'>Lorem, ipsum.</h3>
              <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, deleniti dolorem! Iure officiis voluptatum perspiciatis aspernatur? Eligendi, quia.</p>
            </div>
            <div className='space-y-4'>
              <FcInfo className='text-5xl'/>
              <h3 className='text-xl font-semibold'>Lorem, ipsum.</h3>
              <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, deleniti dolorem! Iure officiis voluptatum perspiciatis aspernatur? Eligendi, quia.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
