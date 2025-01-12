import React from 'react'
import { ActionIcon, Divider, Menu, Avatar as Avatr, TextInput, Indicator, Text } from '@mantine/core'
import { Link } from 'react-router-dom'
import mobileLogo from 'shared/assets/images/logo1.png'
import { PiShoppingCartFill } from 'react-icons/pi'
import { IoIosArrowDown } from 'react-icons/io'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { FaUserTie } from 'react-icons/fa6'
import { useAuth } from 'shared/hooks'

import { FaRegHeart, FaRegBell } from 'react-icons/fa'
import { LuShoppingBag } from "react-icons/lu";
import { Avatar } from 'shared/ui'
import { useCartStore } from 'pages/market/cart/cartStore'
import { formatNumber } from 'shared/lib'

import { FaPhoneVolume } from "react-icons/fa6";

export const MarketNavbar = () => {

  const {user} = useAuth()

  const {cartItems} = useCartStore()

  return (
    <div className="w-full border-b">
      <div className="flex justify-end bg-black py-5 px-6 market gap-3">
        <div className='flex items-center gap-3'>
          <FaPhoneVolume color='white' />
          <p className='text-white '>+7 702 429 9146</p>
        </div>
        <Menu>
          <Menu.Target>
            <button className="text-sm cursor-pointer flex gap-1 items-center text-white">
              Русский
              <IoIosArrowDown />
            </button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => changeLang('ru')}>Русский</Menu.Item>
            <Menu.Item onClick={() => changeLang('kz')}>Казахский</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>

      <div className="container-market flex items-center gap-4 justify-between w-full market !py-4">
        <Link to={'/market'}>
          <div className='flex gap-3 items-center'>
            <img className="max-w-[70px] w-full min-w-[50px] " src={mobileLogo} />
            <b className='text-2xl !font-extrabold'>DUKEN</b>
          </div>
        </Link>
        {/* <div className='flex'> */}
          {/* <Text lineClamp={1} className="flex items-center rounded-full rounded-r-none border whitespace-nowrap py-2 pl-4   text-slate-500">
            Все категории
          </Text> */}
          <TextInput
            placeholder="Поиск..."
            rightSection={<FaMagnifyingGlass color="white" />}
            className="max-w-sm w-full"
            classNames={{
              rightSection: 'bg-red-600 rounded-r-full',
              // input: '!rounded-l-none'
            }}
            radius='xl'
            size='md'
          />
        {/* </div> */}
        <div className="flex items-center gap-4">
          <ActionIcon className='!border !border-slate-200 !p-3 !h-12 !w-12 !rounded-full'>
            <FaRegBell size={'100%'} color='black' />
          </ActionIcon>
          <Link to={'/market/favorites'}>
            <Indicator 
              label={user?.favorites?.length} 
              size={18} 
              disabled={user?.favorites?.length === 0}
            >
              <ActionIcon className='!border !border-slate-200 !p-3 !h-12 !w-12 !rounded-full'>
                <FaRegHeart size={'100%'} color='black' />
              </ActionIcon>
            </Indicator>
          </Link>
          <Indicator 
            label={cartItems?.length} 
            size={18} 
            disabled={cartItems?.length === 0}
            processing
          >  
            <Link to={'/market/cart'}>
              <ActionIcon className='!border !border-slate-200 !p-3 !h-12 !w-12 !rounded-full'>
                <LuShoppingBag size={'100%'} color='black' />
              </ActionIcon>
            </Link>
          </Indicator>

          <Divider orientation="vertical" />

          {user?.id ? (
            <Link to={'/market/profile'}>
              <div className='flex items-center gap-4'>
                <div>
                  <p className='text-xl text-right'>{user?.fio}</p>
                  <p className='text-lg text-right -mt-1'>{formatNumber(user?.balance)} ₸</p>
                  <p className='text-xs text-slate-400 -mt-1.5 text-right'>{formatNumber(user?.bonuses)} бонусов</p>
                </div>
                <Avatar
                  record={user}
                  src={user?.avatar}
                  radius='xl'
                  size='lg'
                />
              </div>
            </Link>
          ) : (
            <Avatr
              radius='xl'
              size='lg'
            />
          )}

          
          
          {/* <Link to={'/market/profile'}>
            <ActionIcon>
              <p className="text-sm">Профиль</p>
            </ActionIcon>
          </Link> */}
        </div>
      </div>
    </div>
  )
}
