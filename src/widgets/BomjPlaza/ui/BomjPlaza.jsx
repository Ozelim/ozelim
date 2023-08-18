import React from 'react'
import { ActionIcon } from '@mantine/core'

import { AiOutlineInstagram, AiOutlinePhone } from 'react-icons/ai'
import { Button } from '@mantine/core'

export const BomjPlaza = ({resort}) => {
  return (
    <div className="flex justify-between items-center max-w-2xl shadow-md border p-4 rounded-primary w-auto bg-white" >
      <div className='flex flex-col'>
        <div className="hover:border-green-500 hover:text-green-500 transition-all border-solid rounded-md font-bold text-2xl font-head">
          {resort?.title} 
        </div>
        <p className="text-sm text">
          Г. Шымкент склад в ашибулаке {resort?.adress}
        </p>
      </div>
      <div className='flex gap-4 text-primary-500'>
        <Button variant='outline' p={8} radius={9999}>
          <AiOutlineInstagram className='text-2xl' />
        </Button>
        <Button variant='outline' p={8} radius={9999}>
          <AiOutlinePhone className='text-2xl' />
        </Button>
      </div>
    </div>
  )
}
