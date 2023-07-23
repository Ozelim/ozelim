import React from 'react'
import { BiTimeFive } from 'react-icons/bi'
import { AiOutlineCalendar } from 'react-icons/ai'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { Button } from '@mantine/core'

export const CourseHeader = () => {
  return (
    <div className="w-full">
      <div className="container">
        <section className="flex">
          <div>
            <h1 className="text-4xl font-bold pt-16 pb-5 text-[#2a2a2a]">
              Программа по подготовке и переподготовке кадров в сфере туризма
            </h1>
            <p className="text-heading text-xl font-medium">
              Изучите основы профессии "Краеведческий гид-экскурсовод" ,
              "Менеджер по внутреннему туризму", "Администратор курортной зоны"
            </p>
            <div className="flex gap-6 mt-10">
              <div className="flex items-center">
                <div className="border border-solid border-[#dae7f3] p-2 rounded-md shadow">
                  <AiOutlineCalendar className="text-4xl flex-shrink-0 text-primary-600 " />
                </div>
                <div className="ml-2">
                  <h4 className="text-heading text-sm font-medium">
                    Начало курса
                  </h4>
                  <p className="text-[#005bab] font-medium">31 июля</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="border border-solid border-[#dae7f3] p-2 rounded-md shadow">
                  <BiTimeFive className="text-4xl flex-shrink-0 text-primary-600 " />
                </div>
                <div className="ml-2">
                  <h4 className="text-heading text-sm  font-medium">
                    Длительность
                  </h4>
                  <p className="text-[#005bab] font-medium">16 лет</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="border border-solid border-[#dae7f3] p-2 rounded-md shadow">
                  <AiOutlineUnorderedList className="text-4xl flex-shrink-0 text-primary-600 " />
                </div>
                <div className="ml-2">
                  <h4 className="text-heading text-sm  font-medium">
                    Количество уроков
                  </h4>
                  <p className="text-[#005bab] font-medium">3 в год</p>
                </div>
              </div>
            </div>
            <Button size="lg" className="mt-10">
              Смотреть программу курса
            </Button>
          </div>
          <img
            src="https://img.poehalisnami.kz/static/psn/pagecover/cov8930/orig/8930_638011906482831219.jpg"
            alt="тетя"
          />
        </section>
      </div>
    </div>
  )
}
