import React from 'react'
import { Burger, Popover, clsx } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { Link } from 'react-router-dom'
import { useLangContext } from 'app/langContext'

const array1 = [
  { labelkz: 'Қор', labelru: 'Фонд', link: '/fund'},
  // { labelkz: '⁠Денсаулық әлемі', labelru: 'Мир здоровье', link: '/health-world'},
  // { labelkz: 'Дуальді оқыту', labelru: 'Дуальное обучение', link: '/dual'},
  { labelkz: '⁠OzElim турлары', labelru: 'Туры с Ozelim', link: '/tours'},
  { labelkz: '⁠Сақтандыру', labelkz: `Сақтандыру`, labelru: 'Страхование', link: '/insurance'},
  { labelkz: '⁠Құқықтық көмек', labelru: 'Правовая защита', link: '/rights'},
]

const array = [
  // { labelkz: `Жаңалықтар`, labelru: 'Новости', link: '/news' },
  // { labelkz: `Біздің туристер`, labelru: 'Наши туристы', link: '/partners', disabled: true },
  // { labelkz: `Агенттік бағдарлама`, labelru: 'Агентская программа', link: '/tourist' },
  // { labelkz: `Біздің команда`, labelru: 'Наша команда', link: '/our-team', },
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
          </ul>
        </nav>
      </Popover.Dropdown>
    </Popover>
  )
}
