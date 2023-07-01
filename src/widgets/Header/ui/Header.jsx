import React from 'react'
import { ContactInfo } from './ContactInfo'
import { BurgerMenu } from './BurgerMenu'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='w-full border-b'>
      <div className="container">
        <div className='w-full relative flex justify-between items-center py-4'>
          <Link>
            <div className='w-14 h-14 bg-slate-400 rounded-full'/>
          </Link>
          <div>
            <nav className='space-x-6 font-head font-bold'>
              <Link className='hover:text-primary-500 transition-all duration-100' to={'/about'}>О компании</Link>
              <Link className='hover:text-primary-500 transition-all duration-100' to={'/health'}>Твое здоровье</Link>
              <Link className='hover:text-primary-500 transition-all duration-100' to={'/courses'}>Курсы по туризму</Link>
              <Link className='hover:text-primary-500 transition-all duration-100' to={'/resorts'}>Наши курорты</Link>
              <Link className='hover:text-primary-500 transition-all duration-100' to={'/partners'}>Бизнес партнеры</Link>
            </nav>
            {/* <ContactInfo/> */}
          </div>
          
          <BurgerMenu/>
        </div>
      </div>
    </div>
  )
}

