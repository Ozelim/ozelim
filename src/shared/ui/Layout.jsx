import { Button } from '@mantine/core'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import ozelimlogo from 'shared/assets/images/logo.svg'

import { CgProfile } from 'react-icons/cg'
import { useAuth } from 'shared/hooks'
import { getImageUrl } from 'shared/lib'


export const Layout = ({subheaderSlot,  headerSlot, footerSlot}) => {

  const {user} = useAuth()

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <div className="w-full flex items-center border-b gap-4">
        <Link to={'/'}>
          <img className="max-w-[130px] ml-10" src={ozelimlogo} />
        </Link>
        <div className="w-full flex flex-col justify-center">
          {subheaderSlot}
          {headerSlot}
        </div>
      <div className='mr-10'>
        {!!user 
          ? 
            <Link to={'/profile'}>
              <div className='flex flex-col items-center gap-2 '>
                {user?.avatar 
                    ? <img src={getImageUrl(user, user?.avatar)} className='w-[40px] h-[40px] border-2 border-yellow-400 rounded-full ' />
                    : <CgProfile size={30}/>  
                  }
                <p className='hover:text-yellow-400'>
                  Профиль
                </p>
              </div>
            </Link>
          :  
            <Link to={'/login'}>
              <div className='flex flex-col items-center gap-2 '>
                <CgProfile size={30}/>
                <p className='hover:text-yellow-400'>
                  Авторизация
                </p>
              </div>
            </Link>
        }
      </div>
      </div>
      <div className="w-full h-full bg-zinc-50 md:py-10 py-5">
        <Outlet />
      </div>
      <div className="w-full h-full">{footerSlot}</div>
    </div>
  )
}
