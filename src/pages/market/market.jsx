import React from 'react'
import { Sidebar } from './sidebar/sidebar'
import { MarketCarousel } from './carousel/market-carousel'
import { Link } from 'react-router-dom'
import { useProductsStore } from './catalog/producsStore'
import { Product } from './product'
import { Carousel } from '@mantine/carousel'
import { formatNumber, getImageUrl } from 'shared/lib'
import { Button, Slider, TextInput } from '@mantine/core'
import dayjs from 'dayjs'
import { pb } from 'shared/api'
import { FiPhone } from 'react-icons/fi'

export const Market = () => {
  const {
    products,
    getAllProducts,
    rareProducts,
    discountProducts,
    getRareProducts,
    getDiscountProducts,
  } = useProductsStore()

  React.useEffect(() => {
    getAllProducts()
    getRareProducts()
    getDiscountProducts()
  }, [])

  const handleDiscountEnd = async (productId) => {
    await pb.collection('products').update(productId, {
      discount: {
        percent: 0,
        end: 0,
        status: 'ended',
        value: 0,
      },
    })  
    getDiscountProducts()
  }
  
  const [phone, setPhone] = React.useState('')

  const handleSendRequest = async () => {
    if (phone.length < 11) {
      return
    }
  }

  return (
    <div className="w-full">
      <div className="bg-white border-b w-full">
        <div className="grid xl:grid-cols-[350px_auto] mx-auto container-market market">
          <p className="text-base uppercase py-3 md:py-4 border-b md:border-b-0 md:border-r text-center md:text-left whitespace-nowrap bg-primary-500 text-white px-4 rounded-primary">
            все Категории
          </p>
          <div className="px-3 md:px-6 flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 text-sm py-3 md:py-4 uppercase">
            <Link to={'/duken/catalog'}>Каталог</Link>
            <Link to={'/duken/weare'}>О нас</Link>
            <p>Доставка</p>
            <p>Гарантия</p>
          </div>
        </div>
      </div>
      <div className="border-b w-full">
        <div className="container-market market mb-4 mx-2 md:mx-auto">
          <div className="grid md:grid-cols-[350px_auto_300px]">
            <Sidebar />
            <MarketCarousel />
            <div className="w-full pt-4 h-[59vh]">
              <img
                src="https://wallpapers-max.b-cdn.net/wallpapers/2020/hd/thin-layers-of-black-stone-wallpaper.jpg"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {discountProducts?.length > 0 && (
        <div className="container-market market !mt-8">
          <p className="text-xl border-b-2 pb-2">Скидки дня</p>
          <Carousel loop slideSize="50%" slideGap={24} align="start" withControls={false} withIndicators={false}>
            
            {discountProducts?.map((q) => {
              return (
                <Carousel.Slide key={q?.id}>
                  <div className="mt-4 gap-8">
                    <div
                      key={q?.id}
                      className="grid grid-cols-[30%_auto] gap-4 border border-primary-500 rounded-primary p-4"
                    >
                      <img
                        src={getImageUrl(q, q?.pics?.[0])}
                        alt=""
                        className="w-[300px] h-[333px] object-cover rounded-primary"
                      />
                      <div className="space-y-4">
                        <p className="text-xl font-bold">{q?.name}</p>
                        <p className="line-clamp-2">{q?.description}</p>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-lg text-primary-500">
                            {formatNumber(
                              q?.price - q?.price * (q?.discount?.percent / 100)
                            )}
                            ₸
                          </p>
                          <p className="text-gray-400 line-through">
                            {formatNumber(q?.price)} ₸
                          </p>
                          <p className="text-gray-400">-{q?.discount?.percent}%</p>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-slate-500">Осталось: {q?.amount} шт.</p>
                          <Slider
                            color="teal"
                            value={q?.buyed ?? q?.amount}
                            max={q?.amount}
                            disabled
                            classNames={{
                              bar: '!bg-primary-500',
                            }}
                          />
                        </div>
                        <CountdownTimer
                          endTimestamp={q?.discount?.end}
                          onTimeEnd={() => handleDiscountEnd(q?.id)}
                        />
                      </div>
                    </div>
                  </div>
                </Carousel.Slide>
              )
            })}
          </Carousel>
        </div>
      )}

      <div className="container-market market !mt-8">
        <p className="text-xl border-b-2 pb-2">Экслюзивные товары</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-4 gap-y-4 md:gap-y-8 !mt-4">
          {rareProducts?.map((q) => {
            return <Product key={q?.id} product={q} />
          })}
        </div>
      </div>

      <div className="container-market market !mt-8">
        <p className="text-xl border-b-2 pb-2">Наши партнеры</p>
        <Carousel
          loop
          withControls={false}
          withIndicators={false}
          classNames={{
            container: '!mt-8',
          }}
          slideSize="20%"
        >
          {Array(10).fill(0).map((q, i) => {
            return (
              <Carousel.Slide key={i}>
                <div>Lorem ipsum dolor sit amet.</div>
              </Carousel.Slide>
            )
          })}
        </Carousel>
      </div>

      <div className="w-full bg-primary-500 py-6 md:py-8 mt-6 md:mt-8">
        <div className="container-market text-white market px-4 md:px-0">
          <div className="flex justify-between gap-4">
            <div className="text-xl md:text-2xl text-center md:text-left">
              Стать партнером площадки
            </div>
            <div className='flex gap-2 items-end'>
              <TextInput placeholder='Ваш номер телефона' icon={<FiPhone />} />
              <Button variant='gradient' gradient={{ from: 'teal.6', to: 'teal.4' }}>Отправить заявку</Button>
            </div>

          </div>
        </div>
      </div>

      <div className='container-market market !mt-8'>
        <div className="flex justify-between items-center border-b-2 pb-2">
          <p className='text-xl'>
            Товары
          </p>
          <Button variant='subtle' color='teal' component={Link} to={'/duken/catalog'}>
            Посмотреть все
          </Button>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-4 gap-y-4 md:gap-y-8 !mt-4 md:!mt-8'>
          {products?.items?.map((q, i) => {
            return <Product key={i} product={q} />
          })?.slice(0, 5)}
        </div>
      </div>
    </div>
  )
}

function timeLeftUntil(timestampInSeconds) {
  const now = dayjs().unix()
  const diffInSeconds = timestampInSeconds - now

  if (diffInSeconds <= 0) {
    return 'Time has already passed!'
  }

  const days = Math.floor(diffInSeconds / 86400)
  const hours = Math.floor((diffInSeconds % 86400) / 3600)
  const minutes = Math.floor((diffInSeconds % 3600) / 60)
  const seconds = diffInSeconds % 60

  return {
    days,
    hours,
    minutes,
    seconds,
  }
}

const CountdownTimer = ({ endTimestamp, onTimeEnd }) => {
  const [timeLeft, setTimeLeft] = React.useState(() => timeLeftUntil(endTimestamp))

  React.useEffect(() => {
    setTimeLeft(timeLeftUntil(endTimestamp))

    const intervalId = setInterval(() => {
      const remaining = timeLeftUntil(endTimestamp)

      if (typeof remaining === 'string') {
        clearInterval(intervalId)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        // Execute the onTimeEnd callback if provided
        if (onTimeEnd && typeof onTimeEnd === 'function') {
          onTimeEnd()
        }
      } else {
        setTimeLeft(remaining)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [endTimestamp, onTimeEnd])

  return (
    <div className="grid grid-cols-4 gap-1 mt-4">
      <div className="flex justify-center items-center w-28 h-20 bg-slate-100">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">{timeLeft.days}</p>
          <p className="text-sm text-slate-500">Дней</p>
        </div>
      </div>
      <div className="flex justify-center items-center w-28 h-20 bg-slate-100">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">{timeLeft.hours}</p>
          <p className="text-sm text-slate-500">Часов</p>
        </div>
      </div>
      <div className="flex justify-center items-center w-28 h-20 bg-slate-100">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">{timeLeft.minutes}</p>
          <p className="text-sm text-slate-500">Минут</p>
        </div>
      </div>
      <div className="flex justify-center items-center w-28 h-20 bg-slate-100">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">{timeLeft.seconds}</p>
          <p className="text-sm text-slate-500">Секунд</p>
        </div>
      </div>
    </div>
  )
}