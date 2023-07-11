import React from 'react'
import { CgPhone } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import Telegram from 'shared/assets/icons/Telegram.svg'
import WhatsApp from 'shared/assets/icons/WhatsApp.svg'
import Instagram from 'shared/assets/icons/Instagram.svg'
import TikTok from 'shared/assets/icons/TikTok.svg'
import YouTube from 'shared/assets/icons/YouTube.svg'

export const SubHeader = () => {
  return (
    <div className="flex justify-center gap-5 pt-4">
      <a href="#" className="flex items-center">
        <CgPhone className="text-xl flex-shrink-0" />
        <span className="hover:text-primary-500 ml-2">+7-777-747-7788</span>
      </a>
      <a href="#" className="flex items-center">
        <img src={Telegram} className="w-6" />
        <span className="ml-2 hover:text-primary-500">Telegram</span>
      </a>
      <a href="#" className="flex items-center">
        <img src={WhatsApp} className="w-6" />
        <span className="ml-2 hover:text-primary-500">WhatsApp</span>
      </a>
      <a href="#" className="flex items-center">
        <img src={YouTube} className="w-6" />
        <span className="ml-2 hover:text-primary-500">YouTube</span>
      </a>
      <a href="#" className="flex items-center">
        <img src={Instagram} className="w-6" />
        <span className="ml-2 hover:text-primary-500">Instagram</span>
      </a>
      <a href="#" className="flex items-center">
        <img src={TikTok} className="w-6" />
        <span className="ml-2 hover:text-primary-500">TikTok</span>
      </a>
    </div>
  )
}
