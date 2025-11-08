import React from 'react'
import { clsx } from '@mantine/core'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { CgProfile } from 'react-icons/cg'
import { useAuth } from 'shared/hooks'
import { getImageUrl } from 'shared/lib'

import mobileLogo from 'shared/assets/images/logo1.png'
import { AiOutlineWhatsApp } from 'react-icons/ai'

export const Layout = ({ subheaderSlot, headerSlot, footerSlot }) => {
  
  const { user } = useAuth()

  const { pathname } = useLocation()

  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        {/* <div className="w-full flex items-center border-b gap-4"> */}

          {/* <div className="w-full flex flex-col justify-center"> */}
            {/* {subheaderSlot} */}
            {headerSlot}
          {/* </div> */}

        {/* </div> */}
        <div
          className={clsx('w-full h-full md:py-8 py-5', {
            'bg-zinc-100': pathname === '/',
            'bg-zinc-50': pathname !== '/',
          })}
        >
          <Outlet />
        </div>
        <div className="w-full h-full">{footerSlot}</div>
      </div>
      {/* <div className="cursor-pointer fixed bottom-4 right-4 border border-solid border-gray-300 rounded-full p-4 hover:bg-teal-600 hover:text-white transition-all group">
        <AiOutlineWhatsApp className="text-3xl flex-shrink-0 text-primary-500 group-hover:text-white" />
      </div> */}
    </>
  )
}
