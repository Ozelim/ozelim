import React from 'react'
import { Referal } from './Referal'
import { referapsApi } from '../api/referalsApi'
import { useAuth } from 'shared/hooks'
import { Button, Group, Modal, Radio } from '@mantine/core'
import dayjs from 'dayjs'

import market from 'shared/assets/images/marketing2.png'
import { useMediaQuery } from '@mantine/hooks'
import { openConfirmModal } from '@mantine/modals'
import { pb } from 'shared/api'

import zay from 'shared/assets/images/zay.png'
import five from 'shared/assets/images/structure5.png'
import six from 'shared/assets/images/structure6.png'
import level3 from 'shared/assets/images/3level.png'
import axios from 'axios'
import { getImageUrl } from 'shared/lib'
import { useLangContext } from 'app/langContext'

async function checkSponsors (user) {

  if (user?.referals?.length < 3) return 

  return await axios.post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/sponsors`, {
    id: user?.id
  })
}

export const ReferalsList = ({level, setCount}) => {

  const {kz} = useLangContext()

  const {user} = useAuth()

  const [referals, setReferals] = React.useState([])

  async function getReferals () {
    await referapsApi.getReferals(user?.id)
    .then(res => {
      setReferals(res)
    })
  }
  
  const [friki, setFriki] = React.useState(0)

  React.useEffect(() => {
    checkSponsors(user)
    .then(e => {
      setFriki(e?.data?.overall ?? 0)
    })
  }, [])

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
  const [threeModal, setThreeModal] = React.useState(false)

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

  async function bids3 () {
    await pb.collection('level').create({
      user: user?.id,
      level: user?.level,
      new_level: `3`,
      status: 'created',
    })
    .then(async () => {
      await pb.collection('users').update(user?.id, {
        cock: true,
      })
      .then(() => {
        setThreeModal(false)
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
    title: level === 7 ? `Заявка на получения вознаграждения и услугу реинвеста.` : `Заявка на получения вознаграждения и переход на ${level} ур.`,
    classNames: {
      title: '!font-semibold'
    },
    centered: true,
    children: (
      <>         
        <p className='text-center'>
          По окончанию заполнения {level - 1}-го уровня активными пользователями, вы можете подать заявку получение вознаграждения по маркетингу.
        </p>
        {level == 7 && <img src={six} />}
        {level == 6 && <img src={five} />}
      </>
    ),
    size: '100%',
    // fullScreen: matches ? false : true,
    labels: {confirm: 'Подтвердить', cancel: 'Отмена'},
    onConfirm: () => levelBids(level - 1)
  })

  return (
    <>
      <div className='w-full'>
        <div className='flex flex-col md:flex-row gap-3 items-center'>
          <Button
            onClick={() => setShitModal(true)}
          >
            {kz ? `Бағдарлама` : `Программа`}
          </Button>
          <div className='flex gap-1'>
            <p 
              className='text' 
              // onClick={() => setCount(q => q + 1)}
            >
              {kz ? `Серіктестер` : `Партнеры`}:
            </p>
            <p>{referals.length}</p>
          </div>
          {(user?.bin) && (
            <div className='flex gap-1'>
              <p className='text'>
                {kz ? 'Орындалу денгейi:' : `Уровень в процессе:`}
              </p>
              <p>
                {(level === '0' || !level) && '1'}
                {(level === '1') && `2`}
                {(level === '2') && `3`}
                {(level === '3') && `4`}
                {(level === '4.1' || level === '4.2') && 5}
                {level === '5' && 6}
                {level === '6' && 6}
                {/* {level === '6' && 6} */}
                {/* {!user?.cock && ( */}
                  <>
                    {level === '2' && (
                      <Button
                        compact
                        variant='outline'
                        ml={16}
                        onClick={() => setThreeModal(true)}
                        disabled={user.cock}
                      >
                        {kz ? `4 деңгей алу` : `Перейти на 4 ур.`}
                      </Button>
                    )}
                    {level === '3' && (
                      <Button
                        compact
                        variant='outline'
                        ml={16}
                        onClick={() => setBidModal(true)}
                        disabled={user.cock}
                      >
                        {kz ? `Қызметті алу` : `Получить услугу`}
                      </Button>
                    )}
                    {(level === '4.1' || level === '4.2') && (
                      <Button
                        compact
                        variant='outline'
                        ml={16}
                        onClick={() => levelbid(6)}
                        disabled={user.cock}
                      > 
                        {kz ? `Сый500 000лық алу` : `Получить 500 000`}
                      </Button>
                    )}
                    {(level == '5') && (
                      <Button
                        compact
                        variant='outline'
                        ml={16}
                        onClick={() => levelbid(7)}
                        disabled={user.cock}
                      > 
                        {kz ? `1 000 000 алу` : `Получить 1 000 000`}
                      </Button>
                    )}
                    {(level == '6') && (
                      <Button
                        compact
                        variant='outline'
                        ml={16}
                        onClick={() => levelbid(7)}
                        disabled={user.cock}
                      > 
                        {kz ? `Сыйлық алу` : `Получить вознаграждение`}
                      </Button>
                    )}
                  </>
                {/* )} */}
              </p>
            </div>
          )}
          {user?.bin && (
            <div className='flex gap-1'>
              <p className='text' onClick={() => setCount(q => q + 1)}>Статистика:</p>
              <p>{friki}</p>
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
        <img 
          src={getImageUrl(referal, referal.avatar)} 
          alt="" 
          className='w-[150px] h-[150px] object-cover rounded-full mx-auto mb-5'
        />
        {referal?.verified 
          ? <div className='py-4 text-green-500'>Верифицирован</div>
          : <div className='py-4 text-gray-500'>Не верифицирован</div>
        }
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
        title={kz ? `Қызмет алуға өтінім және 5 деңгейге дейін көтеру.`: 'Заявка на получение услуги и переход на 5 ур.'}
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
            {kz 
              ? `4-деңгейді белсенді пайдаланушылармен толтыру аяқталғаннан кейін сіз өтініш бере аласыз маркетингтік сыйақы алу.` 
              : `По окончанию заполнения 4-го уровня активными пользователями, вы можете подать заявку на получение вознаграждения по маркетингу и переход на следующий уровень.`
            }
          </p>
          <img src={zay} alt="" className='!mx-0' />
          <Radio.Group
            name="radio"
            label={kz ? `Опциялардың бірін таңдаңыз` : "Выберите один из вариантов"}
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
                label={kz ? `Жолдама барлығы кіреді` : "Путёвка всё включено"} 
                classNames={{
                  label: 'text-xl',
                  body: '!items-end'
                }}
              />
              <Radio 
                value="2" 
                label={kz ? ` Оқыту барлығы кіреді` : "Обучение всё включено"} 
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
              {kz ? `Бас тарту` : 'Отмена'}
            </Button>
            <Button
              disabled={!radio}
              onClick={bids}
            >
              {kz ? `Растау` : 'Подтвердить'}
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        title={kz ? `4-деңгейге көтерілу туралы өтініш.` : `Заявка на переход на 4 ур.`}
        centered
        opened={threeModal}
        onClose={() => setThreeModal(false)}
        size='80%'
        classNames={{
          title: '!font-semibold'
        }}
      >
        <div>
          <p className='text-center'>
            {kz 
              ? `3-деңгейді белсенді пайдаланушылармен толтыру аяқталғаннан кейін сіз 4-деңгейге дейін көтеруге өтініш бере аласыз` 
              : `По окончанию заполнения 3-го уровня активными пользователями, вы можете подать заявку на переход в 4-тый уровня`
            }
          </p>
          <img src={level3} alt="" className='!mx-0 w-full' />
          <p className='text-center my-4 text-slate-400'>
            {/* {kz 
              ? `Қайырымдылыққа арналған сома (5000 тг) сіздің жеке кабинетіңіздегі баланстан алынады`
              : `Сумма (5000 тг) на благотворительность будет списана с вашего баланса в личном кабинете`
            } */}
          </p>
          <div className='flex justify-center gap-4'>
            <Button 
              variant='outline'
              onClick={() => setThreeModal(false)}
            >
              {kz ? `Бас тарту` : 'Отмена'}
            </Button>
            <Button
              onClick={bids3}
              // disabled={user?.balance < 5000}
            >
              {kz ? `Растау` : 'Подтвердить'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
