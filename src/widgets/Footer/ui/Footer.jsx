import React from 'react'
import ozelimlogo from 'shared/assets/images/logo.svg'
import dayjs from 'dayjs'
import { BsInstagram, BsTelegram, BsTiktok, BsYoutube } from 'react-icons/bs'

const date = new Date()

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 ">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://oz-elim.kz" className="flex items-center">
              <img
                src={ozelimlogo}
                className="max-w-[100px] mr-3"
                alt="OzElim Logo"
              />
              <span className="self-center text-2xl whitespace-nowrap dark:text-white">
                OZ ELIM
              </span>
            </a>
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
                    href="https://oz-elim.kz/program"
                    className="hover:underline"
                  >
                    Партнерская программа
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <ul className="text-gray-600 dark:text-gray-400 font-medium">
                <li className="sm:mb-4">
                  <a
                    href="https://oz-elim.kz/price"
                    className="hover:underline "
                  >
                    Прайс лист
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://oz-elim.kz/charity-fund"
                    className="hover:underline"
                  >
                    Благотворительность
                  </a>
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
                  <a href="https://oz-elim.kz/#" className="hover:underline">
                    Польз. соглашение
                  </a>
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
              href="https://github.com/MIDstructure"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <a href="#" className="flex items-center">
                <BsTiktok className="text-xl flex-shrink-0" color="black" />
                {/* <img src={TikTok} className="w-6" /> */}
              </a>
            </a>
            {/* <a
              href="https://github.com/MIDstructure"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub account</span>
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
