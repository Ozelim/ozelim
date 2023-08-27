import React from 'react'
import { Button } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { usePageData } from 'shared/hooks'
import { getImageUrl } from 'shared/lib'
import { Image } from 'shared/ui'


export const CourseUsefulFor = () => {
  const matches = useMediaQuery(`(max-width: 1100px)`)

  const {headings, text, images} = usePageData('price')
  
  return (
    <div className="w-full">
      <div className="container">
        {matches ? (
          <div className="grid grid-cols-1">
            <h1 className="heading">{headings?.[1]}</h1>
            <div className="md:gap-4 mt-6">
              <Image
                record={images}
                index={1}
                className="w-full h-full rounded-primary"
              />
              {/* <img
                src={getImageUrl(images, images?.[1])}
                alt=""
                className="row-span-2 w-full h-full rounded-primary"
              /> */}
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
              <Image
                record={images}
                index={1}
                className="w-full h-full rounded-primary"
              />
            </div>
            <div>
              <h1 className="heading">
                {headings?.[1]}
              </h1>
              <ul className="space-y-4 mt-8">
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-xl">
                    {text?.[1]}
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-xl">
                    {text[2]}
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-xl">
                    {text[3]}
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-xl">
                    {text[4]}
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
