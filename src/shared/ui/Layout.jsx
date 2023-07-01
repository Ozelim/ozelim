import React from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = ({headerSlot, footerSlot}) => {
  return (
    <div className='grid grid-rows-[auto_1fr_auto] min-h-screen'>
      {headerSlot}
      <Outlet/>
      {footerSlot}
    </div>
  )
}
