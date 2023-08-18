import React from 'react'
import { Button, Chip, Modal, TextInput } from '@mantine/core'
import { FcInfo } from 'react-icons/fc'
import { formatNumber } from 'shared/lib'

import WhatsApp from 'shared/assets/icons/WhatsApp.svg'
import Instagram from 'shared/assets/icons/Instagram.svg'
import { useUtils } from 'shared/hooks'

export const ResortDetails = ({resort}) => {

  const [modal, setModal] = React.useState(false)

  const [bid, setBid] = React.useState({
    name: '',
    phone: '',
    region: '',
  })

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-3">Информация о туре</h2>
        <div>
          Длительность: <b>{resort?.duration} д.</b>
        </div>
        <div>
          Питание <b>{resort?.diet}</b>
        </div>
        <div>
          Выезд с <b>{resort?.from}</b>
        </div>
        <div>
          Выезд: <b>{resort?.departure}</b>
        </div>
        <div>
          Сезон тура: <b>{resort?.season}</b>
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
        <span className="text-3xl font-bold">
          {formatNumber(resort?.cost)} тг
        </span>
        <div className="mt-2">
          <Button fullWidth size="md" onClick={() => setModal(true)}>
            Отправить заявку
          </Button>
        </div>

        <hr className="mt-5" />
        <div>Уточнить детали тура</div>
        <div className="flex flex-col mt-3">
          <a href={`https://www.instagram.com/${resort?.inst}`} target="_blank">
            <div className="flex items-center gap-2">
              <img src={Instagram} className="w-10" />
              <p>Instagram</p>
            </div>
          </a>
          <a href={`https://wa.me/${resort?.whats}`} target="_blank">
            <div className="flex items-center gap-2 mt-4">
              <img src={WhatsApp} className="w-10" />
              <p>WhatsApp</p>
            </div>
          </a>
          <div className="mt-4">
            <div>{resort?.adress}</div>
            <a href={resort?.twogis} className="text-orange-500 cursor-pointer">
              Подробнее
            </a>
          </div>
        </div>
      </div>
      <Modal 
        centered 
        title="Заявка" 
        opened={modal}
        onClose={setModal}
      >
        <div className='space-y-4'>
          <TextInput
            label='Имя'
            value={bid?.name}
            onChange={(e) => setBid({ ...bid, name: e.currentTarget.value })}
            variant='filled'
          />
          <TextInput
            label='Телефон'
            value={bid?.phone}
            onChange={(e) => setBid({ ...bid, phone: e.currentTarget.value })}
            variant='filled'
          />
          <TextInput
            label='Город'
            value={bid?.region}
            onChange={(e) => setBid({ ...bid, region: e.currentTarget.value })}
            variant='filled'
          />
          <Button
            fullWidth
          >
            Отправить
          </Button>
        </div>
      </Modal>
    </>
  )
}
