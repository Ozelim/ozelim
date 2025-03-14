import React from 'react'
import { BurgerMenu } from './BurgerMenu'
import { Link } from 'react-router-dom'

import { useLangContext } from 'app/langContext'

// const array = [
//   {labelkz: `Компания туралы`, labelru: 'О компании', link: '/about'},
//   {labelkz: `Денсаулық әлемі  `, labelru: 'Твое здоровье', link: '/health'},
//   {labelkz: `Туристік курстар`, labelru: 'Курсы по туризму', link: '/courses'},
// ]

const array2 = [
  {labelkz: 'Қор', labelru: 'Фонд', link: '/fund'},
  {labelkz: '⁠Денсаулық әлемі', labelru: 'Мир здоровья', link: '/health-world'},
  {labelkz: 'Дуальді оқыту', labelru: 'Дуальное обучение', link: '/dual'},
  {labelkz: '⁠OzElim турлары', labelru: 'Туры с OzElim', link: '/tours'},
  {labelkz: '⁠Сақтандыру', labelru: 'Страхование', link: '/insurance'},
  {labelkz: '⁠Құқықтық көмек', labelru: 'Правовая защита', link: '/rights'},
] 

export const Header = () => {

  const { lang } = useLangContext()

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
