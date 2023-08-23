import React from 'react'
import { ContactInfo } from './ContactInfo'
import { BurgerMenu } from './BurgerMenu'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Popover, Tooltip } from '@mantine/core'
import { cities, regions } from 'shared/lib'

import { RiArrowDownSLine } from 'react-icons/ri'

const array = [
  {label: 'О компании', link: '/about'},
  {label: 'Твое здоровье', link: '/health'},
  {label: 'Курсы по туризму', link: '/courses'},
]

export const Header = () => {

  let [_, setSearchParams] = useSearchParams()

  // function handleRegionClick (val) {
  //   console.log(val);
  //   setSearchParams({city: val})
  // }
 
  return (
    <div className="w-full relative py-3">
      <div className="w-full relative flex justify-center items-center">
        <div className=''>

          <nav className="space-x-6 font-head">
            {array.map((val, i) => {
              return (
                <Link
                  key={i}
                  className="hover:text-yellow-400 text-sm lg:text-lg hidden md:inline-block"
                  to={val.link}
                >
                  {val.label}
                </Link>
              )
            })}
            <Popover
              classNames={{
                dropdown: 'grid grid-cols-3 gap-4 border p-4 rounded-primary',
              }}
            >
              <Popover.Target>
                <span className="hover:text-yellow-400 text-sm lg:text-lg cursor-pointer">
                  Наши курорты
                  <RiArrowDownSLine className="inline text-xl" />
                </span>
              </Popover.Target>
              <Popover.Dropdown>
                {regions.map((region, i) => {
                  return (
                    <Link to={`/resorts?region=${region}&page=1`} key={i}>
                      <span
                        className="hover:text-yellow-400 text-sm cursor-pointer text-black"
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
              className="hover:text-yellow-400 text-sm lg:text-lg cursor-pointer hidden md:inline-block"
              to={'/partners'}
            >
              Бизнес партнеры
            </Link>
          </nav>
          {/* <ContactInfo/> */}
        </div>
        <div className="ml-6">
          <BurgerMenu />
        </div>
      </div>
    </div>
  )
}
