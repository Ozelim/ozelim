import { Button } from '@mantine/core'
import React from 'react'

const url = 'https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252_640.jpg'

export const Franchise = () => {
  return (
    <div className="w-full">
      <div className="container">
        <div className='flex justify-between items-center bg-[#fff]  px-4 rounded-primary'>
            <div className='ml-8'>
                <div className='text-4xl text-[#424242]'>Lorem</div>
                <div className='text-4xl mt-2 text-[#424242]'>Lorem, ipsum dolor.</div>
                <p className='mt-5 text-2xl text-[#424242] '>Lorem ipsum dolor sit amet.</p>
                <Button className='mt-5'>Подробнее</Button>
            </div>
            <img src={url} alt="" className='hidden md:block' />
        </div>
      </div>
    </div>

  )
}
