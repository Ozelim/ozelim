import React from 'react'
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { FcInfo } from 'react-icons/fc'

export const Currort = () => {
  const [embla, setEmbla] = React.useState(null)

  const autoplay = React.useRef(Autoplay({ delay: 2000 }))

  useAnimationOffsetEffect(embla, 200)

  return (
    <div className="relative rounded-primary overflow-hidden space-y-2 pb-4">
      <h1 className=" text-4xl mb-2">Lorem ipsum dolor sit.</h1>
      <p>Lorem, ipsum dolor.</p>
      <div className=" flex border-gray-100 border-solid  border-2 w-full">
        <div></div>
        <Carousel
          slideSize={'100%'}
          loop
          align={'start'}
          w={'70%'}
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
        <div className="p-5 w-[30%]">
          <h2 className="text-2xl font-bold mb-3">Информация о туре</h2>
          <div>
            Дата тура: <b>13.07 по 21.07</b>
          </div>
          <div>
            Длительность: <b>7 ночей в POOL VIEW ROOM</b>
          </div>
          <div>
            Питание <b>Все включено</b>
          </div>
          <div>
            Туристы <b>1 взрослый</b>
          </div>
          <div>
            Перелет: <b>включен</b>
          </div>
          <div className="flex items-center">
            <FcInfo />
            <div className="ml-2">
              13 июля, чт <b>из Алматы</b>
            </div>
          </div>
          <div className="flex items-center">
            <FcInfo />
            <div className="ml-2">
              20 июля, чт <b>из Египта</b>
            </div>
          </div>
          <hr className="mt-5" />
          <div className="mt-2 mb-1">Цена за 1 чел, в номере для двоих</div>
          <span className="text-3xl font-bold">282 349 тг</span>
          <button className="outline-none bg-orange-500 py-2 px-6 text-white block w-full mt-3">
            Отправить заявку
          </button>
          <hr className="mt-5" />
          <div>Уточнить детали тура</div>
          <div className="flex items-center mt-3">
            <FcInfo className="w-10 h-10" />
            <div className="ml-4">
              <a href="#" className="text-orange-500">
                +7 (775)096-78-78
              </a>
              <div>Алматы, Ул чайковского, 192</div>
              <a href="#" className="text-orange-500">
                Подробнее
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
