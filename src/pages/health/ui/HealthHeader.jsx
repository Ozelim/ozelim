import React from 'react'
import { Image } from 'shared/ui'

export const HealthHeader = ({ headings, images, text }) => {

  return (
    <section className="w-full">
      <div className="container">

        <div className="flex flex-col lg:flex-row mt-4 gap-8">
          <Image
            record={images}
            index={1}
            className="w-full lg:max-w-xl max-w-lg mx-auto lg:mx-0 rounded-primary max-h-96 object-cover"
          />

          <div className="w-full lg:text-left text-center">
            <h1 className="text-2xl md:text-3xl font-bold font-head text-teal-500">
              {headings?.main}
            </h1>

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
            </ul>

          </div>
        </div>
      </div>
    </section>
  )
}
