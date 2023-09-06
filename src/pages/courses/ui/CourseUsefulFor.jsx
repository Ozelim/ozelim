import React from 'react'
import { Button } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { usePageData } from 'shared/hooks'
import { getImageUrl } from 'shared/lib'
import { Image } from 'shared/ui'
import { HealthLink } from 'shared/ui/HealthLink'
import { pb } from 'shared/api'


export const CourseUsefulFor = ({type}) => {

  const matches = useMediaQuery(`(max-width: 1100px)`)

  const {headings, text, images} = usePageData('price')

  async function submit (data) {
    return await pb.collection('bids').create({
      ...data,
      type: 'price'
    })
  }
  
  return (
    <div className="w-full">
      <div className="container">
        {matches ? (
          <div className="grid grid-cols-1">
            <h1 className="heading text-teal-500">
              {headings?.[type ? 2 : 1]} 
            </h1>
            <div className="md:gap-4 mt-6">
              <Image
                record={images}
                index={type ? 2 : 1}
                className="max-w-xl mx-auto w-full h-full rounded-primary"
              />
              {/* <img
                src={getImageUrl(images, images?.[1])}
                alt=""
                className="row-span-2 w-full h-full rounded-primary"
              /> */}
            </div>
            <ul className="space-y-4 mt-6">
              {Array(5)
                .fill(1)
                .map((_, i) => {
                  return (
                    <li key={i} className="flex gap-4">
                      <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                      <p className="text">
                        {text?.[i + 4]}
                      </p>
                    </li>
                  )
                })}
            </ul>
          </div>
        ) : (
          <div className="grid grid-cols-2 mt-6 gap-10">
            <div>
              <Image
                record={images}
                index={type ? 2 : 1}
                className="w-full max-h-full rounded-primary object-cover"
              />
            </div>
            <div>
              <h1 className="heading text-teal-500">
                {headings?.[type ? 2 : 1]} asd
              </h1>
              <ul className="space-y-4 mt-8">
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-xl">
                    {text?.[type ? 5 : 1]}
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-xl">
                    {text[type ? 6 : 2]}
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-xl">
                    {text[type ? 7 : 3]}
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-xl">
                    {text[type ? 8 : 4]}
                  </p>
                </li>
              </ul>
              <div className="mt-6">
                <HealthLink 
                  onSubmit={submit} 
                  label='Заказать услугу'
                />
                {/* <Button size="lg">Записаться на курс</Button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
