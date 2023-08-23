import { Button } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import React from 'react'
import { getImageUrl } from 'shared/lib'

const url =
  'https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252_640.jpg'

export const CourseUsefulFor = ({price, images, text, headings}) => {
  const matches = useMediaQuery(`(max-width: 1100px)`)

  return (
    <div className="w-full">
      <div className="container">
        {matches ? (
          <div className="grid grid-cols-1">
            <h1 className="heading">Lorem ipsum dolor sit amet consectetur.</h1>
            <div className=" md:gap-4 mt-6">
              <img
                src={getImageUrl(images, images?.[1])}
                alt=""
                className="row-span-2 w-full h-full rounded-primary"
              />
     
            </div>
            <ul className="space-y-4 mt-6">
              {Array(6)
                .fill(1)
                .map((_, i) => {
                  return (
                    <li key={i} className="flex gap-4">
                      <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                      <p className="text">
                        {text?.[i]}
                      </p>
                    </li>
                  )
                })}
            </ul>
          </div>
        ) : (
          <div className="grid grid-cols-2 max-h-[500] mt-16 gap-10">
            <div className="">
              <img
                src={getImageUrl(images, images?.[1])}
                alt=""
                className="row-span-2 w-full  rounded-primary"
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
