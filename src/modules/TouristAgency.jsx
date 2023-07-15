import { useMediaQuery } from '@mantine/hooks'
import React from 'react'
import { FcInfo } from 'react-icons/fc'

export const TouristAgency = () => {

  const matches = useMediaQuery(`(max-width: 878px)`)

  if (matches) return (
    <div className="w-full">
      <div className="container">
        <div className='flex flex-col'>
          <h1 className="heading">
            Откройте свое туристическое агентство «Поехали с нами»!
          </h1>
          <img
            className="object-contain mt-8"
            src="https://img.poehalisnami.kz/images/bg-open-office.png"
            alt=""
          />
            <div className="flex max-w-sm mt-5">
              <FcInfo className="text-5xl flex-shrink-0  mr-3" />
              <div>
                <h3 className="text-2xl text-[#2b3641]">
                  Небольшие инвестиции
                </h3>
                <p className="mt-2">
                  Для запуска собственного дела не понадобятся крупные
                  финансовые вложения.
                </p>
              </div>
            </div>
            <div className="flex  max-w-sm mt-5 ">
              <FcInfo className="text-5xl flex-shrink-0 mr-3" />
              <div>
                <h3 className="text-2xl  text-[#2b3641]">Успешный бизнес</h3>
                <p className="mt-2">
                  Вы присоединяетесь к динамично развивающейся крупной сети.
                </p>
              </div>
            </div>
            <div className="flex   max-w-sm mt-5">
              <FcInfo className="text-5xl flex-shrink-0  mr-3" />
              <div>
                <h3 className="text-2xl  text-[#2b3641]">Легкий старт</h3>
                <p className="mt-2">
                  Для начала работы нужно ориентировочно 25–45 дней.
                </p>
              </div>
            </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full">
      <div className="container">
        <div className="flex justify-between px-2">
          <div>
            <h1 className="text-5xl text-[#2b3641]">
              Откройте свое туристическое агентство «Поехали с нами»!
            </h1>
            <div className="flex max-w-sm mt-5">
              <FcInfo className="text-5xl flex-shrink-0  mr-3" />
              <div>
                <h3 className="text-2xl text-[#2b3641]">
                  Небольшие инвестиции
                </h3>
                <p className="mt-2">
                  Для запуска собственного дела не понадобятся крупные
                  финансовые вложения.
                </p>
              </div>
            </div>
            <div className="flex  max-w-sm mt-5 ">
              <FcInfo className="text-5xl flex-shrink-0 mr-3" />
              <div>
                <h3 className="text-2xl  text-[#2b3641]">Успешный бизнес</h3>
                <p className="mt-2">
                  Вы присоединяетесь к динамично развивающейся крупной сети.
                </p>
              </div>
            </div>
            <div className="flex   max-w-sm mt-5">
              <FcInfo className="text-5xl flex-shrink-0  mr-3" />
              <div>
                <h3 className="text-2xl  text-[#2b3641]">Легкий старт</h3>
                <p className="mt-2">
                  Для начала работы нужно ориентировочно 25–45 дней.
                </p>
              </div>
            </div>
          </div>

          <img
            className="object-contain"
            src="https://img.poehalisnami.kz/images/bg-open-office.png"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
