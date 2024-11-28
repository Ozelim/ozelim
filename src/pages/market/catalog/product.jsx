import { Button, Text } from '@mantine/core'
import React from 'react'

export const Product = () => {
  return (
    <div className='flex flex-col shadow-lg border p-2 h-min'>
      <div className=''>
        <img 
          src="https://people.com/thmb/NDasPbZOWfpi2vryTpDta_MJwIY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(602x285:604x287)/newjeans-111023-1-c7ed1acdd72e4f2eb527cc38144aa2d4.jpg" 
          alt="" 
          className='aspect-square object-cover'
        />
        <Text className='mt-3' lineClamp={2}>Lorem ipsum dolor sit amet.</Text>
        <Text className='mt-2 !text-[15px]' lineClamp={3}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio, fuga.</Text>
        <p className='mt-2 font-bold '>10 000 ₸</p>
      </div>
      <Button
        fullWidth
        className='mt-3 flex-shrink'
      >
        В корзину
      </Button>
    </div>
  )
}
