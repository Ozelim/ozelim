import React from 'react'
import TravelIcon from 'shared/assets/images/travel.png'
import ConstructorIcon from 'shared/assets/images/constructor.png'
import DoctorIcon from 'shared/assets/images/doctor.png'
import SportIcon from 'shared/assets/icons/sport.svg'
import Instagram from 'shared/assets/icons/Instagram.svg'
import TikTok from 'shared/assets/icons/TikTok.svg'
import YouTube from 'shared/assets/icons/YouTube.svg'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { AiOutlineYoutube } from 'react-icons/ai'
import { AiOutlineInstagram } from 'react-icons/ai'
import { AiOutlineWhatsApp } from 'react-icons/ai'

export const About = () => {
  return (
    <main className="max-w-6xl m-auto">

      <section className='w-full'>
        <div className="container">
          <div className="w-full">
            <div className="text-center">
              <img
                className="m-auto"
                src="https://storiestour.ru/img/home/section-icon.png"
                alt=""
              />
              <h1 className="text-3xl lg:text-4xl font-bold mt-1 text-[#2a2a2a]">
                Мы cоциальный проект
              </h1>
              <p className="text-[#888888] text">
                по развитию внутреннего и оздоровительного туризма
              </p>
            </div>

            <div className="mt-10">
              <h1 className="text-center text-4xl font-bold text-[#2a2a2a]">
                Наша цель
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-3">
                <div className="text-center bg-[#f8f8ff] py-2 hover:-translate-y-3 transition-transform">
                  <img className="w-[350px]  m-auto" src={TravelIcon} alt="travel" />
                  <h2 className="text-[#2a2a2a] text-xl mb-1 font-bold">
                    Охват всех туристических зон
                  </h2>
                  <p className="text-[#888888]">
                    Мы охватываем все туристические зоны и единый реестр
                    санаторно-курортных комплексов Казахстана
                  </p>
                </div>
                <div className="text-center bg-[#f8f8ff] py-2 hover:-translate-y-3 transition-transform">
                  <img className="w-80 m-auto" src={ConstructorIcon} alt="travel" />
                  <h2 className="text-[#2a2a2a] text-xl mb-1 font-bold">
                    Конструктор туров
                  </h2>
                  <p className="text-[#888888]">
                    Автоматизированный профильный конструктор туров по заболеваниям и
                    патологиям
                  </p>
                </div>
                <div className="text-center bg-[#f8f8ff] py-2 hover:-translate-y-3 transition-transform">
                  <img className="w-80 m-auto" src={DoctorIcon} alt="travel" />
                  <h2 className="text-[#2a2a2a] text-xl font-bold mb-1">
                    Врач-консультант
                  </h2>
                  <p className="text-[#888888]">
                    Предоставим врача-консультант по подбору путевки на оздоровление
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
              <h1 className="text-4xl text-[#2a2a2a] font-bold">Наша задача</h1>
              <img className="block lg:hidden w-full mt-5" src={SportIcon} alt="sport" />
              <p className="mt-5 text-[#5a5959]">
                Программа по подготовке и переподготовке кадров в сфере туризма
                через Центр сертификации специалистов с организацией обучающих
                информационных туров по курортным зонам Казахстана и международной
                практики в курортных зонах за рубежом. А также последующее
                трудоустройство специалистов и повышение квалификации действующих
                работников в сфере туризма.
              </p>
              <Button className="mt-5" size="md">
                Подробнее
              </Button>
            </div>
            <img className="hidden lg:block max-w-2xl w-full" src={SportIcon} alt="sport" />
          </div>
        </div>
      </section>

      <section className="mt-10 lg:mt-24">
        <div className="container">
          <div className='text-center'>
            <h1 className="text-4xl font-medium text-[#2a2a2a]">
              Мы всегда на связи
            </h1>
            <p className="mt-5 text ">
              В любое время вы можете обратиться к представителям нашей компании.
              Свяжитесь с нами удобным для вас способом: через форму на сайте, по
              телефону или социальную сеть. Ведь мы – передовая компания, которая
              идет в ногу со временем. Facebook Instagram
            </p>
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
              Консультации по телефону
            </h3>
            <p className="text-primary-600 text-xl font-medium">+7(707)200-13-32</p>

          </div>
        </div>
      </section>
    </main>
  )
}
