import { Button, Center } from '@mantine/core'
import React from 'react'
import { FcInfo } from 'react-icons/fc'

export const ProgramPros = ({ headings, text }) => {
  return (
    <div className="bg-primary-500 w-full">
      <div className="container">
        <section className="text-white p-6 lg:p-[50px] rounded-[20px] mt-16">
          <h1 className="text-[35px] font-bold mb-5 text-center">
            {headings?.list_head}
          </h1>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="flex items-center ">
              <FcInfo className="text-5xl flex-shrink-0" />
              <p className="text-[22px] ml-4 font-normal">{text?.list1}</p>
            </div>
            <div className="flex items-center ">
              <FcInfo className="text-5xl flex-shrink-0" />
              <p className="text-[22px] ml-4 font-normal">{text?.list2}</p>
            </div>
            <div className="flex items-center ">
              <FcInfo className="text-5xl flex-shrink-0" />
              <p className="text-[22px] ml-4 font-normal">{text?.list3}</p>
            </div>
            <div className="flex items-center ">
              <FcInfo className="text-5xl flex-shrink-0" />
              <p className="text-[22px] ml-4 font-normal">{text?.list4}</p>
            </div>
            <div className="flex items-center ">
              <FcInfo className="text-5xl flex-shrink-0" />
              <p className="text-[22px] ml-4 font-normal">{text?.list5}</p>
            </div>
            <div className="flex items-center ">
              <FcInfo className="text-5xl flex-shrink-0" />
              <p className="text-[22px] ml-4 font-normal">{text?.list6}</p>
            </div>
          </div>
          <Center>
            <Button size="lg" className="mt-10" color="green">
              Стать партнером
            </Button>
          </Center>
        </section>
      </div>
    </div>
  )
}
