import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from 'shared/hooks'

export const MarketFooter = () => {

  const {pathname} = useLocation()

  const {user} = useAuth()

  if (pathname.includes('profile') && (user?.collectionName === 'merchants')) return 

  return (
    <div className='w-full mt-6 border-t pt-6 bg-white'>
      <div className="container-market market px-4 md:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-4 px-4">
          <div className="text-center sm:text-left">
            <p className='font-bold text-lg md:text-base'>Duken Ozelim</p>
            <div className="space-y-3 text-slate-500 cursor-pointer mt-4 md:mt-6">
              <p>Lorem, ipsum dolor.</p>
              <p>Lorem, ipsum dolor.</p>
              <p>Lorem, ipsum dolor.</p>
              <p>Lorem, ipsum dolor.</p>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <p className='font-bold text-lg md:text-base'>Полезные ссылки</p>
            <div className="space-y-3 text-slate-500 cursor-pointer mt-4 md:mt-6">
              <p>
                Lorem, ipsum dolor.
              </p>
              <p>
                Lorem, ipsum dolor.
              </p>
              <p>
                Lorem, ipsum dolor.
              </p>
              <p>
                Lorem, ipsum dolor.
              </p>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <p className='font-bold text-lg md:text-base'>Мой кабинет</p>
            <div className="space-y-3 text-slate-500 cursor-pointer mt-4 md:mt-6">
              <p>Lorem, ipsum dolor.</p>
              <p>Lorem, ipsum dolor.</p>
              <p>Lorem, ipsum dolor.</p>
              <p>
                <Link to={'/duken/login'}>
                  Войти в магазин
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='border-t pt-4 mt-4'>
        <div className="container-market text-center md:text-left px-4 md:px-0">
          {new Date().getFullYear()} © Duken Ozelim
        </div>
      </div>
    </div>
  )
}
