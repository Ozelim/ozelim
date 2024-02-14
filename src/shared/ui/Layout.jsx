import { Button, clsx } from '@mantine/core'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { CgProfile } from 'react-icons/cg'
import { useAuth } from 'shared/hooks'
import { getImageUrl } from 'shared/lib'

import mobileLogo from 'shared/assets/images/logo.svg'

export const Layout = ({subheaderSlot,  headerSlot, footerSlot}) => {

  const {user} = useAuth()

  const {pathname} = useLocation()

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <div className="w-full flex items-center border-b gap-4">
        <Link to={'/'}>
          <img
            className="max-w-[130px] ml-2 lg:ml-6 w-full min-w-[70px]"
            src={mobileLogo}
          />
        </Link>
        <div className="w-full flex flex-col justify-center">
          {subheaderSlot}
          {headerSlot}
        </div>
        <div className="mr-2 lg:mr-6 grow shrink-0">
          {!!user ? (
            <Link to={'/profile'}>
              <div className="flex flex-col items-center gap-2">
                {user?.avatar ? (
                  <img
                    src={getImageUrl(user, user?.avatar)}
                    className="w-10 h-10 border-2 border-yellow-400 rounded-full"
                  />
                ) : (
                  <CgProfile size={30} />
                )}
                <p className="hover:text-yellow-400 text-sm hidden md:block">
                  Профиль
                </p>
              </div>
            </Link>
          ) : (
            <Link to={'/login'}>
              <div className="flex flex-col items-center gap-2 ">
                <CgProfile size={30} />
                <p className="hover:text-yellow-400 text-sm hidden md:block">
                  Авторизация
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
      <div
        className={clsx('w-full h-full md:py-10 py-5', {
          'bg-zinc-100': pathname === '/',
          'bg-zinc-50': pathname !== '/',
        })}
      >
        <Outlet />
      </div>
      <div className="w-full h-full">{footerSlot}</div>
    </div>
  )
}
