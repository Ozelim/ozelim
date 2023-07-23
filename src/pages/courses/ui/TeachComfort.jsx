import React from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'

export const TeachComfort = () => {
  return (
    <div className="w-full">
      <div className="container">
        <div className="w-full mt-10">
          <h1 className="heading border-b-2 pb-4 text-heading">
            С нами комфортно
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:mt-5 border-b-2 pb-5">
            <div className="p-4">
              <div className="pb-2">
                <AiOutlineCheckCircle className="text-3xl flex-shrink-0 text-primary-600" />
              </div>
              <p className="mt-1">
                Сниженная стоимость курсов за счет отсутствия необходимости
                аренды учебных помещений.
              </p>
            </div>
            <div className="p-4">
              <div className="pb-2">
                <AiOutlineCheckCircle className="text-3xl flex-shrink-0 text-primary-600" />
              </div>
              <p className="mt-1">
                Гибкость учебных программ, возможность выбора тем, времени и
                продолжительности каждого занятия.
              </p>
            </div>
            <div className="p-4">
              <div className="pb-2">
                <AiOutlineCheckCircle className="text-3xl flex-shrink-0 text-primary-600" />
              </div>
              <p className="mt-1">
                Широкая доступность, независимость от географического положения.
              </p>
            </div>
            <div className="p-4">
              <div className="pb-2">
                <AiOutlineCheckCircle className="text-3xl flex-shrink-0 text-primary-600" />
              </div>
              <p className="mt-1">
                Записи занятий и раздаточные материалы останутся у вас навсегда.
              </p>
            </div>
            <div className="p-4">
              <div className="pb-2">
                <AiOutlineCheckCircle className="text-3xl flex-shrink-0 text-primary-600" />
              </div>
              <p className="mt-1">Получения ответов на возникающие вопросы.</p>
            </div>
            <div className="p-4">
              <div className="pb-2">
                <AiOutlineCheckCircle className="text-3xl flex-shrink-0 text-primary-600" />
              </div>
              <p className="mt-1">
                Свидетельства установленного образца по квалификациям
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
