import React from 'react'
import { ActionIcon, Divider, Menu, Avatar as Avatr, TextInput } from '@mantine/core'
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

export const MarketNavbar = () => {

  const {user} = useAuth()

  return (
    <div className="w-full">
      <div className="flex justify-end bg-black py-5 px-6 market gap-3">
        <p className='text-white '>+7 702 429 9146</p>
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
            <img className="max-w-[70px] ml-2 lg:ml-6 w-full min-w-[50px] " src={mobileLogo} />
            <b className='text-xl'>DUKEN</b>
          </div>
        </Link>
        <TextInput
          placeholder="Поиск..."
          rightSection={<FaMagnifyingGlass color="white" />}
          className="max-w-sm w-full"
          classNames={{
            rightSection: 'bg-red-600 rounded-r-full',
          }}
          radius='xl'
          size='md'
        />
        <div className="flex items-center gap-4">
          <ActionIcon className='!border !border-slate-200 !p-3 !h-12 !w-12 !rounded-full'>
            <FaRegBell size={'100%'} color='black' />
          </ActionIcon>
          <ActionIcon className='!border !border-slate-200 !p-3 !h-12 !w-12 !rounded-full'>
            <FaRegHeart size={'100%'} color='black' />
          </ActionIcon>
          <Link to={'/market/cart'}>
            <ActionIcon className='!border !border-slate-200 !p-3 !h-12 !w-12 !rounded-full'>
              <LuShoppingBag size={'100%'} color='black' />
            </ActionIcon>
          </Link>

          <Divider orientation="vertical" />

          {user?.id ? (
            <Link to={'/market/profile'}>
              <div className='flex items-center gap-4'>
                <div>
                  <p className='text-lg text-right'>{user?.balance} ₸</p>
                  <p className='text-xl text-right -mt-1'>{user?.fio}</p>
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
