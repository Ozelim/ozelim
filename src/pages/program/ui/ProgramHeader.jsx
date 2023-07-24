import { Button } from '@mantine/core'
import React from 'react'
import { FcInfo } from 'react-icons/fc'

export const ProgramHeader = () => {
  return (
    <div className="w-full">
      <div className="container">
        <div className="flex">
          <div className="w-1/2">
            <h1 className="mb-[15px] text-6xl  text-heading font-bold">
              Партнерство, которое работает
            </h1>
            <p className="mb-[40px] text-[#27272D] mr-5">
              В целях популяризации и развития внутреннего туризма Вашему
              вниманию предлагаем социально-накопительную партнерскую программу
              оздоровительного туризма, которая при активной работе в построении
              структуры позволит любому пользователю получить наши услуги
              <span className=" font-bold"> БЕСЛАТНО </span>
            </p>
            <Button className="py-[15px] mb-[60px] px-[45px]" size='lg'>
              Стать партнером
            </Button>
            <div className="flex gap-5">
              <div className="w-[150px] text-center">
                <FcInfo className="m-auto" />
                <p className="mt-3">Реферальный бонус 50% от суммы входа</p>
              </div>
              <div className="w-[150px] text-center">
                <FcInfo className="m-auto" />
                <p className="mt-3">Отсутствие дополнительных вложений.</p>
              </div>
              <div className="w-[150px] text-center">
                <FcInfo className="m-auto" />
                <p className="mt-3">Количество рефералов без ограничения</p>
              </div>
            </div>
          </div>
          <img
            className="w-1/2"
            src="https://partner.promarketing.tech/wp-content/uploads/2023/05/main-img1-992x1024.png"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
