import { Button } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import Kazmap from 'shared/assets/images/map-kz.png'


export const Franchise = () => {
  return (
    <div className="w-full px-5">
      <div className="container">
        <div className="flex lg:flex-row flex-col gap-4 justify-between items-center bg-white shadow-md rounded-primary">
          <div className="ml-8">
            <div className="text-4xl text-[#424242]">Lorem</div>
            <div className="text-4xl mt-2 text-[#424242]">
              Lorem, ipsum dolor.
            </div>
            <p className="mt-5 text-2xl text-[#424242] ">
              Lorem ipsum dolor sit amet.
            </p>
            <div className="mt-5">
              <Button component={Link} to='/about' size="md">Подробнее</Button>
              <Link to="/program">
                <Button size="md" className="ml-3">
                  Регистрация
                </Button>
              </Link>
            </div>
          </div>
          <img src={Kazmap} alt="" className="max-w-3xl w-full rounded-primary" />
        </div>
      </div>
    </div>
  )
}
