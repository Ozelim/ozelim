import React from 'react'
import ozelimlogo from 'shared/assets/images/logo.svg'
import dayjs from 'dayjs'
import { BsInstagram, BsTelegram, BsTiktok, BsYoutube } from 'react-icons/bs'
import { Modal } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'

import test from 'shared/assets/images/policy.pdf'
import { Link, useNavigate } from 'react-router-dom'
import dog from 'shared/assets/images/dogone.pdf'

const date = new Date()

export const Footer = () => {

  const navigate = useNavigate()

  const [opened, { open, close }] = useDisclosure(false)

  const [d, setD] = React.useState(false)

  const matches = useMediaQuery(`(min-width: 767px)`)

  function fck () {
    navigate('/')
    setTimeout(() => {
      window.scrollTo(0, window.scrollY - 100)
    }, 100)
  }

  return (
    <>
      <footer className="bg-white dark:bg-gray-800">
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
            <div className='text text-gray-400 text-left mb-4 md:mb-0'>
              <p>
                ТОО «Saigu Travel»
              </p>
              <p>
                140000 г. Павлодар, ул. Гагарина 50
              </p>
              <p>
                e-mail: sk-pvl@mail.ru 
              </p>
              <p>Служба поддержки: +7 (705) 176 9699</p>
              
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-2 sm:grid-cols-3">
              <div>
                <ul className="text-gray-600 dark:text-gray-400 font-medium">
                  <li className="sm:mb-4">
                    <a
                      href="https://oz-elim.kz/about"
                      className="hover:underline"
                    >
                      О Компании
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://oz-elim.kz/health"
                      className="hover:underline"
                    >
                      Твое здоровье
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="text-gray-600 dark:text-gray-400 font-medium">
                  <li className="sm:mb-4">
                    {/* <Link to="jopa"> */}
                      <span
                        // href="https://oz-elim.kz/price"
                        className="hover:underline "
                        onClick={fck}
                      >
                        Сотрудничество
                      </span>
                    {/* </Link> */}
                  </li>
                  <li className="mb-4">
                  <span onClick={matches ? () => setD(true) : () => {}} className="hover:underline">
                    {matches 
                      ? 'Договор оферты'
                      :
                        <a
                          href="/dogone.pdf"
                          target='_blank'
                        >
                          Договор оферты
                        </a>
                    }
                  </span>                    
                  </li>
                </ul>
              </div>
              <div>
                <ul className="text-gray-600 dark:text-gray-400 font-medium">
                  <li className="sm:mb-4">
                    <a
                      href="https://oz-elim.kz/courses"
                      className="hover:underline"
                    >
                      Курсы
                    </a>
                  </li>

                  <li>
                    <span onClick={matches ? open : () => {}} className="hover:underline">
                      {matches 
                        ? 'Политика конфиденциальности'
                        : <a href={'/policy.pdf'} target='_blank'>Политика конфиденциальности</a>
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
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
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
                // href="https://github.com/MIDstructure"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <BsTiktok className="text-xl flex-shrink-0" color="black" />
              </a>
            </div>
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
          frameborder="0" 
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
          frameborder="0" 
        />
      </Modal>
    </>
  )
}
