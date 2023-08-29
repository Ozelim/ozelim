import React from 'react'
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { getImageUrl } from 'shared/lib'

export const TourOperators = ({ images }) => {

  const [embla, setEmbla] = React.useState(null)

  const autoplay = React.useRef(Autoplay({ delay: 2000 }))

  useAnimationOffsetEffect(embla, 200)

  return (
    <div className="w-full">
      <div className="container">
        <div className="overflow-hidden grid md:grid-cols-2 lg:grid-cols-3 mt-4">
          {Array(3)
            .fill(1)
            .map((img, i) => {
              return (
                <img
                  src={getImageUrl(images, images?.[i + 2])}
                  alt=""
                  className={
                    'rounded-md flex justify-center items-center aspect-video h-60 max-w-sm mx-auto object-cover w-full h-full text-3xl bg-slate-200'
                  }
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}
