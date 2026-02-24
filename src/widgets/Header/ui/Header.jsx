import React from 'react'
import { BurgerMenu } from './BurgerMenu'
import { Link } from 'react-router-dom'
import { getImageUrl } from 'shared/lib'
import { useAuth } from 'shared/hooks'
import { BiGlobe } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { ActionIcon, Menu } from '@mantine/core'

import { useLangContext } from 'app/langContext'

import mobileLogo from 'shared/assets/images/logo1.png'
import { IoIosArrowDown } from 'react-icons/io'
import { BsWhatsapp } from 'react-icons/bs'

const array2 = [
  { labelkz: 'Басты бет', labelru: 'Главная', link: '/' },
  { labelkz: 'Қор', labelru: 'Фонд', link: '/fund' },
  // { labelkz: '⁠Денсаулық әлемі', labelru: 'Мир здоровья', link: '/health-world' },
  // { labelkz: 'Дуальді оқыту', labelru: 'Дуальное обучение', link: '/dual' },
  { labelkz: '⁠OzElim турлары', labelru: 'Туры с OzElim', link: '/tours' },
  { labelkz: '⁠Сақтандыру', labelru: 'Страхование', link: '/insurance' },
  { labelkz: '⁠Құқықтық көмек', labelru: 'Правовая защита', link: '/rights' },
]

export const Header = () => {
  const { lang } = useLangContext()

  return (
    <div className="w-full relative py-3">
      <div className="w-full relative flex justify-center items-center">
        <nav className="space-x-6 font-head">
          {array2.map((val, i) => {
            return (
              <Link
                key={i}
                className="text-teal-500 hover:text-yellow-400 text-sm lg:text-xl hidden md:inline-block"
                to={val.link}
              >
                {lang === 'kz' ? val?.labelkz ?? val.labelru : val.labelru}
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

export const Header2 = () => {
  const { kz, changeLang, qq, lang } = useLangContext()

  const { user } = useAuth()

  console.log(user, 'user');
  

  return (
    <header className="border-b bg-white z-10">
      <div className="container mx-auto flex items-center justify-between py-1">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative">
            <Link to={'/'}>
              <img className="max-w-[80px] lg:ml-6 w-full min-w-[70px]" src={mobileLogo} />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {array2.map((val, i) => {
              return (
                <Link
                  key={i}
                  className="text-sm text-foreground hover:text-primary transition-colors tracking-wider"
                  to={val.link}
                >
                  {lang === 'kz' ? val?.labelkz ?? val.labelru : val.labelru}
                </Link>
              )
            })}
          </nav>

          {/* <div className='block md:hidden'>
            <BurgerMenu/>
          </div> */}
        </div>

        {/* Right side: Search, Globe, Avatar */}
        <div className="flex items-center gap-4">
          <div className="flex md:gap-2 items-center">
            <BsWhatsapp className="text-xl flex-shrink-0" color="green" />
            <div className="flex flex-col">
              <span className="ml-2 hover:text-yellow-400 text-md hidden md:block whitespace-nowrap">
                +7 747 051 2252
              </span>
              <span className="hidden md:inline-block text-sm text-gray-400 -mt-1">
                Служба поддержки
              </span>
            </div>
          </div>
          {/* Globe Icon */}

          <Menu className="md:ml-3">
            <Menu.Target>
              <p className="text-sm md:text-base cursor-pointer flex gap-2 items-center">
                {kz ? 'каз' : 'рус'}
                <IoIosArrowDown />
              </p>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => changeLang('ru')}>Русский</Menu.Item>
              <Menu.Item onClick={() => changeLang('kz')}>Казахский</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          {/* <ActionIcon
            className="rounded-full p-2 hover:bg-accent transition-colors"
            size={30}
            variant="filled"
            color="teal"
          >
            <BiGlobe className="text-muted-foreground" size={20} />
          </ActionIcon> */}

          {/* User Avatar */}
          <div className="mr-2 lg:mr-6 grow shrink-0">
            {!!user ? (
              <Link to={user?.collectionName === 'agents' ? '/aprofile' : '/profile'}>
                <div className="flex flex-col items-center gap-2">
                  {user?.avatar ? (
                    <img
                      src={getImageUrl(user, user?.avatar)}
                      className="w-10 h-10 border-2 border-yellow-400 rounded-full"
                    />
                  ) : (
                    <CgProfile size={30} />
                  )}
                  {/* <p className="hover:text-yellow-400 text-sm hidden md:block">
                    Профиль
                  </p> */}
                </div>
              </Link>
            ) : (
              <Link to={'/login'}>
                <div className="flex flex-col items-center gap-2 ">
                  <CgProfile size={30} />
                  {/* <p className="hover:text-yellow-400 text-sm hidden md:block">
                    Авторизация
                  </p> */}
                </div>
              </Link>
            )}
          </div>
          {/* <Avatar className="h-10 w-10">
            <AvatarImage src="/diverse-user-avatars.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar> */}
        </div>
      </div>
      <nav className="grid grid-cols-2 md:hidden gap-4 container pb-2">
        {array2.map((val, i) => {
          return (
            <Link
              key={i}
              className="text-sm text-foreground hover:text-primary transition-colors tracking-wider"
              to={val.link}
            >
              {lang === 'kz' ? val?.labelkz ?? val.labelru : val.labelru}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
