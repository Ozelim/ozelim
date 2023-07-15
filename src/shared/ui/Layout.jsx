import React from 'react'
import { Outlet } from 'react-router-dom'

export const Layout = ({subheaderSlot,  headerSlot, footerSlot}) => {
  return (
    <div className='grid grid-rows-[auto_1fr_auto] min-h-screen '>
      <div className='w-full h-full'>
        {/* {subheaderSlot} */}
        {/* {headerSlot} */}
      </div>
      <div className='w-full h-full bg-zinc-50 pt-10'>
        <Outlet/>
      </div>
      <div className='w-full h-full pt-10'>
        {footerSlot}
      </div>
    </div>
  )
}
