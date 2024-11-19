import React from 'react'
import { useLangContext } from 'app/langContext'
import { Accordion, Button, Modal, Select, TextInput } from '@mantine/core'
import { Link as RouterLink } from 'react-router-dom'

import Kazmap from 'shared/assets/images/map-kz.png'
import { usePageData } from 'shared/hooks'
import { Accord, Image } from 'shared/ui'
import { HealthCard } from 'entities/healthCard'
import { Quiz } from 'modules/Quiz'
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { pb } from 'shared/api'
import { ResortCard } from 'entities/resort'
import { useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'

async function getResorts() {
  return await pb.collection('resorts').getFullList({
    filter: `status = 'good'`,
  })
}

async function getRes () {
  return await pb.collection('health_data').getFullList()
}

export const HealthWorld = () => {

  const {kz} = useLangContext()

  const [opened1, handlers1] = useDisclosure()

  const {headings, text, images} = usePageData('health-world')

  const [resorts, setResorts] = React.useState([])

  const [r, setR] = React.useState([])

  const array = [
    {
      flow: 'left',
      text: text?.text15,
      index: 3,
    },
    {
      flow: 'right',
      text: text?.text16,
      index: 4,
    },
    {
      flow: 'left',
      text: text?.text17,
      index: 5,
    },
    {
      flow: 'right',
      text: text?.text18,
      index: 6,
    },
  ]


  React.useEffect(() => {
    getResorts().then((res) => setResorts(res))
    .catch(err => {
      console.log(err, 'err');
    })

    getRes()
    .then(res => {
      setR(res?.[0]?.resorts)
    })
  }, [])

  const [embla, setEmbla] = React.useState(null)

  const autoplay = React.useRef(Autoplay({ delay: 2000 }))

  useAnimationOffsetEffect(embla, 200)

  const [d, setD] = React.useState({
    name: '',
    phone: '',
    resort: ''
  })

  return (
    <>
      <div className='w-full'>
        <div className="container">
          <div className="w-full">

            <div className="grid lg:grid-cols-2 mt-6 gap-10">
              <div>
                <Image
                  record={images}
                  index={1}
                  className="w-full max-w-[300px] mx-auto max-h-[300px] rounded-primary object-cover object-top"
                />
                <h2 className="text-center pt-2 font-head text-2xl px-6 text-primary-500">
                  {headings?.heading3}
                </h2>
                <p className="px-4 text-center text">
                  {text?.text1}
                </p>
                <div className='text-center'>
                  <a href={headings?.link} target="_blank" className="underline text-blue-300">
                    Перейти по ссылке
                  </a>
                </div>
              </div>
              <div>
                <h1 className="text-2xl lg:text-4xl font-semibold font-head text-teal-500">
                  {headings?.heading}
                </h1>
                <ul className="space-y-4 mt-8">
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">
                      {text?.text2}
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">
                      {text?.text3}
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                    <p className="text">
                      {text?.text4}
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">
                      {text?.text5}
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row mt-4 gap-8">
            
              <div className="w-full lg:text-left text-center">
                <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
                  {headings?.heading4}
                </h1>
                <p className="text-xl font-medium mt-3 text-[#1e1e1e]">
                  {headings?.heading5}
                </p>
                <ul className="mt-3 text-lg font-medium text-[#5a5959] ">
                  <li>• {text?.text6}</li>
                  <li>• {text?.text7}</li>
                  <li>• {text?.text8}</li>
                  <li>• {text?.text9}</li>
                </ul>

              </div>
            </div>


          </div>
        </div>
        <section className="bg-primary-500 py-4 lg:py-16 mt-10 lg:mt-20">
          <div className="container">
          <div className="flex flex-col lg:flex-row gap-10 w-full justify-between ">
            <Image
              record={images}
              index={2}
              className={'rounded-primary lg:max-w-[50%] object-cover mx-auto'}
            />
            <div className="bg-white rounded-primary w-full text-teal-500 p-4 lg:p-8">
              <h1 className=" font-extrabold text-3xl md:text-[40px]">
                {headings?.heading6}
              </h1>
              <div className="bg-[#1e1e1e] max-w-[70px] w-full h-1 mt-3"></div>
              <div className="mt-5 md:text-xl flex flex-col gap-5 font-medium leading-9">
                <div>• {text?.text10} </div>
                <div>• {text?.text11} </div>
                <div>• {text?.text12} </div>
                <div>• {text?.text13} </div>
                <div>• {text?.text14} </div>
              </div>
            </div>
          </div>
          </div>
        </section>


        <div className="container">
          <div className="space-y-6 mt-10">
            {array.map((val, i) => {
              return <HealthCard card={val} key={i} images={images}/>
            })}
          </div>
        </div>

        <section className="mt-10 lg:mt-16 mb-10 px-4">
          <div className="text-center">
            <h1 className="text-4xl font-medium text-primary-500">
              {headings?.heading7} 
            </h1>
            <div className='grid gap-8 mt-2 max-w-3xl mx-auto'>
              <p className="text text-left">
                {text?.text19}
              </p>
            </div>
          </div>
        </section>

        <Quiz/>

        <div className="container">
          <div className="py-6 px-4 text-center bg-gradient-to-tl from-teal-600 to-teal-500 shadow-md rounded-primary">
            <div className="mx-auto">
              <p className="text-4xl text-white">
                {kz ? `Қазақстанның санаторияларының біріккен тізімі` : `Единый реестр санаторно-курортных комплексов Казахстана`}
              </p>
              <p className="mt-5 text-2xl text-white ">
                {kz ? `Қазақстан бойынша сауықтыру турларын іздеу және іріктеу`: `Поиск и подбор оздоровительных туров по Казахстану`}
              </p>

            </div>
          </div>
        </div>

        <div className="container mt-10">
          <div className="w-full">

            <div className="mt-4">
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
          </div>
        </div>

        <section className='container mt-8'>
          <h1 className='font-bold text-4xl text-primary-500 text-center'>Санатории</h1>
          <Accord data={r}/>
          <div className='flex justify-center mt-4'>
            <Button
              onClick={() => handlers1.open()}
            >
              {kz ? 'Өтініш қалдыру' : `Оставить заявку`}
            </Button>
          </div>
        </section>

      </div>
      <Modal
        opened={opened1}
        onClose={() => handlers1.close()}
        centered
        title='Оставить заявку'
      >
        <section className='max-w-md mx-auto border p-4 shadow-lg bg-white'>
          <TextInput
            label='Имя'
            placeholder='Ваше имя'
            className='mt-3'
            variant='filled'
            value={d?.name}
            onChange={e => setD({...d, name: e?.currentTarget?.value})}
          />
          <TextInput
            label='Контактный номер'
            placeholder='Ваш номер'
            className='mt-3'
            variant='filled'
            value={d?.phone}
            onChange={e => setD({...d, phone: e?.currentTarget?.value})}
          />
          <Select
            label='Санатории'
            placeholder='Выберите санаторий'
            data={r?.map(e => {return {label: e?.name, value: e?.name}}) ?? []}
            className='mt-3'
            variant='filled'
            onChange={e => setD({...d, resort: e})}
          />
          <div className='flex justify-center mt-6'>
            <Button 
              disabled={!d?.name || !d?.phone || !d?.resort}
              onClick={async () => {
                  await pb.collection('health_bids').create({
                    ...d
                  })
                  .then(() => {
                    showNotification({
                      title: 'Заявка',
                      color: 'green',
                      message: 'Заявка успешно отправлена'
                    })
                    setD({
                      name: '',
                      phone: '',
                      resort: '',
                    })
                    handlers1.close()
                  })
                }
              }
            >
              Оставить заявку
            </Button>
          </div>
        </section>
      </Modal>
    </>
  )
}