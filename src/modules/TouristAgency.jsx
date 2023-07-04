import React from 'react'
import { FcInfo } from 'react-icons/fc'

export const TouristAgency = () => {
  return (
    <div className="flex justify-between px-2">
      <div>
        <h1 className="text-5xl text-[#2b3641]">
          Откройте свое туристическое агентство «Поехали с нами»!
        </h1>
        <div className="flex max-w-sm mt-5">
          <FcInfo className="w-20 h-20 mr-3" />
          <div>
            <h3 className="text-2xl text-[#2b3641]">Небольшие инвестиции</h3>
            <p className="mt-2">
              Для запуска собственного дела не понадобятся крупные финансовые
              вложения.
            </p>
          </div>
        </div>
        <div className="flex  max-w-sm mt-5 ">
          <FcInfo className="w-20 h-20 mr-3" />
          <div>
            <h3 className="text-2xl text-[#2b3641]">Успешный бизнес</h3>
            <p className="mt-2">
              Вы присоединяетесь к динамично развивающейся крупной сети.
            </p>
          </div>
        </div>
        <div className="flex  max-w-sm mt-5">
          <FcInfo className="w-20 h-20 mr-3" />
          <div>
            <h3 className="text-2xl text-[#2b3641]">Легкий старт</h3>
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
  )
}
