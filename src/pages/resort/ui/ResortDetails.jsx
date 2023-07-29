import { Button, Chip } from '@mantine/core'
import React from 'react'
import { FcInfo } from 'react-icons/fc'
import { formatNumber } from 'shared/lib'

export const ResortDetails = ({resort}) => {

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-3">Информация о туре</h2>
      <div>
        Дата тура: <b>13.07 по 21.07</b>
      </div>
      <div>
        Длительность: <b>7 ночей в POOL VIEW ROOM</b>
      </div>
      <div>
        Питание <b>Все включено</b>
      </div>
      <div>
        Туристы <b>1 взрослый</b>
      </div>
      <div>
        Перелет: <b>включен</b>
      </div>
      <div className="flex items-center">
        <FcInfo />
        <div className="ml-2">
          13 июля, чт <b>из Алматы</b>
        </div>
      </div>
      <div className="flex items-center">
        <FcInfo />
        <div className="ml-2">
          20 июля, чт <b>из Египта</b>
        </div>
      </div>
      <hr className="mt-5" />
      <div className="mt-2 mb-1">Цена за 1 чел, в номере для двоих</div>
      <span className="text-3xl font-bold">{formatNumber(resort?.cost)} тг</span>
      <div className='mt-2'>
        <Button
          fullWidth
          size='md'
        >
          Отправить заявку
        </Button>
      </div>

      <hr className="mt-5" />
      <div>Уточнить детали тура</div>
      <div className="flex items-center mt-3">
        <FcInfo className="w-10 h-10" />
        <div className="ml-4">
          <a href="#" className="text-orange-500">
            +7 (775)096-78-78
          </a>
          <div>{resort?.adress}</div>
          <a href="#" className="text-orange-500">
            Подробнее
          </a>
        </div>
      </div>
    
    </div>
  )
}
