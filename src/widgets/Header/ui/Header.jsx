import React from 'react'
import { ContactInfo } from './ContactInfo'
import { BurgerMenu } from './BurgerMenu'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Popover, Switch, Tooltip } from '@mantine/core'
import { cities, regions } from 'shared/lib'

import { RiArrowDownSLine } from 'react-icons/ri'
import { useLangContext } from 'app/langContext'

const array = [
  {labelkz: `Компания туралы`, labelru: 'О компании', link: '/about'},
  {labelkz: `Сенің денсаулығың`, labelru: 'Твое здоровье', link: '/health'},
  {labelkz: `Туристік курстар`, labelru: 'Курсы по туризму', link: '/courses'},
]

export const Header = () => {

  const { lang, kz, handleLang } = useLangContext()

  // function handleRegionClick (val) {
  //   console.log(val);
  //   setSearchParams({city: val})
  // }
 
  return (
    <div className="w-full relative py-3">
      <div className="w-full relative flex justify-center items-center">
        <div className="">
          <nav className="space-x-6 font-head">
            {array.map((val, i) => {
              return (
                <Link
                  key={i}
                  className="text-teal-500 hover:text-yellow-400 text-sm lg:text-xl hidden md:inline-block"
                  to={val.link}
                >
                  {lang === 'kz' 
                    ? val.labelkz ?? val.labelru
                    : val.labelru}
                </Link>
              )
            })}
            <Link
              className="text-teal-500 hover:text-yellow-400 text-sm lg:text-xl cursor-pointer hidden md:inline-block"
              to={'/resorts'}
            >
              {kz ? 'Санаториялар' : `Санатории`}
            </Link>
            {/* <Popover
              classNames={{
                dropdown: 'grid grid-cols-3 gap-4 border p-4 rounded-primary',
              }}
            >
              <Popover.Target>
                <span className="whitespace-nowrap text-teal-500 hover:text-yellow-400 text-sm lg:text-xl cursor-pointer">
                  {kz ? 'Санаторийлер' : `Санатории`}
                  <RiArrowDownSLine className="inline text-xl" />
                </span>
              </Popover.Target>
              <Popover.Dropdown>
                {regions.map((region, i) => {
                  return (
                    <Link to={`/resorts?region=${region}`} key={i}>
                      <span
                        className="hover:text-yellow-400 text-sm cursor-pointer text-teal-500"
                        // onClick={() => handleRegionClick(city)}
                      >
                        {region}
                      </span>
                    </Link>
                  )
                })}
              </Popover.Dropdown>
            </Popover> */}
            <Link
              className="text-teal-500 hover:text-yellow-400 text-sm lg:text-xl cursor-pointer hidden md:inline-block"
              to={'/price'}
            >
              {kz ? 'Қызметтер' : 'Услуги'}
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
