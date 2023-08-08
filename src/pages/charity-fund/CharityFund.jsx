import React from 'react'
import { Button } from '@mantine/core'
import { TourOperators } from 'modules/TourOperators'
import { pb } from 'shared/api'
import { getImageUrl } from 'shared/lib'
import { ImgSkeleton } from 'shared/ui/ImgSkeleton'

async function getCharity() {
  const text = await pb
    .collection('text')
    .getFullList({ filter: `page = 'charity'` })
  const images = await pb
    .collection('images')
    .getFullList({ filter: `page = 'charity'` })
  const slider = await pb
    .collection('slider')
    .getFullList({ filter: `page = 'charity'` })
  return {
    text: text[0],
    images: images[0],
    slider: slider[0],
  }
}

export const CharityFund = () => {
  const [charity, setCharity] = React.useState({})

  const headings = charity?.text?.headings
  const text = charity?.text?.text
  const slider = charity?.slider?.image

  const images = charity?.images ?? {}

  React.useEffect(() => {
    getCharity().then((res) => {
      setCharity(res)
    })
  }, [])

  return (
    <div className="w-full">
      <div className="container">
        <section>
          <div className="flex">
            <div className="w-2/5 mt-10">
              <h1 className="text-5xl font-semibold text-[#2a2a2a] ">
                {headings?.main}
              </h1>
              <p className="mt-5 text-primary-500 text-xl font-medium">
                {headings?.submain}
              </p>
              <Button className="mt-10" size="xl">
                Подробнее
              </Button>
            </div>
            {getImageUrl(charity?.images, images?.[1]) ? (
              <img
                className="w-3/5"
                src={getImageUrl(charity?.images, images?.[1])}
                alt="kid"
              />
            ) : (
              <ImgSkeleton width="max-w-3xl" />
            )}
          </div>
        </section>
        <h1 className="text-5xl font-bold text-center mt-10 text-primary-500">
          {headings?.history}
        </h1>
        <TourOperators slider={slider} />
        <h1 className="heading mt-10 text-primary-500">{headings?.grid}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6 mt-5 md:mt-10">
          <div className="p-6 rounded-primary shadow-md bg-white">
            <h4 className="text-2xl font-semibold font-head text-[#2a2a2a]">
              {headings?.card1}
            </h4>
            <p className="paragraph mt-2">{text?.card1}</p>
          </div>
          <div className="p-6 rounded-primary shadow-md bg-white">
            <h4 className="text-2xl font-semibold font-head text-[#2a2a2a]">
              {headings?.card2}
            </h4>
            <p className="paragraph mt-2">{text?.card2}</p>
          </div>
          <div className="p-6 rounded-primary shadow-md bg-white">
            <h4 className="text-2xl font-semibold font-head text-[#2a2a2a]">
              {headings?.card3}
            </h4>
            <p className="paragraph mt-2">{text?.card3}</p>
          </div>
          <div className="p-6 rounded-primary shadow-md bg-white">
            <h4 className="text-2xl font-semibold font-head text-[#2a2a2a]">
              {headings?.card4}
            </h4>
            <p className="paragraph mt-2">{text?.card4}</p>
          </div>
        </div>
        <section className="mt-16 flex">
          {getImageUrl(charity?.images, images?.[5]) ? (
            <img
              className="w-3/5"
              src={getImageUrl(charity?.images, images?.[5])}
              alt="kid"
            />
          ) : (
            <ImgSkeleton width="max-w-3xl" />
          )}
          <div className="w-2/5 ml-10">
            <h1 className="text-3xl  font-semibold text-primary-500">
              {headings?.help}
            </h1>
            <p className="mt-2 ">{text?.help}</p>
          </div>
        </section>
      </div>
    </div>
  )
}
