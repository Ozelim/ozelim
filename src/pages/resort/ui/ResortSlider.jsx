import React from 'react'
import { Carousel } from '@mantine/carousel'
import { getImageUrl } from 'shared/lib'
import { useModals } from 'shared/hooks'
import { Image } from 'shared/ui'

export const ResortSlider = ({ resort }) => {

  // const autoplay = React.useRef(Autoplay({ delay: 2000 }))

  const { openModal } = useModals()

  function viewImage(url) {
    openModal.image({
      innerProps: {
        record: resort,
        url: url,
      },
      size: '50%',
    })
  }

  const images = Object.keys(resort)
    .filter((key) => (!isNaN(key) && resort?.[key]) )
    .map((index) => {
      return resort[index]
    })
    .slice(1)

  return (
    <div className="w-full lg:max-w-full overflow-hidden">
      <Carousel
        slideSize={'100%'}
        loop
        align={'start'}
        w={'100%'}
        // plugins={[autoplay.current]}
        // onMouseEnter={autoplay.current.stop}
        // onMouseLeave={autoplay.current.reset}
      >
        {images.map((image, i) => {
          return (
            <Carousel.Slide key={i + 10} className={`relative `}>
              <div className="bg-slate-200">
                <Image
                  record={resort}
                  index={i + 1}
                  className=" aspect-video object-cover w-full h-full"
                />
              </div>
            </Carousel.Slide>
          )
        })}
      </Carousel>
      <div className="flex overflow-x-auto gap-1 mt-1">
        {images?.map((image, i) => {
          return (
            <img
              key={i}
              src={getImageUrl(resort, image)}
              alt=""
              className=" aspect-video object-cover max-w-xs h-40"
              onClick={() => viewImage(image)}
            />
          )
        })}
      </div>
    </div>
  )
}
