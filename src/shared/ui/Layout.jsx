import React from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = ({subheaderSlot,  headerSlot, footerSlot}) => {
  return (
    <div className='grid grid-rows-[auto_1fr_auto] min-h-screen '>
      <div>
        {subheaderSlot}
        {headerSlot}
      </div>
      <div className='bg-zinc-50 pt-10'>

        <Outlet/>
      </div>
      {footerSlot}
    </div>
  )
}
