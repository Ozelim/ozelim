import React from 'react'
import { Referal } from './Referal'
import { referapsApi } from '../api/referalsApi'
import { useAuth } from 'shared/hooks'
import { Modal } from '@mantine/core'
import dayjs from 'dayjs'

export const ReferalsList = ({level}) => {

  const {user} = useAuth()

  const [referals, setReferals] = React.useState([])

  async function getReferals () {
    await referapsApi.getReferals(user?.id)
    .then(res => {
      setReferals(res)
    })
  }

  React.useEffect(() => {
    getReferals()
  }, [])

  const [modal, setModal] = React.useState(false)

  const [referal, setReferal] = React.useState({})

  function handleReferal (val) {
    setReferal(val)
    setModal(true)
  }

  return (
    <>
      <div className='w-full'>
        <div className='flex gap-3'>
          <div className='flex gap-1'>
            <p className='text'>Партнеры:</p>
            <p className=''>{referals.length}</p>
          </div>
          <div className='flex gap-1'>
            <p className='text'>Уровень:</p>
            <p className=''>{level}</p>
          </div>
        </div>
        <div className='flex gap-4 overflow-x-auto pb-2 mt-4'>
          {referals.map((referal, i) => {
            return (
              <Referal 
                referal={referal} 
                key={i}
                onReferalClick={handleReferal}
              />
            )
          })}
        </div>
      </div>
      <Modal
        opened={modal}
        onClose={setModal}
        centered
        size={'xs'}
        title='Данные партнера'
      >
        <ul className='space-y-2'>
          <li className='grid grid-cols-2'>
            <p>ID:</p>
            <p>{referal?.id}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Имя:</p>
            <p>{referal?.name}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Фамилия:</p>
            <p>{referal?.surname}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Телефон:</p>
            <p>{referal?.phone}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Область:</p>
            <p>{referal?.region}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Партнеры:</p>
            <p>{referal?.referals?.length}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Бинар:</p>
            <p>{referal?.bin ? 'Да' : 'Нет'}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Уровень:</p>
            <p>{referal?.level}</p>
          </li>
          <li className='grid grid-cols-2'>
            <p>Дата рег:</p>
            <p>{dayjs(referal?.created).format('DD.MM.YY')}</p>
          </li>
        </ul>
      </Modal>
    </>
  )
}
