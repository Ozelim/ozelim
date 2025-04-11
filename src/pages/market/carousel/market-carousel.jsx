import React from 'react'
import { Carousel } from '@mantine/carousel'
import { pb } from 'shared/api'
import { getImageUrl } from 'shared/lib'
import { formatNumber } from 'shared/lib'
import { Button } from '@mantine/core'

async function getSlides() {
  const STORAGE_KEY = 'market_slider'
  const EXPIRATION_TIME = 24 * 60 * 60 * 1000

  const cachedData = localStorage.getItem(STORAGE_KEY)

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData)
    const now = new Date().getTime()

    if (now - timestamp < EXPIRATION_TIME) {
      return data
    }
  }

  const slides = await pb.collection('market_slider').getFullList()

  const cacheData = {
    data: slides,
    timestamp: new Date().getTime(),
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cacheData))
  return slides
}

export const MarketCarousel = () => {
  const [slides, setSlides] = React.useState([])

  React.useEffect(() => {
    getSlides().then((res) => setSlides(res))
  }, [])

  return (
    <div className="p-4">
      <Carousel className="w-full h-full" withIndicators loop>
        {slides.map((q, i) => {
          return (
            <Carousel.Slide key={i}>
              <img
                src={getImageUrl(q, q.image)}
                alt=""
                className="h-full w-full aspect-video max-w-full mx-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10 space-y-3">
                {/* <p className="text-3xl font-bold">{q.name}</p> */}
                {/* <p>{q.description}</p> */}
                {/* <p className="text-xl">{formatNumber(q.price)} ₸</p> */}
                <Button
                  size="md"
                  variant="gradient"
                  className="w-fit"
                  gradient={{ from: 'teal', to: 'skyblue' }}
                >
                  Подробнее
                </Button>
              </div>
            </Carousel.Slide>
          )
        })}
      </Carousel>
    </div>
  )
}
