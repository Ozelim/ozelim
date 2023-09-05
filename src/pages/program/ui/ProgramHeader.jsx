import { Button } from '@mantine/core'
import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { FcInfo } from 'react-icons/fc'
import { Link } from 'react-scroll'
import { getImageUrl } from 'shared/lib'

export const ProgramHeader = ({ headings, text, images }) => {

  return (
    <div className="w-full">
      <div className="container">
        <div className="flex flex-col lg:flex-row">
          <div className="">
            <h1 className="mb-[15px] text-4xl text-heading font-bold">
              {headings?.main}
            </h1>
            <p className="mb-[25px] text-[#27272D] lg:mr-5">{headings?.submain}</p>
            <Link to="docs" spy={true} smooth={true}>
              <Button className="py-[15px] mb-[30px] px-[45px]" size="lg">
                Стать партнером
              </Button>
            </Link>

            <div className="flex flex-col md:flex-row gap-2 md:gap-5 items-center">
              <div className="w-[150px] text-center">
                <AiOutlineCheckCircle className="m-auto grow shrink-0 text-5xl" color='teal' />
                <p className="mt-3 text-sm md:text-base">{text?.card1}</p>
              </div>
              <div className="w-[150px] text-center">
                <AiOutlineCheckCircle className="m-auto grow shrink-0 text-5xl" color='teal' />
                <p className="mt-3 text-sm md:text-base">{text?.card2}</p>
              </div>
              <div className="w-[150px] text-center">
                <AiOutlineCheckCircle className="m-auto grow shrink-0 text-5xl" color='teal' />
                <p className="mt-3 text-sm md:text-base">{text?.card3}</p>
              </div>
            </div>
          </div>
          <img
            className="rounded-primary lg:mx-0 lg:max-w-xl lg:mt-0 mt-10 max-w-lg mx-auto w-full"
            src={getImageUrl(images, images?.[1])}
            loading="lazy"
            alt="travel"
          />
        </div>
      </div>
    </div>
  )
}
