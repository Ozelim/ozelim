import React from 'react'

import { BsWhatsapp } from 'react-icons/bs'
import { MdOutlineMailOutline } from 'react-icons/md'
import { CgPhone } from 'react-icons/cg'
import { HealthLink } from 'shared/ui/HealthLink'
import { pb } from 'shared/api'

export const CourseCurrator = ({ name, desc, img }) => {

  const onSubmit = async (data) => {
    await pb.collection('bids').create({
      ...data,
      type: 'health'
    })
  }

  return (
    <div className="w-full">
      <div className="container">
        <div className="grid md:grid-cols-[40%_auto] bg-white mt-10 rounded-primary py-6 px-10 shadow-md">
          <div className="w-full text-center md:text-left md:mb-0 mb-4">
            <h1 className="text-4xl text-[#424242] font-semibold">
              Куратор курса
            </h1>
            <p className="text-lg text-[#888888] max-w-xs mx-auto md:mx-0 mt-2">
              Задавайте любые интересующие вас вопросы нашему куратору
            </p>
            <img
              src={img}
              className="max-h-80 rounded-primary mt-5 mx-auto md:mx-0"
              alt="currator"
            />
          </div>
          <div className="flex bg-[#f4f4f4]  rounded-primary p-5">
            <div className="ml-8">
              <h2 className="text-xl font-semibold text-[#424242]">{name}</h2>
              <p className="mt-2">{desc}</p>
              <p className=" text-[#888888] mt-2">
                Задавайте любые интересующие вас вопросы нашему куратору
              </p>
              <div className="mt-5">
                <div className="flex items-center">
                  <CgPhone className="text-primary-600 text-lg flex-shrink-0" />
                  <p className="ml-2 text-primary-600">+7 747 094 05 98</p>
                </div>
                <div className="flex items-center">
                  <BsWhatsapp className="text-primary-600 text-lg flex-shrink-0" />
                  <p className="ml-2 text-primary-600">
                    +7 747 811 8489 (WhatsApp)
                  </p>
                </div>
                <div className="flex items-center">
                  <MdOutlineMailOutline className="text-primary-600 text-xl flex-shrink-0" />
                  <p className="ml-2 text-primary-600">
                    lesia@poehalisnami.com
                  </p>
                </div>
              </div>
              <HealthLink onSubmit={onSubmit} label={'Оставить заявку'} heading={'Узнать больше'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
