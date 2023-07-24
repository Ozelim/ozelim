import { Button } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import React from 'react'

const url =
  'https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252_640.jpg'

export const CourseUsefulFor = () => {
  const matches = useMediaQuery(`(max-width: 1100px)`)

  return (
    <div className="w-full">
      <div className="container">
        {matches ? (
          <div className="grid grid-cols-1">
            <h1 className="heading">Lorem ipsum dolor sit amet consectetur.</h1>
            <div className="grid grid-cols-2 grid-rows-3 gap-3 md:gap-4 mt-6">
              <img
                src={url}
                alt=""
                className="row-span-2 w-full h-full rounded-primary"
              />
              <img src={url} alt="" className="rounded-primary" />
              <img
                src={url}
                alt=""
                className="row-span-2 w-full h-full rounded-primary"
              />
              <img src={url} alt="" className="rounded-primary" />
            </div>
            <ul className="space-y-4 mt-6">
              {Array(6)
                .fill(1)
                .map((_, i) => {
                  return (
                    <li key={i} className="flex gap-4">
                      <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                      <p className="text">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Nostrum voluptatibus accusamus modi voluptatum quo
                        dolor.
                      </p>
                    </li>
                  )
                })}
            </ul>
          </div>
        ) : (
          <div className="grid grid-cols-2 max-h-[500] mt-16 gap-10">
            <div className="grid grid-cols-2 gap-6">
              <img
                src="https://www.poehalisnami.ua/images/education/gallery/unsplash_1.jpg"
                alt=""
                className="row-span-2 w-full  rounded-primary"
              />
              <img
                src="https://www.poehalisnami.ua/images/education/gallery/unsplash_2.jpg"
                alt=""
                className="rounded-primary w-full"
              />
              <img
                src="https://www.poehalisnami.ua/images/education/gallery/unsplash_4.jpg"
                alt=""
                className="row-span-2 w-full rounded-primary"
              />
              <img
                src="https://www.poehalisnami.ua/images/education/gallery/unsplash_3.jpg"
                alt=""
                className="rounded-primary w-full "
              />
            </div>
            <div>
              <h1 className="heading">Наши курсы будут полезны тем, кто</h1>
              <ul className="space-y-4 mt-8">
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-xl">
                    Планирует поменять сферу деятельности
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-xl">
                    Хочет работать в туристической отрасли
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-xl">
                    Увлекается географией и мечтает превратить свое хобби в
                    основной источник дохода
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-xl">
                    Много путешествует и желает узнать «всю кухню»
                    туристического бизнеса изнутри
                  </p>
                </li>
              </ul>
              <div className="mt-6">
                <Button size="lg">Записаться на курс</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
