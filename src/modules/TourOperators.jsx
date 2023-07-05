import React from 'react'
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'

export const TourOperators = () => {
  const [embla, setEmbla] = React.useState(null)

  const autoplay = React.useRef(Autoplay({ delay: 2000 }))

  useAnimationOffsetEffect(embla, 200)

  return (
    <div>
      <h1 className="text-4xl text-center text-[#2b3641]">Туроператоры</h1>
      <div className="relative mt-6  space-y-2 shadow pb-4">
        <Carousel
          slideSize={'25%'}
          align={'start'}
          height={100}
          w={'100%'}
          loop
          withControls={false}
          getEmblaApi={setEmbla}
          slideGap={'md'}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          {Array(8)
            .fill(1)
            .map((img, i) => {
              return (
                <Carousel.Slide key={i} className={`relative `}>
                  <div
                    className={
                      'rounded-md flex justify-center items-center aspect-video object-cover w-full h-full text-3xl bg-slate-200'
                    }
                  >
                    {i + 1}
                  </div>
                </Carousel.Slide>
              )
            })}
        </Carousel>
      </div>
    </div>
  )
}
