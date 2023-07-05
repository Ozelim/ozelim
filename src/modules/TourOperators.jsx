import React from 'react'
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'

export const TourOperators = () => {
  const [embla, setEmbla] = React.useState(null)

  const autoplay = React.useRef(Autoplay({ delay: 2000 }))

  useAnimationOffsetEffect(embla, 200)

  return (

    <div className="relative rounded-primary overflow-hidden space-y-2 shadow pb-4">
      <h1 className='text-center text-4xl mb-5'>Туроператоры</h1>
      <Carousel
        slideSize={'25%'}
        loop
        align={'start'}
        withControls={false}
        slideGap={20}
        w={'100%'}
        getEmblaApi={setEmbla}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
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
      <div className="flex justify-center">
        <button className="text-2xl">{`>`}</button>
      </div>
    </div>
  )
}
