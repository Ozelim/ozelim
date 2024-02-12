import { Button } from '@mantine/core'
import React from 'react'
import { Link } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'
import Kazmap from 'shared/assets/images/map-kz.png'
import { useLangContext } from 'app/langContext'

export const Franchise = () => {

  const {kz} = useLangContext()

  return (
    <div className="w-full">
      <div className="container">
        <div className="flex lg:flex-row flex-col gap-4 justify-between items-center bg-gradient-to-tl from-teal-600 to-teal-500 shadow-md rounded-primary">
          <div className="ml-8">
            <p className="text-4xl mt-2 text-white">
              {kz ? `Қазақстанның санаторияларының біріккен тізімі` : `Единый реестр санаторно-курортных комплексов Казахстана`}
            </p>
            <p className="mt-5 text-2xl text-white ">
              {kz ? `Қазақстан бойынша сауықтыру турларын іздеу және іріктеу`: `Поиск и подбор оздоровительных туров по Казахстану`}
            </p>
            <div className="mt-5">
              <Button component={RouterLink} to="/resorts" size="md">
                {kz ? `Толығырақ` : `Сотрудничество`}
              </Button>
            </div>
          </div>
          <img
            src={Kazmap}
            alt=""
            className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary object-cove"
          />
        </div>
      </div>
    </div>
  )
}
