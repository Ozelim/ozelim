import { Button, Modal } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { FcInfo } from 'react-icons/fc'
import { Link } from 'react-scroll'
import { getImageUrl } from 'shared/lib'

import gos from 'shared/assets/images/gos.pdf'
import { useLangContext } from 'app/langContext'

export const ProgramHeader = ({ headings, text, images }) => {

  const {kz} = useLangContext()

  const [opened, { open, close }] = useDisclosure(false)

  const matches = useMediaQuery(`(min-width: 767px)`)

  return (
    <>
      <div className="w-full">
        <div className="container">
          <div className="flex flex-col lg:flex-row">
            <div className="">
              <h1 className="mb-[15px] text-4xl text-primary-500 font-bold">
                {headings?.main}
              </h1>
              <p className="mb-[25px] text-[#27272D] lg:mr-5">{headings?.submain}</p>
              <Link to="docs" spy={true} smooth={true}>
                <Button className="py-[15px] mb-[20px] px-[45px]" size="lg">
                  {kz ? `Серіктес болыңыз` : `Стать партнером`}
                </Button>
              </Link>
              <p className='underline cursor-pointer text-primary-500' onClick={matches ? open : () => {}}>
                {matches 
                  ? kz ? `Мемлекеттік тіркеу куәлік` : `Справка о гос. регистриции`
                  : <a href={'/policy.pdf'} target='_blank'>
                    {kz ? `Мемлекеттік тіркеу куәлік` : `Справка о гос. регистриции`}
                  </a>
                }
              </p>
              <div className="flex flex-col md:flex-row gap-2 md:gap-5 items-center mt-5">
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
      <Modal
        opened={opened} 
        onClose={close} 
        centered 
        size={'xl'}
      >
        <iframe 
          className="w-full h-screen" 
          src={gos} 
          frameborder="0" 
        />
      </Modal>
    </>
  )
}
