import React from 'react'
import { clsx } from '@mantine/core'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { CgProfile } from 'react-icons/cg'
import { useAuth } from 'shared/hooks'
import { getImageUrl } from 'shared/lib'

import mobileLogo from 'shared/assets/images/logo1.png'
import { AiOutlineWhatsApp } from 'react-icons/ai'

export const NewLayout = ({headerSlot, footerSlot}) => {

  const {user} = useAuth()

  const {pathname} = useLocation()

  

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen market-scrollbar">
      {headerSlot}
      <Outlet/>
      {footerSlot}
    </div>
  )
}
