import { Button } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import Kazmap from 'shared/assets/images/map-kz.png'



export const Franchise = () => {
  return (
    <div className="w-full">
      <div className="container">
        <div className="flex lg:flex-row flex-col gap-4 justify-between items-center bg-white shadow-md rounded-primary">
          <div className="ml-8">
            <p className="text-4xl mt-2 text-[#424242]">
              Отдых вместе с 
            </p>

            <p className="text-4xl mt-2 text-[#424242]">
              «OZ ELIM»
            </p>

            <p className="mt-5 text-2xl text-[#424242] ">
              Поиск и подбор оздоровительных туров по Казахстану.
            </p>
            <div className="mt-5">
              <Button component={Link} to="/about" size="md">
                Подробнее
              </Button>
              <Link to="/program">
                <Button size="md" className="ml-3">
                  Регистрация
                </Button>
              </Link>
            </div>
          </div>
          <img
            src={Kazmap}
            alt=""
            className="max-w-3xl w-full rounded-primary"
          />
        </div>
      </div>
    </div>
  )
}
