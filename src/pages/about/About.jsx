import React from 'react'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { AiOutlineYoutube } from 'react-icons/ai'
import { AiOutlineInstagram } from 'react-icons/ai'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { pb } from 'shared/api'
import { getImageUrl } from 'shared/lib'

async function getAbout() {
  const text = await pb
    .collection('text')
    .getFullList({ filter: `page = 'about'` })
  const images = await pb
    .collection('images')
    .getFullList({ filter: `page = 'about'` })
  return {
    text: text[0],
    images: images[0],
  }
}

export const About = () => {
  const [about, setAbout] = React.useState({})

  const headings = about?.text?.headings
  const text = about?.text?.text

  const images = about?.images ?? {}

  React.useEffect(() => {
    getAbout().then((res) => {
      setAbout(res)
    })
  }, [])

  return (
    <main className="w-full">
      <section className="w-full">
        <div className="container">
          <div className="w-full">
            <div className="text-center">
              <img
                className="m-auto"
                src="https://storiestour.ru/img/home/section-icon.png"
                alt=""
              />
              <h1 className="text-3xl lg:text-4xl font-bold mt-1 text-[#2a2a2a]">
                {headings?.main}
                {/* Мы cоциальный проект */}
              </h1>
              <p className="text-[#888888] text">{text?.main}</p>
            </div>

            <div className="mt-10">
              <h1 className="text-center text-4xl font-bold text-[#2a2a2a]">
                Наша цель
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-3">
                <div className="text-center bg-[#f8f8ff] py-2 hover:-translate-y-3 transition-transform">
                  {getImageUrl(about?.images, images?.[1]) ? (
                    <img
                      className="w-[350px]  m-auto"
                      src={getImageUrl(about?.images, images?.[1])}
                      loading="lazy"
                      alt="travel"
                    />
                  ) : (
                    <div className="w-[350px] m-auto bg-zinc-200" />
                  )}
                  <h2 className="text-[#2a2a2a] text-xl mb-1 font-bold">
                    Охват всех туристических зон
                  </h2>
                  <p className="text-[#888888]">
                    Мы охватываем все туристические зоны и единый реестр
                    санаторно-курортных комплексов Казахстана
                  </p>
                </div>
                <div className="text-center bg-[#f8f8ff] py-2 hover:-translate-y-3 transition-transform">
                  <img
                    className="w-80 m-auto"
                    src={getImageUrl(about?.images, images[1])}
                    alt="travel"
                    loading="lazy"
                  />
                  <h2 className="text-[#2a2a2a] text-xl mb-1 font-bold">
                    Конструктор туров
                  </h2>
                  <p className="text-[#888888]">
                    Автоматизированный профильный конструктор туров по
                    заболеваниям и патологиям
                  </p>
                </div>
                <div className="text-center bg-[#f8f8ff] py-2 hover:-translate-y-3 transition-transform">
                  <img
                    className="w-80 m-auto"
                    src={getImageUrl(about?.images, images[2])}
                    alt="travel"
                    loading="eager"
                  />
                  <h2 className="text-[#2a2a2a] text-xl font-bold mb-1">
                    Врач-консультант
                  </h2>
                  <p className="text-[#888888]">
                    Предоставим врача-консультант по подбору путевки на
                    оздоровление
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full mt-10 lg:mt-20">
        <div className="container">
          <div className="flex">
            <div>
              <h1 className="text-4xl text-[#2a2a2a] font-bold">
                {headings?.task}
              </h1>
              <img
                className="block lg:hidden w-full mt-5"
                src={getImageUrl(about?.images, images[3])}
                alt="sport"
              />
              <p className="mt-5 text-[#5a5959]">{text?.task}</p>
              <Button className="mt-5" size="md">
                Подробнее
              </Button>
            </div>
            <img
              className="hidden lg:block max-w-2xl w-full"
              src={getImageUrl(about?.images, images[3])}
              alt="sport"
            />
          </div>
        </div>
      </section>

      <section className="mt-10 lg:mt-24">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl font-medium text-[#2a2a2a]">
              {headings?.bond}
            </h1>
            <p className="mt-5 text ">{text?.bond}</p>
            <div className="flex justify-center items-center gap-10 mt-10">
              <Link to="/" className="">
                <div className="border border-solid border-gray-300 rounded-full p-4 md:p-7 hover:bg-teal-600 transition-all ">
                  <AiOutlineInstagram className="text-4xl md:text-7xl flex-shrink-0 text-primary-500 hover:text-white" />
                </div>
                <p className="text-primary-600 mt-2">Instagram</p>
              </Link>
              <Link to="/" className="">
                <div className="border border-solid border-gray-300 rounded-full p-4 md:p-7 hover:bg-teal-600 transition-all ">
                  <AiOutlineWhatsApp className="text-4xl md:text-7xl flex-shrink-0 text-primary-500 hover:text-white" />
                </div>
                <p className="text-primary-600 mt-2">WhatApp</p>
              </Link>
              <Link to="/" className="">
                <div className="border border-solid border-gray-300 rounded-full p-4 md:p-7 hover:bg-teal-600 transition-all ">
                  <AiOutlineYoutube className="text-4xl md:text-7xl flex-shrink-0 text-primary-500 hover:text-white" />
                </div>
                <p className="text-primary-600 mt-2">YouTube</p>
              </Link>
            </div>
            <h3 className="mt-5 font-medium text-[#2a2a2a] text-xl md:text-2xl">
              {headings?.bond2}
            </h3>
            <p className="text-primary-600 text-xl font-medium">
              {text?.bond2}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
