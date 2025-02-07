import React from 'react'
import { ActionIcon, Divider, Indicator, MantineProvider, clsx, createEmotionCache } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from 'shared/hooks'
import { AddProduct } from './add-product'
import { User } from './user'
import { useShopStore } from './shopStore'
import { Products } from '../products/products'
import { Reviews } from './reviews'
import { Statuses } from '../products/statuses'
import { Orders } from './orders'

import dukenLogo from 'shared/assets/images/duken.png'
import dukenLogoWhite from 'shared/assets/images/duken-white.png'

import { FaChartLine } from "react-icons/fa6";
import { FaRegBell, FaRegHeart, FaUser } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { FaHive } from "react-icons/fa6";
import { FaGripVertical } from "react-icons/fa6";
import { MdRateReview } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa6";
import { FiShoppingCart } from 'react-icons/fi'
import { Avatar } from 'shared/ui'


const cache = createEmotionCache({
  key: 'mantine',
  prepend: false,
})

export const Dashboard = () => {
  
  const [params, setParams] = useSearchParams()

  const { getShopById } = useShopStore()

  const { user } = useAuth()

  React.useEffect(() => {
    getShopById(user?.id)
  }, [])

  const array = [
    { 
      label: 'Общее', 
      path: 'stats',
      icon: <FaChartLine size={25} />
    },
    { 
      label: 'Профиль',
      path: 'user',
      icon: <FaUser size={25}/>
    },
    { 
      label: 'Добавление товара', 
      path: 'add-product',
      icon: <MdAddBox size={25} />
    },
    { 
      label: 'Статусы', 
      path: 'statuses',
      icon: <FaHive size={25}/>
    },
    { 
      label: 'Товары', 
      path: 'products',
      icon: <FaGripVertical size={25} />
    },
    { 
      label: 'Отзывы', 
      path: 'reviews',
      icon: <MdRateReview size={25} />
    },
    { 
      label: 'Заказы', 
      path: 'orders',
      icon: <FaClipboardList size={25}/>
    },
  ]

  function handleTab(e) {
    params.set('tab', e)
    setParams(params)
  }

  return (
    <MantineProvider
      withGlobalStyles
      withCSSVariables
      emotionCache={cache}
      theme={{
        primaryColor: 'pink',
        primaryShade: 7,
      }}
    >
      <div className=" market">
        <div className="grid grid-cols-[280px_auto]">
          <div className="bg-pink-700">
            <div className='py-4 px-12 h-32 flex flex-col justify-center'>
              <img src={dukenLogoWhite} alt="" className='w-24'  />
            </div>
            <div className="flex flex-col h-screen pl-5">
              {array.map((page, i) => {
                return (
                  <div
                    key={i}
                    className={clsx('!market-head pl-5 py-6 text-sm inline cursor-pointer text-white rounded-l-full', {
                      'bg-white !text-pink-600': params.get('tab') === page.path,
                    })}
                    onClick={() => handleTab(page?.path)}
                  >
                    <div className='flex gap-3 items-center'>
                      {page?.icon}
                      <span className='text-lg !font-sans'>
                        {page?.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <div className='h-32'>
              <div className='bg-white h-full border-b flex items-center justify-between px-6'>
                <p className='text-3xl my-auto !font-sans'>
                  {params.get('tab') === 'stats' && <>Общее</>}
                  {params.get('tab') === 'user' && <>Магазин</>}
                  {params.get('tab') === 'add-product' && <>Добавление товара</>}
                  {params.get('tab') === 'products' && <>Товары</>}
                  {params.get('tab') === 'statuses' && <>Статусы</>}
                  {params.get('tab') === 'reviews' && <>Отзывы</>}
                  {params.get('tab') === 'orders' && <>Заказы</>}
                </p>
                <div className='flex items-center gap-4'>
                  {/* <Link to={`/duken/profile?segment=messages`}> */}
                    <Indicator 
                      // label={notifications} 
                      size={20} 
                      // disabled={notifications === 0}
                    >
                      <ActionIcon className='!border !border-slate-200 !p-3 !h-12 !w-12 !rounded-full'>
                        <FaRegBell size={'100%'} color='black' />
                      </ActionIcon>
                    </Indicator>
                  {/* </Link> */}
                  {/* <Link to={'/duken/favorites'}> */}
                    <Indicator 
                      label={user?.favorites?.length} 
                      size={20} 
                      disabled={user?.favorites?.length === 0}
                    >
                      <ActionIcon className='!border !border-slate-200 !p-3 !h-12 !w-12 !rounded-full'>
                        <FaRegHeart size={'100%'} color='black' />
                      </ActionIcon>
                    </Indicator>
                  {/* </Link> */}
                  <Indicator 
                    // label={cartItems?.length} 
                    size={20} 
                    // disabled={cartItems?.length === 0}
                    processing
                  >  
                    {/* <Link to={'/duken/cart'}> */}
                      <ActionIcon className='!border !border-slate-200 !p-3 !h-12 !w-12 !rounded-full'>
                        <FiShoppingCart size={'100%'} color='black' />
                      </ActionIcon>
                    {/* </Link> */}
                  </Indicator>

                  <Divider orientation="vertical" />

                  <div className='flex items-center gap-4'>
                    <div>
                      <p className='text-xl text-right'>{user?.fio}</p>
                      {!user?.duken && (
                        <>
                          <p className='text-lg text-right -mt-1'>{formatNumber(user?.balance)} ₸</p>
                          <p className='text-xs text-slate-400 -mt-1.5 text-right'>{formatNumber(user?.bonuses)} бонусов</p>
                        </>
                      )} 
                    </div>
                    <Avatar
                      
                      record={user}
                      src={user?.avatar}
                      radius='xl'
                      size='lg'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              {params.get('tab') === 'stats' && <></>}
              {params.get('tab') === 'user' && <User />}
              {params.get('tab') === 'add-product' && <AddProduct />}
              {params.get('tab') === 'products' && <Products />}
              {params.get('tab') === 'statuses' && <Statuses />}
              {params.get('tab') === 'reviews' && <Reviews/>}
              {params.get('tab') === 'orders' && <Orders/>}
            </div>
          </div>
        </div>
      </div>
    </MantineProvider>
  )
}
