import React from 'react'
import { Carousel } from '@mantine/carousel'

import q from 'shared/assets/images/dual/1.png'
import w from 'shared/assets/images/dual/2.jpg'
import e from 'shared/assets/images/dual/3.jpg'

const array = [
  'https://images4.alphacoders.com/137/1373669.jpeg', 
  'https://pbs.twimg.com/media/GV4Rqt2XEAAQotY?format=jpg&name=4096x4096', 
  'https://pbs.twimg.com/media/F04xYoVaYAAmchT.jpg:large'
]

export const MarketCarousel = () => {
  return (
    <div className="p-3">
      <Carousel
        className='mx-auto'
        withControls={false}
        withIndicators
        loop
      >
        {array.map((q, i) => {
          return (
            <Carousel.Slide key={i}>
              <img src={q} alt="" className='h-[60vh] aspect-video max-w-full mx-auto'/>
            </Carousel.Slide>
          )
        })}
      </Carousel>
    </div>
  )
}
