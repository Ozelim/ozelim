import React from 'react'
import { getImageUrl } from 'shared/lib'
import { Image } from 'shared/ui'

export const HealthPros = ({ headings, images, text }) => {
  return (
    <section className="bg-primary-500 py-4 lg:py-24 mt-10 lg:mt-20">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10 w-full justify-between ">
          <Image
            record={images}
            index={2}
            className={'rounded-primary'}
          />
          {/* {getImageUrl(images, images?.[2]) ? (
            <img
              className="rounded-primary max-w-xs"
              src={getImageUrl(images, images?.[2])}
              loading="lazy"
              alt="travel"
            />
          ) : (
            <div className="w-[350px] m-auto bg-zinc-200" />
          )} */}
          <div className="bg-white rounded-primary w-full text-teal-500 p-6 lg:p-14">
            <h1 className=" font-extrabold text-3xl md:text-[40px]">
              {headings?.card_head}
            </h1>
            <div className="bg-[#1e1e1e] max-w-[70px] w-full h-1 mt-3"></div>
            <div className="mt-5 md:text-xl flex flex-col gap-5 font-medium leading-9">
              <div>• {text?.list1}</div>
              <div>• {text?.list2}</div>
              <div>• {text?.list3}</div>
              <div>• {text?.list4}</div>
              <div>• {text?.list5}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
