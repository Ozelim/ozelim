import React from 'react'
import FitnessIcon from 'shared/assets/icons/fitness.svg'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'

export const HealthHeader = () => {
  return (
    <section className="w-full">
      <div className="container">
        <h1 className="text-3xl max-w-3xl m-auto font-bold text-center font-head">
          <span className="text-primary-500">Твое здоровье - </span>
          это прежде всего здоровый отдых, здоровое питание и здоровый воздух.
        </h1>
        <div className="flex flex-col lg:flex-row mt-20">
          <img
            className="max-w-2xl w-full hidden lg:block"
            src={FitnessIcon}
            alt="fitness"
          />
          <div className="">
            <h1 className="text-2xl md:text-3xl font-bold font-head text-[#1e1e1e]">
              Если у вас хроническая физическая и психологическая усталость
            </h1>
            <img
              className="max-w-2xl w-full block lg:hidden mt-4"
              src={FitnessIcon}
              alt="fitness"
            />
            <p className="text-xl font-medium mt-3 text-[#1e1e1e]">
              В таких случаях вам нужна перезагрузка. Что это значит:
            </p>
            <ul className="mt-3 text-lg font-medium text-[#5a5959] ">
              <li>
                • Пребывание в благоприятных <br /> климатических условиях
              </li>
              <li>• Морально-психологические виды отдыха</li>
              <li>• Общая профилактика организма и хронических заболеваний</li>
              <li>• Профилактика иммунной системы человека</li>
              <li>• Восстановление и улучшение иммунной системы человека</li>
              <li>• Лечебная гимнастика и физкультура</li>
            </ul>
            <Link to="/price">
              <Button className="mt-10" size="md">
                Узнать цены
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
