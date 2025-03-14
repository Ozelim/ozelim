import React from 'react'
import { Menu } from '@mantine/core'
import {
  BsWhatsapp,
} from 'react-icons/bs'
import { useLangContext } from 'app/langContext'

import { IoIosArrowDown } from "react-icons/io";


export const SubHeader = () => {

  const {kz, changeLang, qq} = useLangContext()

  return (
    <div className="w-full">
      <div className="flex justify-center py-3 border-b">
        <div>
          <a href="https://wa.me/77470512252" className="flex items-center">
            <p className="text-sm md:text-base text-zinc-400">{kz ? `Бізбен байланысыңыз`: 'Служба поддержки'}:</p>
            <p className='text-sm md:text-base text-zinc-400 ml-1'>напишите на Whatsapp</p>
            <BsWhatsapp className="text-xl flex-shrink-0 ml-3" color="green" />
            <span className="ml-2 hover:text-yellow-400 text-md hidden md:block">
              +7 747 051 2252
            </span>
          </a>
          <p className='text-center text-[13px] text-slate-500 -mt-0.5'>
            {qq('Понедельник-пятница, 09:00 - 18:00', 'Дүйсенбі-жұма, 09:00 - 18:00')}
          </p>
        </div>
        <Menu className='ml-12' >
          <Menu.Target>
            <p className='text-sm md:text-base font-bold text-primary-500 cursor-pointer flex gap-2 items-center'>
              {kz ? 'Каз': 'Рус'}
              <IoIosArrowDown />
            </p>
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
