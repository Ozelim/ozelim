import React from 'react'
import { Button, Modal, TextInput } from '@mantine/core'

import WhatsApp from 'shared/assets/icons/WhatsApp.svg'
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

        </div>
        <hr className="mt-5" />


        <div className='mt-10'>
          <div>Уточнить детали тура</div>
          <div className="flex flex-col">
            <a href={`https://wa.me/${resort?.whats}`} target="_blank">
              <div className="flex items-center gap-2 mt-4">
                <img src={WhatsApp} className="w-10" />
                <p>Отправить заявку</p>
              </div>
            </a>

          </div>
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
