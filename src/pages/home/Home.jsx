import React from 'react'
import { Franchise } from 'modules/Franchise'
import { Quiz } from 'modules/Quiz'
import { ResortCard } from 'entities/resort'
import { pb } from 'shared/api'
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { Results } from 'modules/Results'
import { Parasha } from './Parasha'
import { useLangContext } from 'app/langContext'

async function getResorts() {
  return await pb.collection('resorts').getFullList({
    filter: `status = 'good'`,
  })
}

export const Home = () => {

  const {kz} = useLangContext()

  const [resorts, setResorts] = React.useState([])

  React.useEffect(() => {
    getResorts().then((res) => setResorts(res))
    .catch(err => {
      console.log(err, 'err');
    })
  }, [])

  const [embla, setEmbla] = React.useState(null)

  const autoplay = React.useRef(Autoplay({ delay: 2000 }))

  useAnimationOffsetEffect(embla, 200)

  return (
    <>
      <div className="space-y-8">
        <Franchise />
        <Results/>
        <Quiz />
        <div className="w-full">
          <div className="container">
            <div className="w-full">
              <h1 className="text-center head text-primary-500">
                {kz ? `Курортар` : `Курортные зоны`}
              </h1>
              <div className=" mt-6">
                <div className="max-w-xs lg:max-w-full overflow-hidden lg:mx-0 mx-auto">
                  <Carousel
                    slideSize={'25%'}
                    align={'start'}
                    height={'100%'}
                    loop
                    withControls={false}
                    getEmblaApi={setEmbla}
                    plugins={[autoplay.current]}
                    onMouseEnter={autoplay.current.stop}
                    onMouseLeave={autoplay.current.reset}
                  >
                    {resorts
                      .map((resort, i) => {
                        return (
                          <div className='py-4 px-2 shrink-0 max-w-[315px]' key={i} >
                            <ResortCard resort={resort}  />
                          </div>
                        )
                      })
                    }
                  </Carousel>
                </div>
              </div>
              <Parasha/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
