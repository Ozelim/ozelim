import React from 'react'
import { Burger, Popover, clsx } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Link } from 'react-router-dom'

const array = [
  { label: 'Новости компании', link: '/news' },
  { label: 'Прайс лист', link: '/price' },
  { label: 'Партнерская программа', link: '/program' },
  { label: 'Наша команда', link: '/our-team', disabled: true },
  { label: 'Благотворительный фонд', link: '/charity-fund', disabled: true },
]

const array2 = [
  { label: 'О компании', link: '/about' },
  { label: 'Твое здоровье', link: '/health' },
  { label: 'Курсы по туризму', link: '/courses' },
  { label: 'Бизнес партнеры', link: '/partners' },
]

export const BurgerMenu = () => {
  const [opened, { toggle }] = useDisclosure(false)
  return (
    <Popover opened={opened} onChange={toggle}>
      <Popover.Target>
        <Burger color='black' opened={opened} onClick={toggle} />
      </Popover.Target>
      <Popover.Dropdown>
        <nav>
          <ul className="flex flex-col space-y-2">
            {array.map((val, i) => {
              return (
                <li key={i} className={clsx("hover:text-primary-500 font-head", {
                  'pointer-events-none opacity-50': val?.disabled
                })}>
                  <Link to={val.link}>{val.label}</Link>
                </li>
              )
            })}
            {array2.map((val, i) => {
              return (
                <li
                  key={i}
                  className="hover:text-primary-500 font-head lg:hidden"
                >
                  <Link to={val.link}>{val.label}</Link>
                </li>
              )
            })}
          </ul>

        </nav>
      </Popover.Dropdown>
    </Popover>
  )
}
