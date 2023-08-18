import React from 'react'
import { ContactInfo } from './ContactInfo'
import { BurgerMenu } from './BurgerMenu'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Popover, Tooltip } from '@mantine/core'
import { cities, regions } from 'shared/lib'

import { RiArrowDownSLine } from 'react-icons/ri'

export const Header = () => {

  let [_, setSearchParams] = useSearchParams()

  // function handleRegionClick (val) {
  //   console.log(val);
  //   setSearchParams({city: val})
  // }
 
  return (
    <div className="w-full min-h-500px relative ">
      <div>
        <div className="w-full relative flex justify-center items-center">
          <div className='text-white'>
            <nav className="space-x-6 font-head">
              <Link
                className="hover:text-primary-500 md:text-lg hidden md:inline-block"
                to={'/about'}
              >
                О компании
              </Link>
              <Link
                className="hover:text-primary-500 md:text-lg hidden md:inline-block"
                to={'/health'}
              >
                Твое здоровье
              </Link>
              <Link
                className="hover:text-primary-500 md:text-lg hidden md:inline-block"
                to={'/courses'}
              >
                Курсы по туризму
              </Link>
              <Popover
                classNames={{
                  dropdown: 'grid grid-cols-3 gap-4 border p-4 rounded-primary',
                }}
              >
                <Popover.Target>
                  <span className="hover:text-primary-500 md:text-lg cursor-pointer">
                    Наши курорты
                    <RiArrowDownSLine className="inline text-xl" />
                  </span>
                </Popover.Target>
                <Popover.Dropdown>
                  {regions.map((region, i) => {
                    return (
                      <Link to={`/resorts?region=${region}&page=1`} key={i}>
                        <span
                          className="hover:text-primary-500 text-sm cursor-pointer"
                          // onClick={() => handleRegionClick(city)}
                        >
                          {region}
                        </span>
                      </Link>
                    )
                  })}
                </Popover.Dropdown>
              </Popover>
              <Link
                className="hover:text-primary-500 md:text-lg cursor-pointer hidden md:inline-block"
                to={'/partners'}
              >
                Бизнес партнеры
              </Link>
            </nav>
            {/* <ContactInfo/> */}
          </div>
          <BurgerMenu />
        </div>
      </div>
    </div>
  )
}
