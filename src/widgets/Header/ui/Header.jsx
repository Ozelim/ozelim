import React from 'react'
import { ContactInfo } from './ContactInfo'
import { BurgerMenu } from './BurgerMenu'
import { Link, useSearchParams } from 'react-router-dom'
import { Popover, Tooltip } from '@mantine/core'
import { cities } from 'shared/lib'

import { RiArrowDownSLine } from 'react-icons/ri'

export const Header = () => {

  let [_, setSearchParams] = useSearchParams()

  // function handleRegionClick (val) {
  //   console.log(val);
  //   setSearchParams({city: val})
  // }

  return (
    <div className='w-full border-b'>
      <div className="container">
        <div className='w-full relative flex justify-between items-center py-4'>
          <Link to={'/'}>
            <div className='w-14 h-14 bg-slate-400 rounded-full'/>
          </Link>
          <div>
            <nav className='space-x-6 font-head font-bold'>
              <Link className='hover:text-primary-500' to={'/about'}>О компании</Link>
              <Link className='hover:text-primary-500' to={'/health'}>Твое здоровье</Link>
              <Link className='hover:text-primary-500' to={'/courses'}>Курсы по туризму</Link>
              <Popover 
                classNames={{
                  dropdown: 'grid grid-cols-3 gap-4 border p-4 rounded-primary'
                }}
              >
                <Popover.Target>
                  <span className='hover:text-primary-500 cursor-pointer'>
                    Наши курорты
                    <RiArrowDownSLine className='inline text-xl'/>
                  </span>
                </Popover.Target>
                <Popover.Dropdown>
                  {cities.map((city, i) => {
                    return (
                      <Link to={`/resorts?city=${city}`} key={i}>
                        <span 
                          className='hover:text-primary-500 cursor-pointer'
                          // onClick={() => handleRegionClick(city)}
                        >
                            {city}
                          </span>
                      </Link>
                    )
                  })}
                </Popover.Dropdown>
              </Popover>
              <Link className='hover:text-primary-500' to={'/partners'}>Бизнес партнеры</Link>
            </nav>
            {/* <ContactInfo/> */}
          </div>
          <BurgerMenu/>
        </div>
      </div>
    </div>
  )
}

