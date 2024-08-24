import React from 'react'
import { Button } from '@mantine/core'
import { Link as RouterLink } from 'react-router-dom'
import Kazmap from 'shared/assets/images/hero.jpg'
import { useLangContext } from 'app/langContext'

export const Franchise = () => {

  const {kz} = useLangContext()

  return (
    <div className="w-full">
      <div className="container">
        <div className="flex lg:flex-row flex-col gap-4 justify-between items-center bg-gradient-to-tl from-teal-600 to-teal-500 shadow-md rounded-primary">
          <div className="ml-4 lg:ml-8 mr-4">
            <p className="text-2xl lg:text-4xl mt-2 text-white">
              {kz ? `Қазақстанның санаторияларының біріккен тізімі` : `Единый реестр санаторно-курортных комплексов Казахстана`}
            </p>
            <p className="mt-5 text-xl lg:text-2xl text-white ">
              {kz ? `Қазақстан бойынша сауықтыру турларын іздеу және іріктеу`: `Поиск и подбор оздоровительных туров по Казахстану`}
            </p>
            <div className="mt-5">
              <Button component={RouterLink} to="/resorts" size="md">
                {kz ? `Серiктестiк` : `Сотрудничество`}
              </Button>
            </div>
          </div>
          <img
            src={Kazmap}
            alt=""
            className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-r-primary object-cove"
          />
        </div>
      </div>
    </div>
  )
}
