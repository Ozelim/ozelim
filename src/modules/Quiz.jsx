import React from 'react'
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Button, Stepper, TextInput } from '@mantine/core'

export const Quiz = () => {
  const [embla, setEmbla] = React.useState(null)

  const autoplay = React.useRef(Autoplay({ delay: 4000 }))

  useAnimationOffsetEffect(embla, 200)

  return (
    <div className="w-full bg-white">
      <div className="container">
        <div className="max-w-2xl mx-auto relative overflow-hidden space-y-2 pb-4">
          <h1 className="text-center text-4xl mb-2 text-primary-500">
            Бесплатная помощь специалиста
          </h1>
          <p className="text-center text">
            Впервые на сайте? Ответье на пару вопросов и ждите ответа специалиста
          </p>
          <Carousel
            slideSize={'100%'}
            loop
            align={'start'}
            height={200}
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
                      className={'flex rounded-primary border border-zinc-200 justify-center items-center w-full h-full'}
                    >
                      <div className='w-full p-4'>
                        <p className='text-lg text-center text'>1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nemo enim, pariatur tempora fuga harum?хахахаах</p>
                        <TextInput
                          variant='filled'
                          className="mt-5 rounded-primary w-full max-w-[300px] mx-auto"
                        />
                        <div className='flex justify-center mt-4'>
                          <Button className="">
                            Далее
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Carousel.Slide>
                )
              })}
          </Carousel>
        </div>
      </div>
    </div>
  )
}
