import React from 'react'
import { Burger, Popover, clsx } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Link } from 'react-router-dom'
import { useLangContext } from 'app/langContext'

const array1 = [
  { labelru: 'Фонд', link: '/fund'},
  { labelru: 'Мир здоровье', link: '/health-world'},
  { labelru: 'Дуальное обучение', link: '/dual'},
  { labelru: 'Туры с Ozelim', link: '/tours'},
  { labelkz: `Сақтандыру`, labelru: 'Страхование', link: '/insurance'},
  { labelru: 'Правовая защита', link: '/rights'},
]

const array = [
  { labelkz: `Жаңалықтар`, labelru: 'Новости', link: '/news' },
  { labelkz: `Біздің туристер`, labelru: 'Наши туристы', link: '/partners', disabled: true },
  { labelkz: `Агентская программа`, labelru: 'Агентская программа', link: '/tourist' },
  // { labelkz: `Серiктестiк бағдарлама`, labelru: 'Партнерская программа', link: '/program' },
  // { labelkz: `Тестирование`, labelru: 'Тестирование', link: '/test-1&7-results', },
  { labelkz: `Біздің команда`, labelru: 'Наша команда', link: '/our-team', },
]

const array2 = [
  // {labelkz: `Компания туралы`, labelru: 'О компании', link: '/about' },
  // {labelkz: `Сенің денсаулығың`, labelru: 'Твое здоровье', link: '/health' },
  // {labelkz: `Туристік курстар`, labelru: 'Курсы по туризму', link: '/courses' },
  // {labelkz: `Санаторилар`, labelru: 'Санатории', link: '/resorts' },
  {labelkz: `Қызметтер`, labelru: 'Услуги', link: '/price' },
]
 
export const BurgerMenu = () => {

  const {kz} = useLangContext()

  const [opened, { toggle }] = useDisclosure(false)

  const matches = useMediaQuery('(min-width: 767px)');
  
  return (
    <Popover opened={opened} onChange={toggle}>
      <Popover.Target>
        <Burger color='black' opened={opened} onClick={toggle} />
      </Popover.Target>
      <Popover.Dropdown>
        <nav>
          <ul className="flex flex-col space-y-2">
            {!matches && array1.map((val, i) => {
              return (
                <li key={i} className={clsx("hover:text-primary-500 font-head", {
                  'pointer-events-none opacity-50': val?.disabled,
                })}>
                  <Link to={val.link}>
                    {kz ? val.labelkz : val.labelru}
                  </Link>
                </li>
              )
            })}
            {array.map((val, i) => {
              return (
                <li key={i} className={clsx("hover:text-primary-500 font-head", {
                  'pointer-events-none opacity-50': val?.disabled,
                })}>
                  <Link to={val.link}>
                    {kz ? val.labelkz : val.labelru}
                  </Link>
                </li>
              )
            })}
            {array2.map((val, i) => {
              return (
                <li
                  key={i}
                  className="hover:text-primary-500 font-head lg:hidden"
                >
                  <Link to={val.link}>
                    {kz ? val.labelkz : val.labelru}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </Popover.Dropdown>
    </Popover>
  )
}
