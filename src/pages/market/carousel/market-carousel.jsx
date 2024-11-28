import React from 'react'
import { Carousel } from '@mantine/carousel'

import q from 'shared/assets/images/dual/1.png'
import w from 'shared/assets/images/dual/2.jpg'
import e from 'shared/assets/images/dual/3.jpg'
import r from 'shared/assets/images/dual/4.jpg'

const array = [
  q, w, e, r
]

export const MarketCarousel = () => {
  return (
    <Carousel >
      {array.map((q, i) => {
        return (
          <Carousel.Slide key={i}>
            <img src={q} alt="" className='max-h-96 aspect-video max-w-full'/>
          </Carousel.Slide>
        )
      })}
    </Carousel>
  )
}
