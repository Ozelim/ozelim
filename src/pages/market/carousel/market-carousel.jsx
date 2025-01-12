import React from 'react'
import { Carousel } from '@mantine/carousel'

import q from 'shared/assets/images/dual/1.png'
import w from 'shared/assets/images/dual/2.jpg'
import e from 'shared/assets/images/dual/3.jpg'

const array = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCtyCd0PDZzNCZ49xSe1ioZFzaNkuQ0J7E_w&s',
  'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV53Gedj3kBD5aPBivZCiPrqUlH3nSmt4-oDknVdqOKSjYLGzmJIhnyomoSd6lOf5DykA&usqp=CAU',
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
