import React from 'react'
import { Button, Chip, Modal, TextInput } from '@mantine/core'
import { FcInfo } from 'react-icons/fc'
import { formatNumber } from 'shared/lib'

import WhatsApp from 'shared/assets/icons/WhatsApp.svg'
import Instagram from 'shared/assets/icons/Instagram.svg'
import { useUtils } from 'shared/hooks'
import { HealthLink } from 'shared/ui/HealthLink'
import { pb } from 'shared/api'

export const ResortDetails = ({resort}) => {

  const [modal, setModal] = React.useState(false)

  const [bid, setBid] = React.useState({
    name: '',
    phone: '',
    region: '',
  })

  async function submit (data) {
    return await pb.collection('bids').create({
      ...data, 
      type: 'resort',
      status: 'created'
    })
  }

  return (
    <>
      <div className="p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-3">{resort?.title}</h2>
        <div className='space-y-2 mt-4'>
          <div className='flex flex-wrap gap-3'>
            {resort?.diseas && resort?.diseas?.map((q, i) => {
              return (
                <p key={i} className='text'>{q}</p>
              )
            })}
          </div>
          {/* <div>
            {resort?.duration}
          </div>
          <div>
            {resort?.diet}
          </div>
          <div>
            {resort?.from}
          </div> */}
        </div>
        <hr className="mt-5" />
        {/* <span className="text-3xl font-bold">
          {formatNumber(resort?.cost)} 
        </span> */}

        <div className='mt-10'>
          <div>Уточнить детали тура</div>
          <div className="flex flex-col">
            {/* <a href={`https://www.instagram.com/${resort?.inst}`} target="_blank">
              <div className="flex items-center gap-2">
                <img src={Instagram} className="w-10" />
                <p>Instagram</p>
              </div>
            </a> */}
            <a href={`https://wa.me/${resort?.whats}`} target="_blank">
              <div className="flex items-center gap-2 mt-4">
                <img src={WhatsApp} className="w-10" />
                <p>WhatsApp</p>
              </div>
            </a>

          </div>
        </div>
        <div className="w-full mb-4">
          <HealthLink 
            label={'Отправить заявку'} 
            buttonProps={{
              fullWidth: true,
            }}
            onSubmit={submit}
            data={resort?.id}
          />
        </div>
      </div>
      <Modal centered title="Заявка" opened={modal} onClose={setModal}>
        <div className="space-y-4">
          <TextInput
            label="Имя"
            value={bid?.name}
            onChange={(e) => setBid({ ...bid, name: e.currentTarget.value })}
            variant="filled"
          />
          <TextInput
            label="Телефон"
            value={bid?.phone}
            onChange={(e) => setBid({ ...bid, phone: e.currentTarget.value })}
            variant="filled"
          />
          <TextInput
            label="Город"
            value={bid?.region}
            onChange={(e) => setBid({ ...bid, region: e.currentTarget.value })}
            variant="filled"
          />
          <Button fullWidth>Отправить</Button>
        </div>
      </Modal>
    </>
  )
}
