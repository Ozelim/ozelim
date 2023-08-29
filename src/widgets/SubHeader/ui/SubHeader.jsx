import React from 'react'
import { CgPhone } from 'react-icons/cg'
import Telegram from 'shared/assets/icons/Telegram.svg'
import WhatsApp from 'shared/assets/icons/WhatsApp.svg'
import Instagram from 'shared/assets/icons/Instagram.svg'
import TikTok from 'shared/assets/icons/TikTok.svg'
import YouTube from 'shared/assets/icons/YouTube.svg'

import {
  BsTelegram,
  BsWhatsapp,
  BsYoutube,
  BsInstagram,
  BsTiktok,
} from 'react-icons/bs'

export const SubHeader = () => {
  return (
    <div className="w-full ">
      <div className="flex justify-center py-3 border-b\">
        <a href="#" className="flex items-center">
          <p className='mr-4 text-zinc-400'>Свяжитесь с нами:</p>
          <BsWhatsapp className="text-xl flex-shrink-0" color="green" />
          {/* <img src={WhatsApp} className="w-6" /> */}
          <span className="ml-2 hover:text-yellow-400 text-md hidden md:block ">
            +7-777-747-7788
          </span>
        </a>
      </div>
    </div>
  )
}
