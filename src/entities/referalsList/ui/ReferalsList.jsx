import React from 'react'
import { Referal } from './Referal'
import { referapsApi } from '../api/referalsApi'
import { useAuth } from 'shared/hooks'
import { Button, Group, Modal, Radio } from '@mantine/core'
import dayjs from 'dayjs'

import market from 'shared/assets/images/marketing.png'
import { useMediaQuery } from '@mantine/hooks'
import { openConfirmModal } from '@mantine/modals'
import { pb } from 'shared/api'

import zay from 'shared/assets/images/zay.png'
import five from 'shared/assets/images/structure5.png'
import six from 'shared/assets/images/structure6.png'

export const ReferalsList = ({level, setCount}) => {

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
 
  const [shitModal, setShitModal] = React.useState(false)

  const [bidModal, setBidModal] = React.useState(false)

  const matches = useMediaQuery(`(min-width: 767px)`)

  async function bids () {
    await pb.collection('level').create({
      user: user?.id,
      level: user?.level,
      new_level: `4.${radio}`,
      status: 'created',
    })
    .then(async () => {
      await pb.collection('users').update(user?.id, {
        cock: true,
      })
      .then(() => {
        setBidModal(false)
        window.location.reload()
      })
    })
  }

  async function levelBids (level) {
    await pb.collection('level').create({
      user: user?.id,
      level: user?.level,
      status: 'created',
      new_level: level
    })
    .then(async () => {
      await pb.collection('users').update(user?.id, {
        cock: true,
      })
      .then(() => {
        setBidModal(false)
        window.location.reload()
      })
    })
  }

  const [radio, setRadio] = React.useState('')

  const levelbid = (level) => openConfirmModal({
    title: `Заявка на получения вознаграждения и повышение до ${level} ур.`,
    classNames: {
      title: '!font-semibold'
    },
    centered: true,
    children: (
      <>         
        <p className='text-center'>
          По окончанию заполнения {level}-го уровня активными пользователями, вы можете подать заявку получение вознаграждения по маркетингу.
        </p>
        {level == 5 && <img src={five} />}
        {level == 6 && <img src={six} />}
      </>
    ),
    size: '100%',
    // fullScreen: matches ? false : true,
    labels: {confirm: 'Подтвердить', cancel: 'Отмена'},
    onConfirm: () => levelBids(level)
  })

  return (
    <>
      <div className='w-full'>
        <div className='flex flex-col md:flex-row gap-3 items-center'>
          <Button
            onClick={() => setShitModal(true)}
          >
            Программа
          </Button>
          <div className='flex gap-1'>
            <p className='text' onClick={() => setCount(q => q + 1)}>Партнеры:</p>
            <p>{referals.length}</p>
          </div>
          {(user?.bin) && (
            <div className='flex gap-1'>
              <p className='text'>Уровень в процессе:</p>
              <p>
                {(level === '0' || !level) && '1'}
                {level === '1' && `2-3`}
                {level === '2-3' && 4}
                {(level === '4.1' || level === '4.2') && 5}
                {level === '5' && 6}
                {/* {level === '6' && 6} */}
                {!user?.cock && (
                  <>
                    {level === '2-3' && (
                      <Button
                        compact
                        variant='outline'
                        ml={16}
                        onClick={() => setBidModal(true)}
                      >
                        Получить услугу
                      </Button>
                    )}
                    {(level === '4.1' || level === '4.2') && (
                      <Button
                        compact
                        variant='outline'
                        ml={16}
                        onClick={() => levelbid(5)}
                      > 
                        Получить вознаграждение 
                      </Button>
                    )}
                    {(level == '5') && (
                      <Button
                        compact
                        variant='outline'
                        ml={16}
                        onClick={() => levelbid(6)}
                      > 
                        Получить вознаграждение
                      </Button>
                    )}
                  </>
                )}
              </p>
            </div>
          )}
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
        onClose={() => setModal(false)}
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
      <Modal
        opened={shitModal}
        onClose={() => setShitModal(false)}
        centered
        size='xl'
        fullScreen={matches ? false : true}

      >
        <img src={market} alt="" className='h-full' />
      </Modal>
      <Modal
        title='Заявка на получение услуги и повышение до 4 ур.'
        centered
        opened={bidModal}
        onClose={() => setBidModal(false)}
        size='80%'
        classNames={{
          title: '!font-semibold'
        }}
      >
        <div>
          <p className='text-center'>
            По окончанию заполнения 4-го уровня активными пользователями, вы можете подать заявку получение вознаграждения по маркетингу.
          </p>
          <img src={zay} alt="" className='!mx-0' />
          <Radio.Group
            name="radio"
            label="Выберите один из вариантов"
            withAsterisk
            value={radio}
            onChange={setRadio}
            classNames={{
              label: '!text-xl mb-4'
            }}
          >
            <Group mt="x
            s">
              <Radio 
                value="1" 
                label="Путёвка всё включено" 
                classNames={{
                  label: 'text-xl',
                  body: '!items-end'
                }}
              />
              <Radio 
                value="2" 
                label="Обучение всё включено" 
                classNames={{
                  label: 'text-xl',
                  body: '!items-end'
                }}
              />
            </Group>
          </Radio.Group>
          <div className='flex justify-center gap-4'>
            <Button 
              variant='outline'
              onClick={() => setBidModal(false)}
            >
              Отмена
            </Button>
            <Button
              disabled={!radio}
              onClick={bids}
            >
              Подтвердить
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
