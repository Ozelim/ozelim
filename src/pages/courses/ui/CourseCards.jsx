import React from 'react'
import { FaRegHandshake } from 'react-icons/fa'
import { TbTrain } from 'react-icons/tb'
import { SiYourtraveldottv } from 'react-icons/si'

export const CourseCards = ({ headings, text }) => {
  return (
    <div className="w-full">
      <div className="container">
        <section className="grid lg:grid-cols-3 gap-7 mt-20">
          <div className="border-solid border-4 rounded-primary py-5 px-7 border-[#20c997] ">
            <div className="flex items-center">
              <div className="bg-[#20c997] p-4 rounded-full">
                <FaRegHandshake className="text-3xl lg:text-5xl text-heading flex-shrink-0" />
              </div>
              <h2 className="text-2xl lg:text-3xl text-heading ml-3">
                {headings?.card_head1}
              </h2>
            </div>
            <p className="mt-3">{text?.card_p1}</p>
          </div>
          <div className="border-solid border-4 rounded-primary py-5 px-7 border-primary-500 ">
            <div className="flex items-center">
              <div className="bg-[#20c997] p-4 rounded-full">
                <TbTrain className="text-3xl lg:text-5xl text-heading flex-shrink-0" />
              </div>
              <h2 className="text-2xl lg:text-3xl text-heading ml-3">
                {headings?.card_head2}
              </h2>
            </div>
            <p className="mt-3">{text?.card_p2}</p>
          </div>
          <div className="border-solid border-4 rounded-primary py-5 px-7 border-primary-500 ">
            <div className="flex items-center">
              <div className="bg-[#20c997] p-4 rounded-full">
                <SiYourtraveldottv className="text-3xl lg:text-5xl text-heading flex-shrink-0" />
              </div>
              <h2 className="text-2xl lg:text-3xl text-heading ml-3">
                {headings?.card_head3}
              </h2>
            </div>
            <p className="mt-3">{text?.card_p3}</p>
          </div>
        </section>
      </div>
    </div>
  )
}
