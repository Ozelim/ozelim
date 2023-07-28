import React from 'react'
import { Carousel } from '@mantine/carousel'

const url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6ASgww6U-3j7J9vAuSrrDJzQ47xMcGAEMRyvXCbzxJqTT3p_FaMhWVUstxMGfMTHmXzo&usqp=CAU'

export const ResortSlider = () => {

  // const autoplay = React.useRef(Autoplay({ delay: 2000 }))

  return (
    <div className='w-full'>
      <Carousel
        slideSize={'100%'}
        loop
        align={'start'}
        w={'100%'}
        // plugins={[autoplay.current]}
        // onMouseEnter={autoplay.current.stop}
        // onMouseLeave={autoplay.current.reset}
      >
        {Array(10)
          .fill(1)
          .map((img, i) => {
            return (
              <Carousel.Slide key={i} className={`relative `}>
                <div
                  className={
                    'flex justify-center items-center aspect-video object-cover w-full h-full text-3xl bg-slate-200'
                  }
                >
                  {i + 1}
                </div>
              </Carousel.Slide>
            )
          })}
      </Carousel>
      <div className='flex overflow-x-auto gap-1 mt-1'>
        {Array(6).fill(1).map((_, i) => {
          return (
            <img key={i} src={url} alt="" />
          )
        })}
      </div>
    </div>
  )
}
