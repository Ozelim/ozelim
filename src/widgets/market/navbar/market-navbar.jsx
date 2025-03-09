import React from 'react'
import { ActionIcon, Divider, Menu, Indicator, Autocomplete, clsx } from '@mantine/core'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import mobileLogo from 'shared/assets/images/logo1.png'
import { IoIosArrowDown } from 'react-icons/io'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { useAuth } from 'shared/hooks'

import { FaRegHeart, FaRegBell } from 'react-icons/fa'
import { Avatar } from 'shared/ui'
import { useCartStore } from 'pages/market/cart/cartStore'
import { formatNumber } from 'shared/lib'
import { FiShoppingCart } from "react-icons/fi";


import { FaWhatsapp } from "react-icons/fa";
import { useProductsStore } from 'pages/market/catalog/producsStore'
import { useDisclosure } from '@mantine/hooks'
import { useNotificationStore } from 'pages/market/profile/user/notificationStore'

export const MarketNavbar = () => {

  const navigate = useNavigate()
  const {pathname} = useLocation()
  
  const {user} = useAuth()
  const {getProductsBySearch, getAllProducts} = useProductsStore()
  const {nots} = useNotificationStore()
  const {cartItems} = useCartStore()
  
  const [search, setSearch] = React.useState('')
  const [delay, delay_h] = useDisclosure(false)

  React.useEffect(()  => {
    if (pathname === '/duken') {
      setSearch('')
    }
  }, [pathname])

  async function searchProducts (name) {
    delay_h.open()
    if (name)  {
      navigate('/duken/catalog')
      getProductsBySearch(name)
    } else {
      getAllProducts()
    }
    setTimeout(() => {
      delay_h.close()
    }, 1000);
  }

  const notifications = nots?.order || nots?.offer || nots?.messages

  if (pathname.includes('profile') && user?.collectionName === 'merchants') return 

  return (
    <div className="w-full border-b bg-white">
      <div className="w-full bg-gray-800 py-3 px-4 md:py-5 md:px-6">
        <div className="container-market flex flex-col md:flex-row justify-end market gap-4 md:gap-10">
          <div className='flex flex-col md:flex-row items-center gap-2 md:gap-3 justify-center'>
            <p className='text-white text-sm md:text-base whitespace-nowrap'>Поддержка ПН - ПТ (09:00 - 18:00) </p>
            <div className='flex items-center gap-2'>
              <FaWhatsapp color='white' size={20}/>
              <p className='text-white text-sm md:text-base'>+7 702 429 9146</p>
            </div>
          </div>
          <div className='flex items-center gap-2 justify-center'>
            <Menu>
              <Menu.Target>
                <button className="text-sm cursor-pointer flex gap-1 items-center text-white">
                  рус
                <IoIosArrowDown />
                </button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>
                  рус
                </Menu.Item>
                <Menu.Item>
                  каз
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </div>

      <div className="container-market flex flex-col lg:flex-row items-center gap-4 justify-between w-full market !py-4">
        <Link to={'/duken'} className="w-full md:w-auto flex justify-center md:justify-start">
          <div className='flex gap-3 items-center'>
            <img className="max-w-[50px] md:max-w-[70px] w-full" src={mobileLogo} />
            <b className='text-xl md:text-2xl !font-extrabold'>DUKEN</b>
          </div>
        </Link>

        <Autocomplete
          data={[]}
          placeholder="Поиск..."
          rightSection={
            <FaMagnifyingGlass 
              color="white"
              onClick={() => searchProducts(search)}
              className={clsx('cursor-pointer',{
                'pointer-events-none': delay
              })}
            />
          }
          disabled={delay}
          className="w-full md:max-w-sm"
          value={search}
          onChange={(e) => setSearch(e)}
          classNames={{
            rightSection: 'bg-teal-500 rounded-r-full',
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') searchProducts(search)}}
          radius='xl'
          size='md'
          variant='filled'
        />

        <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
          {!user?.duken && (
            <>
              <Link to={`/duken/profile?tab=messages`}>
                <Indicator 
                  size={16} 
                  disabled={!notifications}
                >
                  <ActionIcon className='!border !border-slate-200 !p-2 md:!p-3 !h-10 !w-10 md:!h-12 md:!w-12 !rounded-full'>
                    <FaRegBell size={'100%'} color='black' />
                  </ActionIcon>
                </Indicator>
              </Link>
              <Link to={'/duken/favorites'}>
                <Indicator 
                  label={user?.favorites?.length} 
                  size={16} 
                  disabled={user?.favorites?.length === 0}
                >
                  <ActionIcon className='!border !border-slate-200 !p-2 md:!p-3 !h-10 !w-10 md:!h-12 md:!w-12 !rounded-full'>
                    <FaRegHeart size={'100%'} color='black' />
                  </ActionIcon>
                </Indicator>
              </Link>
              <Indicator 
                label={cartItems?.length} 
                size={16} 
                disabled={cartItems?.length === 0}
                processing
              >  
                <Link to={'/duken/cart'}>
                  <ActionIcon className='!border !border-slate-200 !p-2 md:!p-3 !h-10 !w-10 md:!h-12 md:!w-12 !rounded-full'>
                    <FiShoppingCart size={'100%'} color='black' />
                  </ActionIcon>
                </Link>
              </Indicator>

              <Divider orientation="vertical" className="hidden md:block" />
            </>
          )}

          {user?.id  ? (
            <Link to={'/duken/profile'}>
              <div className='flex items-center gap-2 md:gap-4'>
                <div className="hidden md:block">
                  <p className='text-lg md:text-xl text-right'>{user?.fio}</p>
                  {!user?.duken && (
                    <>
                      <p className='text-base md:text-lg text-right -mt-1'>{formatNumber(user?.balance)} ₸</p>
                      <p className='text-xs text-slate-400 -mt-1.5 text-right'>{formatNumber(user?.bonuses)} бонусов</p>
                    </>
                  )} 
                </div>
                <Avatar
                  record={user}
                  src={user?.avatar}
                  radius='xl'
                  size='md'
                  className="md:size-lg"
                />
              </div>
            </Link>
          ) : (
            <Avatar
              radius='xl'
              size='md'
              className="md:size-lg"
            />
          )}
        </div>
      </div>
    </div>
  )
}