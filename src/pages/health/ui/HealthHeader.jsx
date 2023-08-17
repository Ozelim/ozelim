import React from 'react'
import FitnessIcon from 'shared/assets/icons/fitness.svg'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { getImageUrl } from 'shared/lib'

export const HealthHeader = ({ headings, health, images, text }) => {
  return (
    <section className="w-full">
      <div className="container">
        <h1 className="text-3xl max-w-3xl m-auto font-bold text-center font-head">
          {/* <span className="text-primary-500">Твое здоровье - </span> */}
          {headings?.heading}
        </h1>
        <div className="flex flex-col lg:flex-row mt-20">
          {getImageUrl(health?.images, images?.[1]) ? (
            <img
              className="lg:max-w-2xl w-full hidden lg:block"
              src={getImageUrl(health?.images, images?.[1])}
              loading="lazy"
              alt="travel"
            />
          ) : (
            <div className="w-[350px] m-auto bg-zinc-200" />
          )}
          <div className="">
            <h1 className="text-2xl md:text-3xl font-bold font-head text-[#1e1e1e]">
              {headings?.main}
            </h1>
            <img
              className="max-w-2xl w-full block lg:hidden mt-4"
              src={FitnessIcon}
              alt="fitness"
            />
            <p className="text-xl font-medium mt-3 text-[#1e1e1e]">
              {headings?.submain}
            </p>
            <ul className="mt-3 text-lg font-medium text-[#5a5959] ">
              <li>• {text?.text1}</li>
              <li>• {text?.text2}</li>
              <li>• {text?.text3}</li>
              <li>• {text?.text4}</li>
              <li>• {text?.text5}</li>
              <li>• {text?.text6}</li>
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
