import { Button } from '@mantine/core'
import React from 'react'
import { FcInfo } from 'react-icons/fc'
import { Link } from 'react-scroll'
import { getImageUrl } from 'shared/lib'

export const ProgramHeader = ({ headings, text, images }) => {
  return (
    <div className="w-full">
      <div className="container">
        <div className="flex">
          <div className="w-1/2">
            <h1 className="mb-[15px] text-6xl  text-heading font-bold">
              {headings?.main}
            </h1>
            <p className="mb-[40px] text-[#27272D] mr-5">{headings?.submain}</p>
            <Link to="docs" spy={true} smooth={true}>
              <Button className="py-[15px] mb-[60px] px-[45px]" size="lg">
                Стать партнером
              </Button>
            </Link>

            <div className="flex gap-5">
              <div className="w-[150px] text-center">
                <FcInfo className="m-auto" />
                <p className="mt-3">{text?.card1}</p>
              </div>
              <div className="w-[150px] text-center">
                <FcInfo className="m-auto" />
                <p className="mt-3">{text?.card2}</p>
              </div>
              <div className="w-[150px] text-center">
                <FcInfo className="m-auto" />
                <p className="mt-3">{text?.card3}</p>
              </div>
            </div>
          </div>
          {getImageUrl(images, images?.[1]) ? (
            <img
              className="w-1/2"
              src={getImageUrl(images, images?.[1])}
              loading="lazy"
              alt="travel"
            />
          ) : (
            <div className="w-[350px] m-auto bg-zinc-200" />
          )}
        </div>
      </div>
    </div>
  )
}
