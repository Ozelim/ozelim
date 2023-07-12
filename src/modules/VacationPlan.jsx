import React from 'react'
import { FcInfo } from "react-icons/fc";

export const VacationPlan = () => {
  return (
    <div className="w-full">
      <div className="container">
        <div className='w-full'>
          <h1 className='text-3xl text-center'>Планируйте отдых с «Поехали с нами»</h1>
          <p className='text-center text mt-3'>Гарантированная поддержка вашего личного менеджера на всех этапах отдыха</p>
          <div className='flex justify-between mt-5'>
            <div className='max-w-[244px] max-h-56 px-4 py-5 shadow-md rounded-primary bg-white' >
              <FcInfo className='text-6xl flex-shrink-0' />
              <p className='mt-3'>Отправьте запрос и менеджер забронирует для вас тур</p>
            </div>
            <div className='max-w-[244px] max-h-56  px-4 py-5 shadow-md rounded-primary bg-white' >
              <FcInfo className='text-6xl flex-shrink-0' />
              <p className='mt-3'>Оплатите тур любым удобным способом</p>
            </div>
            <div className='max-w-[244px] max-h-56  px-4 py-5 shadow-md rounded-primary bg-white' >
              <FcInfo className='text-6xl flex-shrink-0' />
              <p className='mt-3'>Выберите лучшую цену на тур на нашем сайте</p>
            </div>
            <div className='max-w-[244px] max-h-56  px-4 py-5 shadow-md rounded-primary bg-white' >
              <FcInfo className='text-6xl flex-shrink-0' />
              <p className='mt-3'>Получите документы на тур по email</p>
            </div>
            <div className='max-w-[244px] max-h-56  px-4 py-5 shadow-md rounded-primary bg-white' >
              <FcInfo  className='text-6xl flex-shrink-0' />
              <p className='mt-3'>Наслаждайтесь отдыхом!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
