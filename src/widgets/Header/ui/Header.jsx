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
  {labelkz: `Денсаулық әлемі  `, labelru: 'Твое здоровье', link: '/health'},
  {labelkz: `Туристік курстар`, labelru: 'Курсы по туризму', link: '/courses'},
]

const array2 = [
  {labelru: 'Фонд', link: '/fund'},
  {labelru: 'Мир здоровья', link: '/health-world'},
  {labelru: 'Дуальное обучение', link: '/dual'},
  {labelru: 'Туры с OzElim', link: '/tours'},
  {labelru: 'Страхование', link: '/insurance'},
  {labelru: 'Правовая защита', link: '/rights'},
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
        <div>
          {/* <nav className="space-x-6 font-head">
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
            <Link
              className="text-teal-500 hover:text-yellow-400 text-sm lg:text-xl cursor-pointer hidden md:inline-block"
              to={'/price'}
            >
              {kz ? 'Қызметтер' : 'Услуги'}
            </Link>
          </nav> */}
          {/* <ContactInfo/> */}
          <nav className='space-x-6 font-head'>
            {array2.map((val, i) => {
              return (
                <Link
                  key={i}
                  className="text-teal-500 hover:text-yellow-400 text-sm lg:text-xl hidden md:inline-block"
                  to={val.link}
                >
                  {lang === 'kz' 
                    ? val?.labelkz ?? val.labelru
                    : val.labelru}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="ml-6">
          <BurgerMenu />
        </div>
      </div>
    </div>
  )
}
