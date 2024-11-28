import React from 'react'
import { Menu, TextInput } from '@mantine/core'
import { Link } from 'react-router-dom'
import mobileLogo from 'shared/assets/images/logo1.png'
import { PiShoppingCartFill } from "react-icons/pi";
import { IoIosArrowDown } from 'react-icons/io';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";

export const MarketNavbar = () => {

  return (
    <div className='max-w-[1280px] mx-auto px-4 flex items-center gap-4 justify-between w-full mb-4'>
      <Link to={'/'}>
        <img
          className="max-w-[100px] ml-2 lg:ml-6 w-full min-w-[50px]"
          src={mobileLogo}
        />
      </Link>
      <TextInput 
        placeholder='Поиск...' 
        icon={<FaMagnifyingGlass color='black' />}
        className='max-w-sm w-full'
      />
      <div className='flex items-center gap-6'>
        <button className='flex flex-col items-center gap-1'>
          <PiShoppingCartFill size={30} color='red' />
          <p className='text-sm'>Корзина</p>
        </button>
        <button className='flex flex-col items-center gap-1'>
          <FaUserTie size={30} color='red' />
          <p className='text-sm'>Профиль</p>
        </button>
        <Menu>
          <Menu.Target>
            <button className='text-sm cursor-pointer flex gap-1 items-center'>
                Русский
              <IoIosArrowDown />
            </button>
          </Menu.Target>
          <Menu.Dropdown >
            <Menu.Item onClick={() => changeLang('ru')}>
              Русский
            </Menu.Item>
            <Menu.Item onClick={() => changeLang('kz')}>
              Казахский
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  )
}
