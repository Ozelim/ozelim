import React from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = ({subheaderSlot,  headerSlot, footerSlot}) => {
  return (
    <div className='grid grid-rows-[auto_1fr_auto] min-h-screen space-y-10'>
      <div>
        {subheaderSlot}
        {headerSlot}
      </div>
        <Outlet/>
      {footerSlot}
    </div>
  )
}
