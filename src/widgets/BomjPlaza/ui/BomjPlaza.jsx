import React from 'react'

import { AiOutlineInstagram, AiOutlinePhone } from 'react-icons/ai'
import { Button } from '@mantine/core'

export const BomjPlaza = ({resort}) => {

  return (
    <div className="flex justify-between items-center max-w-2xl shadow border p-3 rounded-primary w-auto bg-white" >
      <div className='flex flex-col'>
        <div className="hover:border-green-500 hover:text-green-500 transition-all border-solid rounded-md font-bold text-lg font-head">
          {resort?.title} 
        </div>
        <p className="text-sm text">
          {resort?.region}
        </p>
      </div>
      <div className='flex gap-4 text-primary-500'>
        {resort?.inst && (
          <Button variant='outline' p={8} radius={9999}>
            <AiOutlineInstagram className='text-2xl' />
          </Button>
        )}
        {resort?.whats && (
          <Button variant='outline' p={8} radius={9999}>
            <AiOutlinePhone className='text-2xl' />
          </Button>
        )}
      </div>
    </div>
  )
}
