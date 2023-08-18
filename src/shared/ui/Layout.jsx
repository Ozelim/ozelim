import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import ozelimlogo from 'shared/assets/images/logo-b-w.png'


export const Layout = ({subheaderSlot,  headerSlot, footerSlot}) => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <div className="w-full h-full flex justify-center bg-gradient-to-tl from-emerald-800 to-primary-500 ">
        <Link to={'/'}>
          <img className="max-w-[100px]" src={ozelimlogo} />
        </Link>
        <div className="w-full h-full">
          {subheaderSlot}
          {headerSlot}
        </div>
      </div>
      <div className="w-full h-full bg-zinc-50 md:py-10 py-5">
        <Outlet />
      </div>
      <div className="w-full h-full">{footerSlot}</div>
    </div>
  )
}
