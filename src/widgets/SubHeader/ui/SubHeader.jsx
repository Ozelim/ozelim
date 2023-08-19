import React from 'react'
import { CgPhone } from 'react-icons/cg'
import Telegram from 'shared/assets/icons/Telegram.svg'
import WhatsApp from 'shared/assets/icons/WhatsApp.svg'
import Instagram from 'shared/assets/icons/Instagram.svg'
import TikTok from 'shared/assets/icons/TikTok.svg'
import YouTube from 'shared/assets/icons/YouTube.svg'

export const SubHeader = () => {
  return (
    <div className="w-full text-white">
      <div className="flex justify-center py-3 border-b\">
        <a href="#" className="flex items-center border-r pr-4 mr-2 md:mr-4">
          <CgPhone className="text-xl flex-shrink-0" />
          <span className="hover:text-yellow-200 ml-2 text-sm hidden md:block">+7-777-747-7788</span>
        </a>
        <a href="#" className="flex items-center border-r pr-4 mr-2 md:mr-4">
          <img src={Telegram} className="w-6" />
          <span className="ml-2 hover:text-yellow-200 text-sm hidden md:block">Telegram</span>
        </a>
        <a href="#" className="flex items-center border-r pr-4 mr-2 md:mr-4">
          <img src={WhatsApp} className="w-6" />
          <span className="ml-2 hover:text-yellow-200 text-sm hidden md:block">WhatsApp</span>
        </a>
        <a href="#" className="flex items-center border-r pr-4 mr-2 md:mr-4">
          <img src={YouTube} className="w-6" />
          <span className="ml-2 hover:text-yellow-200 text-sm hidden md:block">YouTube</span>
        </a>
        <a href="#" className="flex items-center border-r pr-4 mr-2 md:mr-4">
          <img src={Instagram} className="w-6" />
          <span className="ml-2 hover:text-yellow-200 text-sm hidden md:block">Instagram</span>
        </a>
        <a href="#" className="flex items-center">
          <img src={TikTok} className="w-6" />
          <span className="ml-2 hover:text-yellow-200 text-sm hidden md:block">TikTok</span>
        </a>
      </div>
    </div>
  )
}
