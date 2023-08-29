import React from 'react'
import FitnessIcon from 'shared/assets/icons/fitness.svg'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { getImageUrl } from 'shared/lib'
import { Image } from 'shared/ui'

export const HealthHeader = ({ headings, images, text }) => {

  return (
    <section className="w-full">
      <div className="container">
        {/* <h1 className="text-3xl max-w-3xl m-auto font-bold text-center font-head">
          <span className="text-primary-500">{headings?.heading}</span>
        </h1> */}
        <div className="flex flex-col lg:flex-row mt-4 gap-8">
          <Image
            record={images}
            index={1}
            className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 "
          />
          
          {/* {getImageUrl(images, images?.[1]) ? (
            <img
              className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0"
              src={getImageUrl(images, images?.[1])}
              loading="lazy"
              alt="travel"
            />
          ) : (
            <div className="lg:max-w-xl w-full m-auto bg-zinc-200" />
          )} */}
          <div className="w-full lg:text-left text-center">
            <h1 className="text-2xl md:text-3xl font-bold font-head text-[#1e1e1e]">
              {headings?.main}
            </h1>
            {/* <img
              className="max-w-2xl w-full block lg:hidden mt-4"
              src={FitnessIcon}
              alt="fitness"
            /> */}
            <p className="text-xl font-medium mt-3 text-[#1e1e1e]">
              {headings?.submain}
            </p>
            <ul className="mt-3 text-lg font-medium text-[#5a5959] ">
              <li>
                • {text?.text1}
              </li>
              <li>• {text?.text2}</li>
              <li>• {text?.text3}</li>
              <li>• {text?.text4}</li>
              <li>• {text?.text5}</li>
              <li>• {text?.text6}</li>
            </ul>

          </div>
        </div>
      </div>
    </section>
  )
}
