import React from 'react'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { AiOutlineYoutube } from 'react-icons/ai'
import { AiOutlineInstagram } from 'react-icons/ai'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { pb } from 'shared/api'
import { getImageUrl } from 'shared/lib'
import { usePageData } from 'shared/hooks'
import { Image } from 'shared/ui'

export const About = () => {

  const {images, text, headings} = usePageData('about')

  return (
    <main className="w-full">
      <section className="w-full ">
        <div className="container">
          <div className="w-full">
            <div className="text-center">
              {/* <img
                className="m-auto"
                src="https://storiestour.ru/img/home/section-icon.png"
                alt=""
              /> */}
              <h1 className="text-3xl lg:text-4xl font-bold mt-1 text-primary-500">
                {headings?.main}
                {/* Мы cоциальный проект */}
              </h1>
              <p className="text-[#888888] text">{text?.main}</p>
            </div>

            <div className="mt-10">
              <h1 className="text-center text-4xl font-bold text-[#2a2a2a]">
                {headings?.main2}
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-3">
                <div className="text-center bg-[#f8f8ff] py-2 hover:-translate-y-3 transition-transform">
                  <Image
                    record={images}
                    index={1}
                    className="max-w-[350px] w-full m-auto h-full max-h-64 rounded-primary object-cover"
                  />
                  {/* {getImageUrl(images, images?.[1]) ? (
                    <img
                      className="w-[350px]  m-auto"
                      src={getImageUrl(images, images?.[1])}
                      loading="lazy"
                      alt="travel"
                    />
                  ) : (
                    <div className="w-[350px] m-auto bg-zinc-200" />
                  )} */}
                  <h2 className="text-[#2a2a2a] text-xl mb-1 font-bold">
                    {headings?.grid}
                  </h2>
                  <p className="text-[#888888]">
                    {text?.grid}
                  </p>
                </div>
                <div className="text-center bg-[#f8f8ff] py-2 hover:-translate-y-3 transition-transform">
                  <Image
                    record={images}
                    index={2}
                    className="max-w-[350px] w-full m-auto h-full max-h-64 rounded-primary object-cover"
                  />
                  <h2 className="text-[#2a2a2a] text-xl mb-1 font-bold">
                    {headings?.grid2}
                  </h2>
                  <p className="text-[#888888]">
                    {text?.grid2}
                  </p>
                </div>
                <div className="text-center bg-[#f8f8ff] py-2 hover:-translate-y-3 transition-transform">
                  <Image
                    record={images}
                    index={3}
                    className="max-w-[350px] w-full m-auto h-full max-h-64 rounded-primary object-cover"
                  />
                  <h2 className="text-[#2a2a2a] text-xl font-bold mb-1">
                    {headings?.grid3}
                  </h2>
                  <p className="text-[#888888]">
                    {text?.grid3}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full mt-40">
        <div className="container">
          <div className="">
            <h1 className="text-4xl text-primary-500 font-bold">
              {headings?.task}
            </h1>
            <div className='flex flex-col md:flex-row gap-8 mt-6'>
              <Image
                className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
                record={images}
                index={4}
              />
              <div>
                <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                  <li>
                    • {text?.task1}
                  </li>
                  <li>• {text?.task2}</li>
                  <li>• {text?.task3}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 lg:mt-24">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl font-medium text-primary-500">
              {headings?.bond} 
            </h1>
            <div className='grid gap-8 mt-5 max-w-3xl mx-auto'>
              <p className="text text-left">{text?.bond}</p>
       
            </div>
            <div className="flex justify-center items-center gap-10 mt-10">
              <a 
                target='_blank'
                href="https://www.instagram.com/oz_elim_kaz?igsh=MTBlbHc0YjJrZTU0cw=="
              >
                <div className="border border-solid border-gray-300 rounded-full p-4 md:p-7 hover:bg-teal-600 transition-all ">
                  <AiOutlineInstagram className="text-4xl md:text-7xl flex-shrink-0 text-primary-500 hover:text-white" />
                </div>
                <p className="text-primary-600 mt-2">Instagram</p>
              </a>
              <a 
                target='_blank'
                href="https://wa.me/77470512252"
              >
                <div className="border border-solid border-gray-300 rounded-full p-4 md:p-7 hover:bg-teal-600 transition-all ">
                  <AiOutlineWhatsApp className="text-4xl md:text-7xl flex-shrink-0 text-primary-500 hover:text-white" />
                </div>
                <p className="text-primary-600 mt-2">WhatsApp</p>
              </a>
              <a  
                href="https://www.youtube.com/channel/UCOm22rq5ELyWBJWNImiv3Ww"
                target='_blank'
              >
                <div className="border border-solid border-gray-300 rounded-full p-4 md:p-7 hover:bg-teal-600 transition-all ">
                  <AiOutlineYoutube className="text-4xl md:text-7xl flex-shrink-0 text-primary-500 hover:text-white" />
                </div>
                <p className="text-primary-600 mt-2">YouTube</p>
              </a>
            </div>
            {/* <h3 className="mt-5 font-medium text-[#2a2a2a] text-xl md:text-2xl">
              {headings?.bond2}
            </h3>
            <p className="text-primary-600 text-xl font-medium">
              {text?.bond2} asd
            </p> */}
          </div>
        </div>
      </section>
    </main>
  )
}
