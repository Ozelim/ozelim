import React from 'react'
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { getImageUrl } from 'shared/lib'

export const TourOperators = ({ slider }) => {
  const [embla, setEmbla] = React.useState(null)

  const autoplay = React.useRef(Autoplay({ delay: 2000 }))

  useAnimationOffsetEffect(embla, 200)

  return (
    <div className="w-full">
      <div className="container">
        <div className="overflow-hidden">
          <div className="max-w-full">
            <div className="relative mt-6 space-y-2 shadow pb-4">
              <Carousel
                slideSize={'25%'}
                align={'start'}
                height={250}
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
                          <img src={slider?.[0]} alt="" />
                        </div>
                      </Carousel.Slide>
                    )
                  })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
