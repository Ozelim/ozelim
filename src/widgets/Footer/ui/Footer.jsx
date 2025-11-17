import React from 'react'
import ozelimlogo from 'shared/assets/images/logo.svg'
import dayjs from 'dayjs'
import { Menu, Modal } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'

import test from 'shared/assets/images/policy.pdf'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import dog from 'shared/assets/images/dogone.pdf'
import { useLangContext } from 'app/langContext'

const date = new Date()

export const Footer = () => {

  const {pathname} = useLocation()

  const [params] = useSearchParams()

  const {kz, changeLang} = useLangContext()

  const navigate = useNavigate()

  const [opened, { open, close }] = useDisclosure(false)

  const [d, setD] = React.useState(false)

  const matches = useMediaQuery(`(min-width: 767px)`)

  function fck () {
    navigate('/')
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }

  if (pathname.includes('chat') || params.get('chatId') || pathname.includes('duken')) return null

  return (
    <>
      <footer className="bg-primary relative">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6  md:mb-0">
              <a href="https://oz-elim.kz" className="flex items-center">
                <img
                  src={ozelimlogo}
                  className="max-w-[100px] mr-3"
                  alt="OzElim Logo"
                />
              </a>
            </div>
            <div className='text text-white text-left mb-4 md:mb-0'>
              <p>
                ТОО «OzElim»
              </p>
              <p>
                БИН: 221140000992
              </p>
              <div>
              <Menu>
                <Menu.Target>
                  <div className='inline cursor-pointer'>
                    140000
                  </div>
                  {/* <p className='font-bold text-primary-500 cursor-pointer flex gap-2 items-center'>
                    {kz ? 'Каз': 'Рус'}
                    <IoIosArrowDown />
                  </p> */}
                </Menu.Target>
                <Menu.Dropdown >
                  <Menu.Item onClick={() => changeLang('ru')}>
                    Рус
                  </Menu.Item>
                  <Menu.Item onClick={() => changeLang('kz')}>
                    Каз
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu> г. Павлодар, ул. Гагарина 50
              </div>
              <p>
                e-mail: support@oz-elim.kz
              </p>
              <p>Служба поддержки: +7 (747) 051 2252</p>
              
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-2 sm:grid-cols-3">
              <div>
                <ul className="text-white font-medium">
                  <li className="sm:mb-4">
                    <a
                      href="https://oz-elim.kz/about"
                      className="hover:underline"
                    >
                      {kz ? 'Компания туралы' : 'О Компании'}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://oz-elim.kz/health"
                      className="hover:underline"
                    >
                      {kz ? `Сенің денсаулығың`: `Твое здоровье`}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="text-white font-medium">
                  <li className="sm:mb-4">
                    {/* <Link to="jopa"> */}
                      <span
                        // href="https://oz-elim.kz/price"
                        className="hover:underline "
                        onClick={fck}
                      >
                        
                        {kz ? `Серiктестiк` : `Сотрудничество`}
                      </span>
                    {/* </Link> */}
                  </li>
                  <li className="mb-4">
                  <span onClick={matches ? () => setD(true) : () => {}} className="hover:underline">
                    {matches 
                      ? kz ? `Келісімшарт` : 'Договор оферты'
                      :
                        <a
                          href="/dogone.pdf"
                          target='_blank'
                        >
                          {kz ? `Келісімшарт` : `Договор оферты`}
                        </a>
                    }
                  </span>                    
                  </li>
                </ul>
              </div>
              <div>
                <ul className="text-white font-medium">
                  <li className="sm:mb-4">
                    <a
                      href="https://oz-elim.kz/courses"
                      className="hover:underline"
                    >
                      {kz ? `Курстар` : `Курсы` }
                    </a>
                  </li>

                  <li>
                    <span onClick={matches ? open : () => {}} className="hover:underline">
                      {matches 
                        ? kz ? `Құпия саясаты` : 'Политика конфиденциальности'
                        : <a href={'/policy.pdf'} target='_blank' rel='noreferrer'>{kz ? `Құпиялылық саясаты` : `Политика конфиденциальности`} </a>
                      }
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between ">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © {dayjs(date).format('YYYY ')}
              <a href="https://oz-elim.kz/" className="hover:underline">
                Oz-Elim.kz™
              </a>
              . All Rights Reserved.
            </span>
            {/* <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <BsTelegram className="text-xl flex-shrink-0" color="blue" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCOm22rq5ELyWBJWNImiv3Ww"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <BsYoutube className="text-xl flex-shrink-0" color="red" />
              </a>
              <a
                href="https://instagram.com/oz_elim_14?igshid=MzRlODBiNWFlZA=="
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <BsInstagram className="text-xl flex-shrink-0" color="hotpink" />
              </a>
              <a
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <BsTiktok className="text-xl flex-shrink-0" color="black" />
              </a>
            </div> */}
          </div>
        </div>
      </footer>
      <Modal
        opened={opened} 
        onClose={close} 
        centered 
        size={'xl'}
      >
        <iframe 
          className="w-full h-screen" 
          src={test} 
          frameBorder="0" 
        />
      </Modal>
      <Modal
        opened={d} 
        onClose={setD} 
        centered 
        size={'xl'}
      >
        <iframe 
          className="w-full h-screen" 
          src={dog} 
          frameBorder="0" 
        />
      </Modal>
    </>
  )
}
