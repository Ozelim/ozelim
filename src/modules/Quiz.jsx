import React from 'react'
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'

export const Quiz = () => {
  const [embla, setEmbla] = React.useState(null)

  const autoplay = React.useRef(Autoplay({ delay: 2000 }))

  useAnimationOffsetEffect(embla, 200)

  return (
    <div className="relative overflow-hidden space-y-2 pb-4">
      <h1 className="text-center text-4xl mb-2 text-green-400">
        Бесплатная помощь специалиста
      </h1>
      <p className="text-center">
        Впервые на сайте? Ответье на пару вопросов и ждите ответа
      </p>
      <Carousel
        slideSize={'100%'}
        loop
        align={'start'}
        height={300}
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
                    'flex rounded-[30px] border-2 border-solid border-black justify-center items-center aspect-video object-cover w-full h-full text-3xl '
                  }
                >
                  <div>
                    <div>1. Че у вас болит?ЖОПА? хахахаах</div>
                    <input
                      className="mt-5 rounded-primary w-full border-2 border-solid border-black"
                      type="text"
                    />
                    <button className="block bg-green-400 py-1 px-6 m-auto mt-5 text-white">
                      Далее
                    </button>
                  </div>
                </div>
              </Carousel.Slide>
            )
          })}
      </Carousel>
    </div>
  )
}
