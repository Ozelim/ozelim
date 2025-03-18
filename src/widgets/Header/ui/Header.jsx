import React from 'react'
import { BurgerMenu } from './burger-menu'
import { Link } from 'react-router-dom'

import { useLangContext } from 'app/langContext'

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
 
  return (
    <div className="w-full relative py-3">
      <div className="w-full relative flex justify-center items-center">
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
        <div className="ml-6">
          <BurgerMenu />
        </div>
      </div>
    </div>
  )
}
