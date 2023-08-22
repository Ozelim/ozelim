import { Button } from '@mantine/core'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import ozelimlogo from 'shared/assets/images/logo.svg'

import { CgProfile } from 'react-icons/cg'
import { useAuth } from 'shared/hooks'
import { getImageUrl } from 'shared/lib'

import mobileLogo from 'shared/assets/images/ico.svg'

export const Layout = ({subheaderSlot,  headerSlot, footerSlot}) => {

  const {user} = useAuth()

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <div className="w-full flex items-center border-b gap-4">
        <Link to={'/'}>
          <picture>
            <source media="(min-width:650px)" srcSet={ozelimlogo} />
            {/* <source media="(min-width:465px)" srcset="img_white_flower.jpg"/> */}
            <img className="max-w-[130px] ml-2 lg:ml-6 w-full min-w-[70px]" src={mobileLogo} />
          </picture>
        </Link>
        <div className="w-full flex flex-col justify-center">
          {subheaderSlot}
          {headerSlot}
        </div>
        <div className="mr-2 lg:mr-6">
          {!!user ? (
            <Link to={'/profile'}>
              <div className="flex flex-col items-center gap-2">
                {user?.avatar ? (
                  <img
                    src={getImageUrl(user, user?.avatar)}
                    className="md:w-[40px] md:h-[40px] border-2 border-yellow-400 rounded-full "
                  />
                ) : (
                  <CgProfile size={30} />
                )}
                <p className="hover:text-yellow-400 text-sm hidden md:block">Профиль</p>
              </div>
            </Link>
          ) : (
            <Link to={'/login'}>
              <div className="flex flex-col items-center gap-2 ">
                <CgProfile size={30} />
                <p className="hover:text-yellow-400 text-sm hidden md:block">Авторизация</p>
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="w-full h-full bg-zinc-50 md:py-10 py-5">
        <Outlet />
      </div>
      <div className="w-full h-full">{footerSlot}</div>
    </div>
  )
}
