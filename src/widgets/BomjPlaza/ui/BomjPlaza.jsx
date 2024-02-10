import React from 'react'

import { AiOutlineCheckCircle, AiOutlineInstagram, AiOutlinePhone } from 'react-icons/ai'
import { Button } from '@mantine/core'

export const BomjPlaza = ({resort}) => {

  return (
    <div className="flex justify-between items-center max-w-2xl p-2 rounded-primary w-auto bg-white" >
      <div className='flex flex-col'>
        <div className="flex gap-2 items-center font-head font-medium">
          {resort?.signed && (
            <AiOutlineCheckCircle className="text-3xl flex-shrink-0 text-primary-600" />
          )}
          {resort?.title} 
        </div>
        {/* <p className="text-sm text">
          {resort?.region}
        </p> */}
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
