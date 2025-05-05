import React from 'react'
import { Accordion, Button, clsx, Collapse, Modal, NumberInput, Select, Text, TextInput, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { pb } from 'shared/api'
import { usePageData } from 'shared/hooks'
import { Accord, Image } from 'shared/ui'
import { DatePicker } from '@mantine/dates'
import 'dayjs/locale/ru';
import { FaMinus, FaPlus } from 'react-icons/fa'
import { formatNumber, getImageUrl } from 'shared/lib'
import { useLangContext } from 'app/langContext'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, useAnimationOffsetEffect } from '@mantine/carousel'
import { showNotification } from '@mantine/notifications'

import q from 'shared/assets/images/tours/1.jpg'

import family from 'shared/assets/images/pack-family.svg'
import agent from 'shared/assets/images/pack-agent.svg'

import company from 'shared/assets/images/company.svg'
import companyPlus from 'shared/assets/images/company-plus.svg'

async function getResots () {
  return await pb.collection('resorts_data').getFullList()
}

async function getTours () {
  return await pb.collection('tours_data').getFullList()
}

const array = [
  {
    type: 'family',
    description:
      'Предназначен для покупки туров и путевок в курортные зоны для всей семьи, идеальный вариант для путешествий с семьей.',
    price: 30000,
    image: family,
    people: 5,
  },
  {
    type: 'agent',
    description:
      'Можете звать за собой людей и получать за них до 15% бонусов, и иметь все бонусы семейного пакета',
    price: 45000,
    image: agent,
    people: 5,
  },
  {
    type: 'company',
    description:
      'Предназначен для покупки туров и путевок в курортные зоны для целой орзанизации, экономьте на каждой поездке и получайте лучший сервис.',
    price: 600000,
    image: company,
    people: 20,
  },
  {
    type: 'company+',
    description:
      'Предназначен для покупки туров и путевок в курортные зоны для целой орзанизации, экономьте на каждой поездке и получайте лучший сервис.',
    price: 1500000,
    image: companyPlus,
    people: 60,
  },
]

export const Tours = () => {

  const {kz, qq} = useLangContext()

  const {images, text, headings} = usePageData('tours')

  const [tours, setTours] = React.useState([])

  React.useEffect(() => {
    getTours()
    .then(res => {
      setTours(res?.[0])
    })
  }, [])

  const [opened, handlers] = useDisclosure(false);
  const [opened1, handlers1] = useDisclosure()

  const [collapse, collapseHandler] = useDisclosure(false);

  const [resorts, setResorts] = React.useState([])
  const [cards, setCards] = React.useState([])

  const [data, setData] = React.useState({
    datePicked: [],
    category: '',
    adults: 1,
    child: 0,
    phone: '',
    resort: ''
  })

  React.useEffect(() => {
    getResots()
    .then((res) => {
      setResorts(res?.filter(q => !q?.card))
      setCards(res?.filter(q => q?.card))
    })
  }, [])

  function incrementAdults () {
    if (data.adults < 30) setData({...data, adults: data.adults + 1})
  }

  function incrementChild () {
    if (data.child < 30) setData({...data, child: data.child + 1})
  }

  function decrementAdults () {
    if (data.adults !== 1) setData({...data, adults: data.adults - 1})
  }

  function decrementChild () {
    if (data.child !== 0) setData({...data, child: data.child - 1})
  }

  async function send () {
    console.log(data, 'a');
    await pb.collection('tours_bids').create({
      date_picked: data?.datePicked ?? [],
      ...data,
      resort: data?.resort
    })
    .then(res => {
      setData({
        datePicked: [],
        category: '',
        adults: 1,
        child: 0,
        phone: '',
        resort: {}
      })
      showNotification({
        title: 'Заявка',
        color: 'green',
        message: 'Заявка успешно отправлена'
      })
    })
  }

  const [embla, setEmbla] = React.useState(null)

  const autoplay = React.useRef(Autoplay({ delay: 3000 }))

  useAnimationOffsetEffect(embla, 200)

  const [d, setD] = React.useState({
    name: '',
    phone: '',
    tour: ''
  })

  return (
    <>
      <div className='w-full'>
        <div className="container">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500 text-center">
              {headings?.heading1}
            </h1>
            <div className="grid lg:grid-cols-2 mt-4 gap-8">
              <img
                src={q}
                className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
              />
              <div className="w-full lg:text-left text-center">
                <div className="mt-6 text-lg font-medium text-[#5a5959]">
                  {text?.text1}
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="container mt-4 lg:mt-20">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500 text-center">
              {headings?.headingx}
            </h1>
            <div className="grid lg:grid-cols-2 mt-4 gap-8">
              <Image
                record={images}
                index={9}
                className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
              />
              <div className="w-full lg:text-left text-center">
                <div className="mt-6 text-lg font-medium text-[#5a5959]">
                  {text?.textx}
                </div>

              </div>
            </div>
          </div>
        </div>

        <section className="w-full mt-4 lg:mt-20">
          <div className="container">
            <div className="mt-4 gap-8">

              <div className="w-full lg:text-left text-center">
                <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500 text-center">
                  {headings?.heading2}
                </h1>


              </div>

            </div>
          </div>
        </section>
        <div className="container mt-10">
          <div className="w-full">
            {/* <h1 className="text-center head text-primary-500">
              {kz ? `Санаторийлер` : `Санатории`}
            </h1> */}
            <div className="mt-4">
              <div className="max-w-xs lg:max-w-full lg:mx-0 mx-auto">
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
                        <div className='py-2 px-2 shrink-0 max-w-[315px] relative' key={i} >
                          <img src={getImageUrl(resort, resort?.image)} alt="" className='object-cover aspect-square' />
                          <div className='pl-2 mt-3 font-bold'>
                            <Text lineClamp={1} className='!text-lg'>{resort?.name}</Text>
                          </div>
                          <Text lineClamp={7} className='mt-1 pl-2 !text-[15px] tracking-wide'>
                            {resort?.description}
                          </Text>
                        </div>
                      )
                    })
                  }
                </Carousel>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-10">
          <div className="w-full">
            {/* <h1 className="text-center head text-primary-500">
              {kz ? `Санаторийлер` : `Санатории`}
            </h1> */}
            <div className="mt-4">
              <div className="max-w-xs lg:max-w-full lg:mx-0 mx-auto">
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
                        <div className='py-2 px-2 shrink-0 max-w-[315px] relative' key={i} >
                          <img src={getImageUrl(resort, resort?.image)} alt="" className='object-cover aspect-square' />
                          <div className='pl-2 mt-3 font-bold'>
                            <Text lineClamp={1} className='!text-lg'>{resort?.name}</Text>
                          </div>
                          <Text lineClamp={7} className='mt-1 pl-2 !text-[15px] tracking-wide'>
                            {resort?.description}
                          </Text>
                        </div>
                      )
                    })
                  }
                </Carousel>
              </div>
            </div>
          </div>
        </div>

          {/* <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mx-auto mt-4">
            {array?.map((q) => <Pack key={q.type} {...q} />)}
          </div> */}
        
        <section className="w-full mt-20">
          <div className="container">
            <div className="">
              <h1 className="text-4xl text-primary-500 font-bold text-center">
                {headings?.heading3}
              </h1>
              <div className='flex flex-col md:flex-row gap-8 mt-6'>
 
                <div className='space-y-4 mx-auto border gap-4 rounded-primary overflow-hidden min-w-[300px]'>
                  <div className='flex flex-col w-full p-3'>
                    <div className='flex flex-col gap-2 bg-white p-3 w-full'>
                      <p className='text-sm'>
                        Куда? 
                      </p>
                      <Button onClick={() => handlers.open()} variant='light' className='w-min'>
                        {data?.resort?.name ? data?.resort?.name : 'Выбрать курорт'}
                      </Button>
                    </div>
                    <div className='flex flex-col gap-2  bg-white p-3 w-full'>
                      <p className='text-sm'>
                        На сколько дней? 
                      </p>
                      <DatePicker 
                        type="range" 
                        allowSingleDateInRange 
                        value={data?.datePicked} 
                        onChange={e => setData({...data, datePicked: e})} 
                        locale='ru'
                      />
                    </div>
                    <Collapse in={collapse}>
                      <div className='p-3 space-y-3'>
                        <div className='flex gap-4 items-center justify-between'>
                          <p className='text-sm'>Взрослые:</p>
                          <div className='flex items-center gap-2'>
                            <FaMinus onClick={decrementAdults} className='text-sm cursor-pointer'/>
                            <NumberInput 
                              hideControls 
                              className='w-16' 
                              classNames={{input: `!text-center font-bold !text-lg`}}
                              value={data.adults}
                              onChange={e => setData({...data, adults: e})}
                            />
                            <FaPlus onClick={incrementAdults} className='text-sm cursor-pointer'/>
                          </div>
                        </div>
                        <div className='flex gap-4 items-center justify-between'>
                          <p className='text-sm'>Дети до 12:</p>
                          <div className='flex items-center gap-2'>
                            <FaMinus  onClick={decrementChild} className='text-sm cursor-pointer'/>
                            <NumberInput 
                              hideControls 
                              className='w-16' 
                              classNames={{input: `!text-center font-bold !text-lg`}}
                              value={data.child}
                              onChange={e => setData({...data, child: e})}
                            />
                            <FaPlus onClick={incrementChild} className='text-sm cursor-pointer'/>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col gap-2  bg-white p-3 w-full'>
                        <p className='text-sm'>
                          Категория базы отдыха? 
                        </p>
                        <Select
                          placeholder='Выбрать категорию'
                          data={[
                            {label: 'Эконом', value: 'eco'},
                            {label: 'Стандарт', value: 'standart'},
                            {label: 'Вип', value: 'vip'},
                          ]}
                          onChange={e => setData({...data, category: e})}
                        />
                      </div>
                      <div className='p-3'>
                        <p className='text-sm'>Контактный номер</p>
                        <TextInput
                          value={data?.phone}
                          onChange={e => setData({...data, phone: e.currentTarget.value})}
                          placeholder='+7 ___ __ ___'
                        />
                      </div>
                      <div className='p-3'>
                        <Button fullWidth onClick={send} disabled={!data?.resort || !data?.phone || !data?.datePicked}>
                          {qq('Оставить заявку', 'Өтініш қалдыру')}
                        </Button>
                      </div>
                    </Collapse>
                    <Button onClick={() => collapseHandler.toggle()} variant='white'>
                      {collapse ? 'Свернуть' : 'Развернуть'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='container mt-8'>
          <h1 className='font-bold text-4xl text-primary-500 text-center'>
            {qq('Туры', 'Турлар')}
          </h1>
          <Accord data={tours?.tours}/>
        </section>

        <div className='flex justify-center mt-4'>
          <Button
            onClick={() => handlers1.open()}
          >
            {kz ? 'Өтініш қалдыру' : `Оставить заявку`}
          </Button>
        </div>

      </div>
      <Modal
        opened={opened}
        onClose={() => handlers.close()}
        centered
        size={'lg'}
      >
        <div className='space-y-4 overflow-scroll w-full'>
          {resorts?.map((q, i) => {
            return (
              <div className='max-w-xl border p-3 rounded-lg flex flex-col sm:flex-row gap-4 cursor-pointer' key={i}>
                <img src={getImageUrl(q, q?.image)} className='mx-auto object-cover shrink-0 w-[168px] h-[168px] rounded-md overflow-hidden' alt="" />
                <div>
                  <p className='text-lg'>{q.name}</p>
                  <Text lineClamp={3} className='text-sm mt-3'>{q.description}</Text>
                  <div className='mt-4'>
                    <Button
                      variant='light'
                      onClick={() => {
                        setData({...data, resort: q})
                        handlers.close()
                      }}
                    >
                      Выбрать
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Modal>

            
      <Modal
        opened={opened1}
        onClose={() => handlers1.close()}
        centered
        title='Оставить заявку'
      >
        <section className='max-w-md mx-auto border px-4 pb-4 shadow-lg bg-white'>
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
            label='Туры'
            placeholder='Выберите тур'
            data={tours?.tours_bid?.map(e => {return {label: e, value: e}}) ?? []}
            className='mt-3'
            variant='filled'
            onChange={e => setD({...d, tour: e})}
          />
          <div className='flex justify-center mt-6'>
            <Button 
              disabled={!d?.name || !d?.phone || !d?.tour}
              onClick={async () => {
                  await pb.collection('tours_bids2').create({
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
              {qq('Оставить заявку', 'Өтініш қалдыру')}
            </Button>
          </div>
        </section>
      </Modal>
    </>
  )
}

const Pack = ({ type, description, price, image, people, onClick }) => {
  return (
    <UnstyledButton
      onClick={onClick}
      title={
        (type === 'family' && 'Приобрести пакет для семьи') ||
        (type === 'agent' && 'Приобрести пакет для агента') ||
        (type === 'company' && 'Приобрести пакет для компании') ||
        (type === 'company+' && 'Приобрести пакет для компании +')
      }
      className={clsx(
        'aspect-[1/1.6] max-w-[333px] rounded-primary shadow-equal overflow-hidden flex flex-col cursor-pointer hover:scale-105 transition-all duration-200 focus:scale-105'
      )}
    >
      <img src={image} alt="" className="aspect-video object-contain border-b-black p-1" />
      <div className={clsx('px-6 shrink h-full flex flex-col')}>
        <p className={clsx('text-center my-4 font-medium')}>1 год</p>
        <p className="text-2xl text-center leading-4 font-bold">
          {type === 'family' && 'Семейный'}
          {type === 'agent' && 'Агентский'}
          {type === 'company' && 'Корпоративный'}
          {type === 'company+' && 'Корпоративный +'}
        </p>
        <p className="text-center tracking-wide font-medium flex flex-col justify-center h-full">
          {description}
        </p>
      </div>
      <div
        className={clsx(
          'grid grid-cols-3 items-center justify-center text-white mt-6 font-semibold text-sm border-t',
          {
            'bg-gradient-to-l from-orange-400 to-orange-600': type === 'family',
            'bg-gradient-to-r from-primary-400 to-primary-600': type === 'agent',
            'bg-gradient-to-r from-rose-400 to-rose-600': type === 'company',
            'bg-gradient-to-l from-blue-400 to-blue-600': type === 'company+',
          }
        )}
      >
        <div className="grid place-items-center p-4 text-center border-r h-full">
          На {people}
          <br />
          человек
        </div>
        <div className="grid place-items-center p-4 text-center border-r whitespace-nowrap h-full">
          {formatNumber(price)} ₸
        </div>
        <div className="grid place-items-center p-4 text-center">Скидки до 40%</div>
      </div>
    </UnstyledButton>
  )
}
