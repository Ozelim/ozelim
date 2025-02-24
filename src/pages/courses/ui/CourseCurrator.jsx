import React from 'react'

import { Image } from 'shared/ui'
import { Button } from '@mantine/core'
import { useLangContext } from 'app/langContext'


export const CourseCurrator = ({ images, text, headings, }) => {

  const {qq} = useLangContext()

  return (
    <div className="w-full">
      <div className="container">
        <div className="grid md:grid-cols-[40%_auto] bg-white mt-10 rounded-primary py-3 px-4 md:py-6 md:px-10 shadow-md">
          <div className="w-full text-center md:text-left md:mb-0 mb-4">
            <h1 className="text-4xl text-[#424242] font-semibold">
              {headings?.z1}
            </h1>
 
            <Image
              record={images}
              index={7}
              className="max-h-80 rounded-primary mt-5 mx-auto md:mx-0"
              alt="currator"
            />
          </div>
          <div className="flex bg-[#f4f4f4]  rounded-primary p-5">
            <div className="md:ml-8">
              <h2 className="text-xl font-semibold text-[#424242]">
                {headings?.z3} 
              </h2>
              <p className="mt-2">
                {text?.z4}
              </p>
              {/* <div className="mt-5">
                <div className="flex items-center">
                  <CgPhone className="text-primary-600 text-lg flex-shrink-0" />
                  <p className="ml-2 text-primary-600">
                    {text?.z5}
                  </p>
                </div>
                <div className="flex items-center">
                  <BsWhatsapp className="text-primary-600 text-lg flex-shrink-0" />
                  <p className="ml-2 text-primary-600">
                    {text?.z6} (WhatsApp)
                  </p>
                </div>
                <div className="flex items-center">
                  <MdOutlineMailOutline className="text-primary-600 text-xl flex-shrink-0" />
                  <p className="ml-2 text-primary-600">
                    {text?.z7}
                  </p>
                </div>
              </div> */}
              {/* <HealthLink onSubmit={onSubmit} label={'Оставить заявку'} heading={'Узнать больше'} /> */}
              <div className='flex justify-center w-full mt-5'>
                <a href="https://wa.me/77051769699" target="_blank" rel="noopener noreferrer">
                  <Button>
                    {qq('Оставить заявку', 'Өтініш қалдыру')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
