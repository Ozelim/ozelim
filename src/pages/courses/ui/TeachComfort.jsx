import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'

export const TeachComfort = ({ headings, text }) => {
  return (
    <div className="w-full">
      <div className="container">
        <div className="w-full mt-10">
          <h1 className="heading border-b-2 pb-4 text-4xl text-teal-500">
            {headings?.grid2_main}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, nulla.
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:mt-5 border-b-2 pb-5">
            <div className="p-4 bg-white shadow-md rounded-primary">
              <div className="pb-2">
                <AiOutlineCheckCircle className="text-3xl flex-shrink-0 text-primary-600" />
              </div>
              <p className="mt-1">{text?.grid2_p1}</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-primary">
              <div className="pb-2">
                <AiOutlineCheckCircle className="text-3xl flex-shrink-0 text-primary-600" />
              </div>
              <p className="mt-1">{text?.grid2_p2}</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-primary">
              <div className="pb-2">
                <AiOutlineCheckCircle className="text-3xl flex-shrink-0 text-primary-600" />
              </div>
              <p className="mt-1">{text?.grid2_p3}</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-primary">
              <div className="pb-2">
                <AiOutlineCheckCircle className="text-3xl flex-shrink-0 text-primary-600" />
              </div>
              <p className="mt-1">{text?.grid2_p4}</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-primary">
              <div className="pb-2">
                <AiOutlineCheckCircle className="text-3xl flex-shrink-0 text-primary-600" />
              </div>
              <p className="mt-1">{text?.grid2_p5}</p>
            </div>
            <div className="p-4 bg-white shadow-md rounded-primary">
              <div className="pb-2">
                <AiOutlineCheckCircle className="text-3xl flex-shrink-0 text-primary-600" />
              </div>
              <p className="mt-1">{text?.grid2_p6}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
