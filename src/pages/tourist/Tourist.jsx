import React from 'react'
import { Accordion, Button, Modal, Portal, Select, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { pb } from 'shared/api'
import { usePageData } from 'shared/hooks'
import { Accord, Image } from 'shared/ui'
import { useLangContext } from 'app/langContext'
import { showNotification } from '@mantine/notifications'
import { Carousel } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'

import ala1 from 'shared/assets/images/almaty-09.2024/1.png'
import ala2 from 'shared/assets/images/almaty-09.2024/2.png'
import ala3 from 'shared/assets/images/almaty-09.2024/3.png'
import ala4 from 'shared/assets/images/almaty-09.2024/4.png'
import ala5 from 'shared/assets/images/almaty-09.2024/5.png'
import ala6 from 'shared/assets/images/almaty-09.2024/6.png'
import ala7 from 'shared/assets/images/almaty-09.2024/7.jpeg'
import ala8 from 'shared/assets/images/almaty-09.2024/8.jpeg'
import ala9 from 'shared/assets/images/almaty-09.2024/9.jpeg'
import ala10 from 'shared/assets/images/almaty-09.2024/10.jpeg'
import ala11 from 'shared/assets/images/almaty-09.2024/11.jpeg'
import ala12 from 'shared/assets/images/almaty-09.2024/12.jpeg'
import ala13 from 'shared/assets/images/almaty-09.2024/13.jpeg'
import ala14 from 'shared/assets/images/almaty-09.2024/14.jpeg'
import ala15 from 'shared/assets/images/almaty-09.2024/15.jpeg'
import ala16 from 'shared/assets/images/almaty-09.2024/16.jpeg'
import ala17 from 'shared/assets/images/almaty-09.2024/17.jpeg'
import ala18 from 'shared/assets/images/almaty-09.2024/18.jpeg'
import ala19 from 'shared/assets/images/almaty-09.2024/19.jpeg'
import ala20 from 'shared/assets/images/almaty-09.2024/20.jpeg'
import ala21 from 'shared/assets/images/almaty-09.2024/21.jpeg'
import ala22 from 'shared/assets/images/almaty-09.2024/22.jpeg'

import bay1 from 'shared/assets/images/bayan-06.2024/1.jpeg'
import bay2 from 'shared/assets/images/bayan-06.2024/2.jpeg'
import bay3 from 'shared/assets/images/bayan-06.2024/3.jpeg'
import bay4 from 'shared/assets/images/bayan-06.2024/4.jpeg'
import bay5 from 'shared/assets/images/bayan-06.2024/5.jpeg'
import bay6 from 'shared/assets/images/bayan-06.2024/6.jpeg'
import bay7 from 'shared/assets/images/bayan-06.2024/7.jpeg'
import bay8 from 'shared/assets/images/bayan-06.2024/8.jpeg'
import bay9 from 'shared/assets/images/bayan-06.2024/9.jpeg'
import bay10 from 'shared/assets/images/bayan-06.2024/10.jpeg'
import bay11 from 'shared/assets/images/bayan-06.2024/11.jpeg'
import bay12 from 'shared/assets/images/bayan-06.2024/12.jpeg'
import bay13 from 'shared/assets/images/bayan-06.2024/13.jpeg'
import bay14 from 'shared/assets/images/bayan-06.2024/14.jpeg'
import bay15 from 'shared/assets/images/bayan-06.2024/15.jpeg'
import bay16 from 'shared/assets/images/bayan-06.2024/16.jpeg'
import bay17 from 'shared/assets/images/bayan-06.2024/17.jpeg'
import bay18 from 'shared/assets/images/bayan-06.2024/18.jpeg'
import bay19 from 'shared/assets/images/bayan-06.2024/19.jpeg'
import bay20 from 'shared/assets/images/bayan-06.2024/20.jpeg'
import bay21 from 'shared/assets/images/bayan-06.2024/21.jpeg'
import bay22 from 'shared/assets/images/bayan-06.2024/22.jpeg'
import bay23 from 'shared/assets/images/bayan-06.2024/23.jpeg'
import bay24 from 'shared/assets/images/bayan-06.2024/24.jpeg'
import bay25 from 'shared/assets/images/bayan-06.2024/25.jpeg'
import bay26 from 'shared/assets/images/bayan-06.2024/26.jpeg'
import bay27 from 'shared/assets/images/bayan-06.2024/27.jpeg'
import bay28 from 'shared/assets/images/bayan-06.2024/28.jpeg'
import bay29 from 'shared/assets/images/bayan-06.2024/29.jpeg'
import bay30 from 'shared/assets/images/bayan-06.2024/30.jpeg'

import bar1 from 'shared/assets/images/baravoe-fubruary-2024/1.jpeg'
import bar2 from 'shared/assets/images/baravoe-fubruary-2024/2.jpeg'
import bar3 from 'shared/assets/images/baravoe-fubruary-2024/3.jpeg'
import bar4 from 'shared/assets/images/baravoe-fubruary-2024/4.jpeg'
import bar5 from 'shared/assets/images/baravoe-fubruary-2024/5.jpeg'
import bar6 from 'shared/assets/images/baravoe-fubruary-2024/6.jpeg'
import bar7 from 'shared/assets/images/baravoe-fubruary-2024/7.jpeg'
import bar8 from 'shared/assets/images/baravoe-fubruary-2024/8.jpeg'
import bar9 from 'shared/assets/images/baravoe-fubruary-2024/9.jpeg'
import bar10 from 'shared/assets/images/baravoe-fubruary-2024/10.jpeg'
import bar11 from 'shared/assets/images/baravoe-fubruary-2024/11.jpeg'
import bar12 from 'shared/assets/images/baravoe-fubruary-2024/12.jpeg'
import bar13 from 'shared/assets/images/baravoe-fubruary-2024/13.jpeg'

import char1 from 'shared/assets/images/charyn-09.2024/1.jpeg'
import char2 from 'shared/assets/images/charyn-09.2024/2.jpeg'
import char3 from 'shared/assets/images/charyn-09.2024/3.jpeg'
import char4 from 'shared/assets/images/charyn-09.2024/4.jpeg'
import char5 from 'shared/assets/images/charyn-09.2024/5.jpeg'
import char6 from 'shared/assets/images/charyn-09.2024/6.jpeg'
import char7 from 'shared/assets/images/charyn-09.2024/7.jpeg'
import char8 from 'shared/assets/images/charyn-09.2024/8.jpeg'
import char9 from 'shared/assets/images/charyn-09.2024/9.jpeg'
import char10 from 'shared/assets/images/charyn-09.2024/10.jpeg'
import char11 from 'shared/assets/images/charyn-09.2024/11.jpeg'
import char12 from 'shared/assets/images/charyn-09.2024/12.jpeg'
import char13 from 'shared/assets/images/charyn-09.2024/13.jpeg'
import char14 from 'shared/assets/images/charyn-09.2024/14.jpeg'
import char15 from 'shared/assets/images/charyn-09.2024/15.jpeg'
import char16 from 'shared/assets/images/charyn-09.2024/16.jpeg'

import fc1 from 'shared/assets/images/first-conf-Асс/1.jpg'
import fc2 from 'shared/assets/images/first-conf-Асс/2.jpg'
import fc3 from 'shared/assets/images/first-conf-Асс/3.jpg'
import fc4 from 'shared/assets/images/first-conf-Асс/4.jpg'
import fc5 from 'shared/assets/images/first-conf-Асс/5.jpg'
import fc6 from 'shared/assets/images/first-conf-Асс/6.jpg'
import fc7 from 'shared/assets/images/first-conf-Асс/7.jpg'
import fc8 from 'shared/assets/images/first-conf-Асс/8.jpg'
import fc9 from 'shared/assets/images/first-conf-Асс/9.jpg'
import fc10 from 'shared/assets/images/first-conf-Асс/10.jpg'
import fc11 from 'shared/assets/images/first-conf-Асс/11.jpg'
import fc12 from 'shared/assets/images/first-conf-Асс/12.jpg'
import fc13 from 'shared/assets/images/first-conf-Асс/13.jpg'
import fc14 from 'shared/assets/images/first-conf-Асс/14.jpg'
import fc15 from 'shared/assets/images/first-conf-Асс/15.jpg'
import fc16 from 'shared/assets/images/first-conf-Асс/16.jpg'
import fc17 from 'shared/assets/images/first-conf-Асс/17.jpg'
import fc18 from 'shared/assets/images/first-conf-Асс/18.jpg'
import fc19 from 'shared/assets/images/first-conf-Асс/19.jpg'


import fo1 from 'shared/assets/images/food-festival-10.2024/1.jpeg'
import fo2 from 'shared/assets/images/food-festival-10.2024/2.jpeg'
import fo3 from 'shared/assets/images/food-festival-10.2024/3.jpeg'
import fo4 from 'shared/assets/images/food-festival-10.2024/4.jpeg'
import fo5 from 'shared/assets/images/food-festival-10.2024/5.jpeg'
import fo6 from 'shared/assets/images/food-festival-10.2024/6.jpeg'
import fo7 from 'shared/assets/images/food-festival-10.2024/7.jpeg'
import fo8 from 'shared/assets/images/food-festival-10.2024/8.jpeg'
import fo9 from 'shared/assets/images/food-festival-10.2024/9.jpeg'
import fo10 from 'shared/assets/images/food-festival-10.2024/10.jpeg'
import fo11 from 'shared/assets/images/food-festival-10.2024/11.jpeg'
import fo12 from 'shared/assets/images/food-festival-10.2024/12.jpeg'
import fo13 from 'shared/assets/images/food-festival-10.2024/13.jpeg'
import fo14 from 'shared/assets/images/food-festival-10.2024/14.jpeg'


import kat1 from 'shared/assets/images/katon-karagay-07.2024/1.jpeg'
import kat2 from 'shared/assets/images/katon-karagay-07.2024/2.jpeg'
import kat3 from 'shared/assets/images/katon-karagay-07.2024/3.jpeg'
import kat4 from 'shared/assets/images/katon-karagay-07.2024/4.jpeg'
import kat5 from 'shared/assets/images/katon-karagay-07.2024/5.jpeg'
import kat6 from 'shared/assets/images/katon-karagay-07.2024/6.jpeg'
import kat7 from 'shared/assets/images/katon-karagay-07.2024/7.jpeg'
import kat8 from 'shared/assets/images/katon-karagay-07.2024/8.jpeg'
import kat9 from 'shared/assets/images/katon-karagay-07.2024/9.jpeg'
import kat10 from 'shared/assets/images/katon-karagay-07.2024/10.jpeg'
import kat11 from 'shared/assets/images/katon-karagay-07.2024/11.jpeg'
import kat12 from 'shared/assets/images/katon-karagay-07.2024/12.jpeg'
import kat13 from 'shared/assets/images/katon-karagay-07.2024/13.jpeg'
import kat14 from 'shared/assets/images/katon-karagay-07.2024/14.jpeg'
import kat15 from 'shared/assets/images/katon-karagay-07.2024/15.jpeg'
import kat16 from 'shared/assets/images/katon-karagay-07.2024/16.jpeg'
import kat17 from 'shared/assets/images/katon-karagay-07.2024/17.jpeg'
import kat18 from 'shared/assets/images/katon-karagay-07.2024/18.jpeg'
import kat19 from 'shared/assets/images/katon-karagay-07.2024/19.jpeg'
import kat20 from 'shared/assets/images/katon-karagay-07.2024/20.jpeg'
import kat21 from 'shared/assets/images/katon-karagay-07.2024/21.jpeg'
import kat22 from 'shared/assets/images/katon-karagay-07.2024/22.jpeg'
import kat23 from 'shared/assets/images/katon-karagay-07.2024/23.jpeg'
import kat24 from 'shared/assets/images/katon-karagay-07.2024/24.jpeg'
import kat25 from 'shared/assets/images/katon-karagay-07.2024/25.jpeg'


import kol1 from 'shared/assets/images/kolsay-09.2024/1.jpeg'
import kol2 from 'shared/assets/images/kolsay-09.2024/2.jpeg'
import kol3 from 'shared/assets/images/kolsay-09.2024/3.jpeg'
import kol4 from 'shared/assets/images/kolsay-09.2024/4.jpeg'
import kol5 from 'shared/assets/images/kolsay-09.2024/5.jpeg'
import kol6 from 'shared/assets/images/kolsay-09.2024/6.jpeg'
import kol7 from 'shared/assets/images/kolsay-09.2024/7.jpeg'
import kol8 from 'shared/assets/images/kolsay-09.2024/8.jpeg'
import kol9 from 'shared/assets/images/kolsay-09.2024/9.jpeg'
import kol10 from 'shared/assets/images/kolsay-09.2024/10.jpeg'
import kol11 from 'shared/assets/images/kolsay-09.2024/11.jpeg'
import kol12 from 'shared/assets/images/kolsay-09.2024/12.jpeg'
import kol13 from 'shared/assets/images/kolsay-09.2024/13.jpeg'
import kol14 from 'shared/assets/images/kolsay-09.2024/14.jpeg'

import qay1 from 'shared/assets/images/qayundy-09.2024/1.jpeg'
import qay2 from 'shared/assets/images/qayundy-09.2024/2.jpeg'
import qay3 from 'shared/assets/images/qayundy-09.2024/3.jpeg'
import qay4 from 'shared/assets/images/qayundy-09.2024/4.jpeg'
import qay5 from 'shared/assets/images/qayundy-09.2024/5.jpeg'
import qay6 from 'shared/assets/images/qayundy-09.2024/6.jpeg'
import qay7 from 'shared/assets/images/qayundy-09.2024/7.jpeg'
import { Link } from 'react-router-dom'
import { getImageUrl } from 'shared/lib'

import q from 'shared/assets/images/user/1.jpeg'
import w from 'shared/assets/images/user/2.jpeg'
import e from 'shared/assets/images/user/3.jpeg'
import r from 'shared/assets/images/user/4.jpeg'
import t from 'shared/assets/images/user/5.jpeg'

async function getRights() {
  return await pb.collection('tourist_data').getFullList()
}

export const Tourist = () => {

  const { headings, text, images } = usePageData('tourist')
  const { kz } = useLangContext()

  const [opened1, handlers1] = useDisclosure()

  const [data, setData] = React.useState({
    name: '',
    phone: '',
  })

  const [types, setTypes] = React.useState([])

  const [type, setType] = React.useState('')

  const [pictures, setPictures] = React.useState('')
  const [currentPicture, setCurrentPicture] = React.useState(0)

  const pics = {
    ala: [
      ala1,
      ala2,
      ala3,
      ala4,
      ala5,
      ala6,
      ala7,
      ala8,
      ala9,
      ala10,
      ala11,
      ala12,
      ala13,
      ala14,
      ala15,
      ala16,
      ala17,
      ala18,
      ala19,
      ala20,
      ala21,
      ala22,
    ],
    bay: [
      bay1,
      bay2,
      bay3,
      bay4,
      bay5,
      bay6,
      bay7,
      bay8,
      bay9,
      bay10,
      bay11,
      bay12,
      bay13,
      bay14,
      bay15,
      bay16,
      bay17,
      bay18,
      bay19,
      bay20,
      bay21,
      bay22,
      bay23,
      bay24,
      bay25,
      bay26,
      bay27,
      bay28,
      bay29,
      bay30,
    ],

    bar: [
      bar1,
      bar2,
      bar3,
      bar4,
      bar5,
      bar6,
      bar7,
      bar8,
      bar9,
      bar10,
      bar11,
      bar12,
      bar13,
    ],
    char: [
      char1,
      char2,
      char3,
      char4,
      char5,
      char6,
      char7,
      char8,
      char9,
      char10,
      char11,
      char12,
      char13,
      char14,
      char15,
      char16,
    ],
    fc: [
      fc1,
      fc2,
      fc3,
      fc4,
      fc5,
      fc6,
      fc7,
      fc8,
      fc9,
      fc10,
      fc11,
      fc12,
      fc13,
      fc14,
      fc15,
      fc16,
      fc17,
      fc18,
      fc19,
    ],
    fo: [
      fo1,
      fo2,
      fo3,
      fo4,
      fo5,
      fo6,
      fo7,
      fo8,
      fo9,
      fo10,
      fo11,
      fo12,
      fo13,
      fo14,
    ],
    kat: [
      kat1,
      kat2,
      kat3,
      kat4,
      kat5,
      kat6,
      kat7,
      kat8,
      kat9,
      kat10,
      kat11,
      kat12,
      kat13,
      kat14,
      kat15,
      kat16,
      kat17,
      kat18,
      kat19,
      kat20,
      kat21,
      kat22,
      kat23,
      kat24,
      kat25,
    ],
    kol: [
      kol1,
      kol2,
      kol3,
      kol4,
      kol5,
      kol6,
      kol7,
      kol8,
      kol9,
      kol10,
      kol11,
      kol12,
      kol13,
      kol14,
    ],
    qay: [
      qay1,
      qay2,
      qay3,
      qay4,
      qay5,
      qay6,
      qay7,
    ]
  }

  const [modal, handlers] = useDisclosure(false)

  React.useEffect(() => {
    getRights().then((res) => {
      setTypes(res?.[0]?.types)
    })
  }, [])

  async function send() {
    await pb
      .collection('tourist_bids')
      .create({
        ...data,
        type: type,
      })
      .then((res) => {
        setData({
          name: '',
          phone: '',
        })
        setType('')
        showNotification({
          title: 'Заявка',
          color: 'green',
          message: 'Заявка успешно отправлена',
        })
        handlers1.close()
      })
  }

  const [embla, setEmbla] = React.useState(null)
  const autoplay = React.useRef(Autoplay({ delay: 5000 }))

  return (
    <>
      <div className="w-full">
        <div className="container">
          <section className="grid lg:grid-cols-[60%_auto] mt-4 gap-4">
            <Carousel
              slideSize="100%"
              slideGap="md"
              height={384}
              // className='max-w-2xl'
              withControls={false}
              dragFree
              loop
              w={'100%'}
              align="center"
              getEmblaApi={setEmbla}
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop()}
              onMouseLeave={autoplay.current.reset()}
            >
              {images?.['11']?.map((q, i) => {
                  return (
                    <Carousel.Slide 
                      key={i}
                      className='!w-full !aspect-video'
                    >
                      <img src={getImageUrl(images, q)} alt="" className='min-w-full object-cover aspect-video' />
                    </Carousel.Slide>
                  )
                })}
            </Carousel>

            <div className="w-full -mt-24 sm:mt-0 lg:text-left text-center">
              <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
                {headings?.intro1}
              </h1>

              <ul className="mt-3 text-lg font-medium text-[#5a5959] ">
                <li>{text?.intro2}
                </li>
              </ul>
            </div>
          </section>

          <div className='flex gap-4 mt-8 flex-wrap'>
            <div className='text-center space-y-2 cursor-pointer w-48 mx-auto sm:mx-0' onClick={e => {
              setCurrentPicture(0)
              setPictures('ala')
              handlers.open()
            }}>
              <img className='w-48 h-48 rounded-lg object-cover' src={ala1} alt="" loading='lazy'/>
              <p className='text-primary-600'>Алматы 09.2024</p>
            </div>
            <div className='text-center space-y-2 cursor-pointer w-48 mx-auto sm:mx-0' onClick={e => {
              setCurrentPicture(0)
              setPictures('bay')
              handlers.open()
            }}>
              <img className='w-48 h-48 rounded-lg object-cover' src={bay1} alt="" loading='lazy' />
              <p className='text-primary-600'>Баянаул 06.2024</p>
            </div>
            <div className='text-center space-y-2 cursor-pointer w-48 mx-auto sm:mx-0' onClick={e => {
              setCurrentPicture(0)
              setPictures('bar')
              handlers.open()
            }}>
              <img className='w-48 h-48 rounded-lg object-cover' src={bar1} alt="" loading='lazy'/>
              <p className='text-primary-600'>Боровое 02.2024</p>
            </div>
            <div className='text-center space-y-2 cursor-pointer w-48 mx-auto sm:mx-0' onClick={e => {
              setCurrentPicture(0)
              setPictures('char')
              handlers.open()
            }}>
              <img className='w-48 h-48 rounded-lg object-cover' src={char1} alt="" loading='lazy'/>
              <p className='text-primary-600'>Чарын 09.2024</p>
            </div>
            <div className='text-center space-y-2 cursor-pointer w-48 mx-auto sm:mx-0' onClick={e => {
              setCurrentPicture(0)
              setPictures('fc')
              handlers.open()
            }}>
              <img className='w-48 h-48 rounded-lg object-cover' src={fc1} alt="" loading='lazy'/>
              <p className='text-primary-600'>Первая конференция</p>
            </div>
          </div>
          <div className="flex gap-4 mt-4 flex-wrap">
            <div className='text-center space-y-2 cursor-pointer w-48 mx-auto sm:mx-0' onClick={e => {
              setCurrentPicture(0)
              setPictures('fo')
              handlers.open()
            }}>
              <img className='w-48 h-48 rounded-lg object-cover' src={fo1} alt="" loading='lazy'/>
              <p className='text-primary-600 break-keep w-48'>Фестиваль национальных блюд</p>
            </div>
            <div className='text-center space-y-2 cursor-pointer w-48 mx-auto sm:mx-0' onClick={e => {
              setCurrentPicture(0)
              setPictures('kat')
              handlers.open()
            }}>
              <img className='w-48 h-48 rounded-lg object-cover' src={kat1} alt=""loading='lazy' />
              <p className='text-primary-600'>Катон-Карагай 07.2024</p>
            </div>
            <div className='text-center space-y-2 cursor-pointer w-48 mx-auto sm:mx-0' onClick={e => {
              setCurrentPicture(0)
              setPictures('kol')
              handlers.open()
            }}>
              <img className='w-48 h-48 rounded-lg object-cover' src={kol1} alt=""loading='lazy' />
              <p className='text-primary-600'>Кольсай 09.2024</p>
            </div>
            <div className='text-center space-y-2 cursor-pointer w-48 mx-auto sm:mx-0' onClick={e => {
              setCurrentPicture(0)
              setPictures('qay')
              handlers.open()
            }}>
              <img className='w-48 h-48 rounded-lg object-cover' src={qay1} alt="" loading='lazy'/>
              <p className='text-primary-600'>Кайынды 09.2024</p>
            </div>
          </div>

          <section>
            <div className="grid lg:grid-cols-[60%_auto] gap-4 mt-10">
              <h1 className="block lg:hidden text-2xl md:text-3xl font-bold font-head text-teal-500">
                {headings?.info1}
              </h1>
              <img
                src={q}
                className="w-full rounded-primary object-cover aspect-video"
              />
              <div>
                <h1 className="hidden lg:block text-2xl md:text-3xl font-bold font-head text-teal-500">
                  {headings?.info1}
                </h1>
                <div className="space-y-4 mt-3">
                  <div>
                    <p className="text-lg text-primary-500 font-semibold">{text?.info2}</p>
                    <p>{text?.info3}</p>
                  </div>
                  <div>
                    <p className="text-lg text-primary-500 font-semibold">{text?.info4}</p>
                    <p>{text?.info5}</p>
                  </div>
                  <div>
                    <p className="text-lg text-primary-500 font-semibold">{text?.info6}</p>
                    <p>{text?.info7}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid lg:grid-cols-[60%_auto] mt-10 gap-4 rounded-primary overflow-hidden">
            <h1 className="block lg:hidden text-2xl md:text-3xl font-bold font-head text-teal-500">
              {headings?.memo1}
            </h1>
            <img
              src={w}
              className="min-w-full rounded-primary object-cover aspect-video"
            />
            <div className="w-full lg:text-left text-center">
              <h1 className="hidden lg:block text-2xl md:text-3xl font-bold font-head text-teal-500">
                {headings?.memo1}
              </h1>

              <ul className="mt-3 text-lg font-medium text-[#5a5959] ">
                <li>{text?.memo2}</li>
              </ul>
            </div>
          </section>

          <section className="mt-10 text-center">
            <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
              {headings?.services1}
            </h1>
            <p className="text-xl font-medium mt-3 text-primary-500">{headings?.services2}</p>
            {Array(12)
              .fill(1)
              .map((_, i) => {
                return <p key={i} className="mt-2 font-medium">{text?.[`services${i + 3}`]}</p>
              })}

            <Button
              className='mt-4'
              component={Link}
              to={'/login?signup=true&agent=111924111111111'}
            >
              Ознакомлен и согласен
            </Button>
          </section>

          <section className="grid lg:grid-cols-[60%_auto] mt-10 gap-4">
            <h1 className="block lg:hidden text-2xl md:text-3xl font-bold font-head text-teal-500">
              {headings?.fund1}
            </h1>
            <img
              src={e}
              className="w-full lg mx-auto lg:mx-0 rounded-primary object-cover aspect-video"
            />

            <div className="w-full lg:text-left text-center">
              <h1 className="hidden lg:block text-2xl md:text-3xl font-bold font-head text-teal-500">
                {headings?.fund1}
              </h1>

              <p className="text-xl font-medium mt-3 text-primary-500">{headings?.fund2}</p>
              <p className="mt-2 text-lg font-medium">
                {text?.fund3}
              </p>
              <Link to={'/'} className='underline text-primary-500 mt-4'>
                Подробнее...
              </Link>
            </div>
          </section>

          <section className="grid lg:grid-cols-[60%_auto] mt-10 gap-4">
            <h1 className="block lg:hidden text-2xl md:text-3xl font-bold font-head text-teal-500">
              {headings?.dick1}
            </h1>
            <img
              src={r}
              className="w-full lg mx-auto lg:mx-0 rounded-primary object-cover aspect-video"
            />

            <div className="w-full lg:text-left text-center">
              <h1 className="hidden lg:block text-2xl md:text-3xl font-bold font-head text-teal-500">
                {headings?.dick1}
              </h1>

              <p className="mt-3 text-lg font-medium">
                {text?.dick2}
              </p>
              <Link to={'/fund'} className='underline text-primary-500 mt-4'>
                Подробнее...
              </Link>
            </div>
          </section>

          <section className="grid lg:grid-cols-[60%_auto] mt-10 gap-4">
            <h1 className="block lg:hidden text-2xl md:text-3xl font-bold font-head text-teal-500">
              {headings?.agent1}
            </h1>
            <img
              src={t}
              className="w-full lg mx-auto lg:mx-0 rounded-primary object-cover aspect-video"
            />

            <div className="w-full lg:text-left text-center">
              <h1 className="hidden lg:block text-2xl md:text-3xl font-bold font-head text-teal-500">
                {headings?.agent1}
              </h1>
              <h1 className="text-xl md:text-2xl font-bold font-head text-teal-500 mt-2">
                {headings?.agent2}
              </h1>
              {Array(11)
                .fill(1)
                .map((_, i) => {
                  return <p className="mt-2 font-medium">{text?.[`agent${i + 3}`]}</p>
                })}
              <p className="mt-2 font-medium text-primary-500">{text?.agent14}</p>
            </div>
          </section>

          {/* <section className="mt-10">
            <h1 className="font-bold text-4xl text-primary-500 text-center">Услуги</h1>
            <Accord data={types} />
          </section>

          <div className="flex justify-center mt-4">
            <Button onClic  k={() => handlers1.open()}>
              {kz ? 'Өтініш қалдыру' : `Оставить заявку`}
            </Button>
          </div> */}
        </div>
      </div>
      {/* <Modal opened={opened1} onClose={() => handlers1.close()} centered title="Оставить заявку">
        <section className="max-w-md mx-auto border px-4 pb-4 shadow-lg bg-white">
          <TextInput
            label="Имя"
            placeholder="Ваше имя"
            className="mt-3"
            variant="filled"
            value={data?.name}
            onChange={(e) => setData({ ...data, name: e?.currentTarget?.value })}
          />
          <TextInput
            label="Контактный номер"
            placeholder="Ваш номер"
            className="mt-3"
            variant="filled"
            value={data?.phone}
            onChange={(e) => setData({ ...data, phone: e?.currentTarget?.value })}
          />
          <Select
            label="Вид услуги"
            placeholder="Выберите вид услуги"
            data={
              [
                ...types?.map((q) => {
                  return { label: q?.label, value: q?.label }
                }),
              ] ?? []
            }
            className="mt-3"
            variant="filled"
            onChange={(e) => setType(e)}
          />
          <div className="flex justify-center mt-6">
            <Button disabled={!data?.name || !data?.phone || !type} onClick={send}>
              Оставить заявку
            </Button>
          </div>
        </section>
      </Modal> */}
      <Modal
        centered
        opened={modal}
        onClose={e => handlers.close()}
        withCloseButton={false}
        classNames={{
          body: '!p-0 !relative !border-none',
          // root: '!bg-red-500',
          content: '!bg-transparent !shadow-none !border-none',

        }}
        size='70%'
      >
          <img src={pics?.[pictures]?.[currentPicture]} alt="" className='mx-auto max-h-[700px] object-cover h-auto max-w-full' />
          <div className='flex overflow-x-scroll mt-4 gap-4 pb-4 justify-center'>
            {pics?.[pictures]?.map((q, i) => {
              return (
                <img src={q} className='object-cover w-16 h-16 cursor-pointer' onClick={e => setCurrentPicture(i)} loading='lazy' />
              )
            })}
          </div>
      </Modal>
    </>
  )
}
