import React from 'react'
import dayjs from 'dayjs'
import { pb } from 'shared/api'
import { ActionIcon, Badge, Button, Group, LoadingOverlay, MantineProvider, Modal, NumberInput, Radio, ScrollArea, Table, TextInput, clsx, createEmotionCache } from '@mantine/core'
import { useAuth } from 'shared/hooks'

import { formatNumber} from 'shared/lib'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { sha512 } from 'js-sha512'
import { Avatar } from 'shared/ui'

import { FaCircleXmark } from 'react-icons/fa6'
import { AgentsData } from './AgentsData'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { AgentsList } from './AgentsList'

import visa from 'shared/assets/images/visa.png'
import mastercard from 'shared/assets/images/mastercard.png'
import { Quiz } from 'modules/Quiz'

import market from 'shared/assets/images/agent.png'
import { openConfirmModal } from '@mantine/modals'

const cache = createEmotionCache({
  key: 'profile-mantine',
  prepend: false
})

async function getBonusesRecord (id) {
  return await pb.collection('user_bonuses').getOne(id)
}

function getMonth(previous) {
  let month = dayjs().month() + 1

  if (previous) {
    if (month === 1) return 12
    if (month < 10) return `${0}${month - 1}`
    return month
  }

  if (month < 10) month = `${0}${month}`

  return month
}

function getYear(previous) {
  const year = dayjs().year()

  if (previous) {
    if (getMonth() === '01') return year - 1
  }
  return year
}

const currentYearAndMonth = `${getYear()}-${getMonth()}-01 00:00:00`

const currentMonthString = `created >= '${currentYearAndMonth}'`

async function getWithdraws (userId) {
  return await pb.collection('withdraws').getFullList({
    filter: `${currentMonthString} && user = '${userId}' && status = 'created'`,
    sort: '-created'
  })
}

async function getTransfers (userId) {
  return await pb.collection('transfers').getFullList({
    filter: `${currentMonthString} && agent = '${userId}'`,
  })
}

async function getServiceBids (id) {
  return await pb.collection('service_bids').getFullList({
    filter: `agent = '${id}' && status != 'waiting'`,
    sort: `-created`,
  })
}

export const AgentsProfile = () => {

  const {user, setUser, loading} = useAuth()

  const navigate = useNavigate()

  const [count, setCount] = React.useState(0) 

  const [bonuses, setBonuses] = React.useState({})

  const [balance, setBalance] = React.useState(0)

  const [color, setColor] = React.useState('orange')

  React.useEffect(() => {
    if (user?.agent) setColor('green')
  }, [user?.agent])

  React.useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login')
      } 
    } 
  }, [loading])

  React.useEffect(() => {
    if (user?.collectionName === 'users') {
      navigate('/')
    }
  }, [])

  const [bids, setBids] = React.useState([])

  function sumBalance (record) {
    const referals = record?.referals?.reduce((a, b) => a + Number(b?.sum), 0) ?? 0
    const replenish = record?.replenish?.reduce((a, b) => a + Number(b?.sum), 0) ?? 0
    const bonus = record?.bonuses?.reduce((a, b) => a + Number(b?.sum), 0) ?? 0
    
    const withdraws = record?.withdraws?.reduce((a, b) => a + Number(b?.sum), 0) ?? 0
    const services = record?.services?.reduce((a, b) => a + Number(b?.sum), 0) ?? 0

    const valBalance = (referals + replenish + bonus) - (withdraws + services)

    setBalance(valBalance)
  }

  async function createUserRecord (id) {
    if (!id) return
    await pb.collection('user_bonuses').create({
      id: id,
      q: 'profile page creation'
    })
  }

  React.useEffect(() => {
    getBonusesRecord(user?.id)
    .then(res => {
      sumBalance(res)
      setBonuses(res)
    })
    .catch(async err => {
      if (err?.status === 404) await createUserRecord(user?.id)
    })
    getServiceBids(user?.id)
    .then(res => {
      setBids(res)
    })

    pb.collection('service_bids').subscribe('*', () => getServiceBids(user?.id)
    .then(res => {
      setBids(res)
    }))
    
    return () => {
      pb.collection('service_bids').unsubscribe('*')
    }
  }, [])

  const [withdraws, setWithdraws] = React.useState([])
  const [transfers, setTransfers] = React.useState([])

  React.useEffect(() => {
    getWithdraws(user?.id)
    .then(res => {
      setWithdraws(res)
    })
    getTransfers(user?.id)
    .then(res => {
      setTransfers(res)
    })
  }, [])

  function signout () {
    pb.authStore.clear()
    window.location.reload()
  }

  const [paymentLoading, setPaymentLoading] = React.useState(false)
  const [verifyLoading, setVerifyLoading] = React.useState(false)

  async function submit (e) {
    try {
      setPaymentLoading(true)
      e.preventDefault()
      const randomNumber = Math.floor(Math.random() * 100000000)
      const token = import.meta.env.VITE_APP_SHARED_SECRET

      const data = {
        ORDER: randomNumber,
        AMOUNT: user?.email === `kurama.zxc@mail.ru` ? 5 : 30000,
        // AMOUNT: 30000,
        CURRENCY: 'KZT',
        MERCHANT:'110-R-113431490',
        TERMINAL: '11371491',
        NONCE: randomNumber + 107,
        DESC: 'Оплата верификации 1',
        CLIENT_ID: user?.id,
        DESC_ORDER: 'Верификация (Пользователь)', 
        EMAIL: user?.email,
        BACKREF: `https://oz-elim.kz/aprofile`,
        Ucaf_Flag: '',
        Ucaf_Authentication_Data: '',
      }

      const dataString = `${data?.ORDER};${data?.AMOUNT};${data?.CURRENCY};${data?.MERCHANT};${data?.TERMINAL};${data?.NONCE};${data?.CLIENT_ID};${data?.DESC};${data?.DESC_ORDER};${data?.EMAIL};${data?.BACKREF};${data?.Ucaf_Flag};${data?.Ucaf_Authentication_Data};`
      
      const all = token + dataString
      const sign = sha512(all).toString()

      await axios.post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/pay`, {
        ...data,
        P_SIGN: sign
      })
      .then(async res => {
        const searchParams = new URLSearchParams(JSON.parse(res?.config?.data));
        await pb.collection('agents').update(user?.id, {
          pay: {
            ...JSON.parse(res?.config?.data),
            SHARED_KEY: token
          }
        })
        .then(() => {
          setPaymentLoading(false)
          window.location.href = `https://jpay.jysanbank.kz/ecom/api?${searchParams}`;
        })
      })
      .finally(() => {
        setPaymentLoading(false)
      })

    } catch (err) {
      setPaymentLoading(false)
      console.log(err, 'err');
    }
  }

  async function  verifyUser(u) {
    setVerifyLoading(true)
    await axios.post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/agents`, {
      ...u,
    })
    .then(async res => {
      await pb.collection('agents').getOne(user.id, {expand: 'sponsor, creeps.creeps.creeps'})
      .then(res => {
        setUser(res)
    })
      console.log(res, 'succ');
    })
    .finally(() => {
      setVerifyLoading(false)
    })
  }

  async function checkPaymentStatus () {
    const u = await pb.collection('agents').getOne(user.id)

    const token = import.meta.env.VITE_APP_SHARED_SECRET
    const string = `${u?.pay?.ORDER};${u?.pay?.MERCHANT}`
    const sign = sha512(token + string).toString()
    if (u?.pay?.MERCHANT && u?.pay?.ORDER && !u?.verified) {
      await axios.post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/check`, {
        ORDER: u?.pay?.ORDER,
        MERCHANT: u?.pay?.MERCHANT,
        GETSTATUS: 1,
        P_SIGN: sign,
      })
      .then(async res => {
        console.log(res, 'response');
        console.log(res?.data?.includes('Обработано успешно'), 'res');
        if (res?.data?.includes('Обработано успешно')) {
          verifyUser(u)
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  React.useEffect(() => {
    checkPaymentStatus()
  }, [])

  const [viewModal, setViewModal] = React.useState({
    modal: false,
    services: []
  })

  const [cancel, setCancel] = React.useState({
    modal: false,
    bid: {},
  }) 
  
  const [refund, setRefund] = React.useState({
    fio: '',
    iban: '',
    iin: '',
  })

  const confirmRefundBalance = (bid, onclose) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    children: 'Отменить услугу и вернуть средства на баланс?',
    labels: {confirm: 'Подтвердить', cancel: 'Назад'},
    onConfirm: async () => {
      await pb.collection('service_bids').update(bid?.id, {
        status: 'cancelled',
        total_cost2: bid?.total_cost,
        refunded: true,
        refunded_sum: bid?.total_cost - bid?.cost?.bonuses ?? 0,
      })
      .then(async () => {
        await pb.collection('agents').update(user?.id, {
          'balance+': bid?.total_cost - bid?.costs?.bonuses ?? 0,
          'bonuses+': bid?.costs?.bonuses ?? 0
        })
        .then(() => {
          window.location.reload()
        })
      })
    },
    onClose: onclose ? () => {setCancel({...cancel, modal: true})} : () => {}
  })

  const confirmRefundBonuses = (bid, onclose) => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    children: 'Отменить услугу и вернуть бонусы?',
    labels: {confirm: 'Подтвердить', cancel: 'Назад'},
    onConfirm: async () => {
      await pb.collection('service_bids').update(bid?.id, {
        status: 'cancelled',
        total_cost2: bid?.total_cost,
        refunded: true,
        refunded_sum: bid?.total_cost - bid?.costs?.bonuses ?? 0,
      })
      .then(async () => {
        await pb.collection(user?.collectionName).update(user?.id, {
          'bonuses+': bid?.costs?.bonuses ?? 0
        })
        .then(() => {
          window.location.reload()
        })
      })
    },
    onClose: onclose ? () => {setCancel({...cancel, modal: true})} : () => {}
  })

  const confirmRefundCard = () => openConfirmModal({
    title: 'Подтвердите действие',
    centered: true,
    children: 'Отменить услугу и вернуть средства на карту?',
    labels: {confirm: 'Подтвердить', cancel: 'Назад'},
    onConfirm: async () => {
      await pb.collection('service_bids').update(cancel?.bid?.id, {
        status: 'refunded',
        total_cost2: cancel?.bid?.costs?.card,
        refund_data: {...refund}
      })
      .then(() => {
        window.location.reload()
      })
    },
    onClose: () => {setCancel({...cancel, modal: true})}
  })

  function handleBalanceRefund (bid, onclose, com) {
    setCancel({...cancel, modal: false})
    confirmRefundBalance(bid, onclose, com)
  }

  function handleCardRefund () {
    setCancel({...cancel, modal: false})
    confirmRefundCard()
  }

  const [refundType, setRefundType] = React.useState('')

  const [currentAgent, setCurrentAgent] = React.useState(user)

  const [agentLoading, handlers] = useDisclosure(false)

  React.useEffect(() => {
    setCurrentAgent(user)
  }, [user])

  const [shitModal, setShitModal] = React.useState(false)

  const matches = useMediaQuery(`(min-width: 767px)`)

  if (loading) {
    return <></>
  }

  if (!user?.verified) {
    return (
      <>
        <LoadingOverlay visible={paymentLoading || verifyLoading} />
        <div className="container h-full">
          <div className='flex justify-center items-center h-full flex-col'>
            <div className='flex gap-4 items-end'>
              Ваш профиль не верифицирован, ваш ID: {user?.id}
              <Button
                compact
                variant='outline'
                color='red'
                onClick={signout}
                className='mt-2'
              >
                Выйти
              </Button>
            </div>
            <p className='text-center mt-4 font-bold'>
              Выберите способ оплаты
            </p>
            <div className='mt-2'>
              <div className='p-4 border rounded-primary shadow-md bg-white max-w-xs w-full text-center'>
                <p className='text'>Онлайн оплата с помощью банковской карты</p>
                <div className='flex justify-center items-center'>
                  <img src={visa} alt="" className='max-w-[40px]' />
                  <img src={mastercard} alt="" className='object-contain max-w-[40px]' />
                </div>
                <p className='text-xl font-bold mt-2'>
                  Visa/MasterCard
                </p>
                <Button 
                  className='mt-4' 
                  onClick={submit}  
                >
                  Оплатить
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    ) 
  }

  return (
    <MantineProvider
      withGlobalStyles
      withCSSVariables
      emotionCache={cache}
      theme={{
        primaryColor: color,
        primaryShade: color == 'orange' ? 5 : 6,
        defaultRadius: 'md',
      }}
    >
      <div className="w-full">
        <div className="container">
          <div className="w-full bg-white shadow-md rounded-primary p-4">
            <div className="grid lg:grid-cols-[25%_auto] gap-6">
              <div className='mt-1'>

                <AgentsData count={count} setCount={setCount} balance={balance} bonuses={bonuses}/>

              </div>
              <div className="relative overflow-hidden">

                {!user?.agent && (
                  <>
                    <div className='!inline-block lg:!hidden'>
                      <Button
                        component={'a'}
                        href='/agent.pdf'
                        target='_blank'
                        aria-hidden
                      >
                        Вознаграждения
                      </Button>
                    </div>
                    <div className='!hidden lg:!inline-block'>
                      <Button 
                        onClick={() => setShitModal(true)}
                        aria-hidden
                      >
                        Вознаграждения
                      </Button>
                    </div>
                  </>
                )}

                {user?.agent && (
                  <AgentsList setCount={setCount} />
                )}
                <div className="overflow-auto">


                {user?.agent && (
                  <div className='relative mt-20'>
                    <LoadingOverlay visible={agentLoading} />
                    <div className='grid grid-cols-[10%_auto_10%] items-end'>
                      <Button
                        onClick={async () => {
                          setCurrentAgent(user)
                        }}
                        variant='light'
                      >
                        <MdKeyboardArrowLeft size={30}/>

                      </Button>
                      
                      <div className='flex mt-2 mx-auto w-fit max-[208px]'>
                        <Avatar
                          src={currentAgent?.avatar}
                          className='aspect-square !w-16 !h-16 mx-auto'
                          radius='xl'
                          record={currentAgent}
                        />
                        <div className='flex flex-col justify-center ml-2'>
                          <p className='text-lg font-head'>
                            {currentAgent?.fio}
                          </p>
                          <p className='mt-1 text'>
                            {dayjs(currentAgent?.created).format('DD.MM.YYYY')}
                          </p>
                        </div>
                      </div>
                      <div></div>
                    </div>

                    <p className='mt-4'>Пользователей: {currentAgent?.expand?.creeps?.length ?? 0}</p>
                    
                    <div className='flex border p-4 space-x-8 overflow-x-scroll'>
                      {(currentAgent?.expand?.creeps?.length == 0 || !currentAgent?.expand?.creeps?.length) ? (
                        <p className='text-center'>Не найдено пользователей</p>
                      ) : (
                        <>
                          {currentAgent?.expand?.creeps?.map(q => {
                            return (
                              <div 
                                className='flex cursor-pointer items-center'
                                onClick={async () => {
                                  handlers.open()
                                  await pb.collection('agents').getOne(q?.id, {expand: 'creeps'})
                                  .then(res => {
                                    setCurrentAgent(res)
                                  })
                                  .finally(() => {
                                    handlers.close()
                                  })
                                }}
                                key={q?.id}
                              >
                                <div className='relative'>
                                  {/* <div className='absolute left-1/2 bottom-1/2 h-16 w-0.5 bg-primary-500 z-10'/> */}
                                  <Avatar
                                    src={q?.avatar}
                                    className={'aspect-square !w-14 !h-14 mx-auto z-20'}
                                    radius='xl'
                                    record={q}
                                  />
                                </div>
                                <div className='flex flex-col justify-center ml-2'>
                                  <p className={clsx('text-lg font-head w-fit max-[208px] overflow-hidden', { })}>
                                    {q?.fio}
                                  </p>
                                  <p className='mt-1 text'>
                                    {dayjs(q?.created).format('DD.MM.YYYY')}
                                  </p>
                                </div>
                              </div>
                            )
                          })}
                        </>
                      )}
                    </div>
                  </div>
                )}
                <div className='mt-6'>
                  <Quiz/>
                </div>
                {withdraws?.length !== 0 && (
                  <div className="mt-12 overflow-scroll">
                    <h2 className="text-center text-xl font-head">Выводы</h2>
                    <Table className="border mt-4">
                      <thead>
                        <tr>
                          <th>Дата</th>
                          <th>Сумма</th>
                          <th>Карта</th>
                          <th>Владелец карты</th>
                          <th>Статус</th>
                        </tr>
                      </thead>
                      <tbody>
                        {withdraws?.map((withdraw, i) => {
                          return (
                            <tr key={i} className="text">
                              <td className='whitespace-nowrap'>
                                {dayjs(withdraw?.created).format(
                                  'YY-MM-DD, HH:mm'
                                )}
                              </td>
                              <td>{formatNumber(withdraw?.sum)}</td>
                              <td>{withdraw?.card}</td>
                              <td>{withdraw?.owner ?? withdraw?.agent ? withdraw?.agent : withdraw?.user}</td>
                              <td>
                                {withdraw?.status === 'created' &&
                                  'В обработке'}
                                {withdraw?.status === 'paid' && 'Завершено'}
                                {withdraw?.status === 'rejected' && 'Отклонено'}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}
                {transfers?.length !== 0 && (
                  <div className="mt-12 overflow-scroll">
                    <h2 className="text-center text-xl font-head">Переводы</h2>
                    <Table className="border mt-4">
                      <thead>
                        <tr>
                          <th>Дата</th>
                          <th>Сумма</th>
                          <th>Отправитель</th>
                          <th>Получатель</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transfers?.map((transfer, i) => {
                          return (
                            <tr key={i} className="text">
                              <td className='whitespace-nowrap'>
                                {dayjs(transfer?.created).format('YY-MM-DD, HH:mm')}
                              </td>
                              <td>{formatNumber(transfer?.sum)}</td>
                              <td>{transfer?.user}</td>
                              <td>{transfer?.taker}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}
                {bids?.length !== 0 && (
                  <div className="mt-12 overflow-scroll">
                    <h2 className="text-center text-xl font-head">Услуги</h2>
                    <Table className="border mt-4">
                      <thead>
                        <tr>
                          <th>ФИО</th>
                          <th>Стоимость</th>
                          <th>Услуги</th>
                          <th>Статус</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {bids?.map((q, i) => {
                          return (
                            <tr key={i}>
                              <td>{q.name}</td>
                            <td>{q.total_cost} тг</td>
                              <td>
                                <Button
                                  variant='outline'
                                  compact
                                  onClick={() => setViewModal({modal: true, services: q?.serv1ce})}
                                >
                                  Услуги
                                </Button>
                              </td>
                              <td>
                                {(q.status === 'cancelled' || q.status === 'refunded') && `Отменена`}
                                {q.status === 'rejected' && `Отклонена`}
                                {q.status === 'created' && `Приобретена`}
                                {q.status === 'succ' && `Одобрена`}
                              </td>
                              <td>
                                <div className='cursor-pointer'>
                                  {(q?.status === 'created' && !q?.pay && !q?.bonuses) && <FaCircleXmark color="gray" size={20} onClick={() => confirmRefundBalance(q)}/>}
                                  {(q?.status === 'created' && q?.pay && !q?.bonuses) && <FaCircleXmark color="gray" size={20} onClick={() => setCancel({bid: q, modal: true})}/>}
                                  {(q?.status === 'created' && !q?.pay && q?.bonuses) && <FaCircleXmark color="gray" size={20} onClick={() => confirmRefundBonuses(q)}/>}
                                  {(q?.status === 'waiting') && <FaCircleXmark color="gray" size={20} onClick={() => setCancel({bid: q, modal: true})} />}
                                  {/* {(q?.status === 'created') && <FaCircleXmark color="gray" size={20} onClick={() => setCancel({bid: q, modal: true})} />} */}
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}

                <ScrollArea
                  maw={'100%'}
                >
                  <div className="mt-12 overflow-scroll">
                    <h2 className="text-center text-xl font-head">История</h2>
                    <Table className="border mt-4">
                      <thead>
                        <tr>
                          <th>Дата</th>
                          <th>Тип</th>
                          <th>ID</th>
                          <th>Сумма</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bonuses?.referals?.map((q, i) => {
                          return (
                            <tr key={i} className="text">
                              <td className='whitespace-nowrap'>
                                {dayjs(q?.created).format(
                                  'DD.MM.YYYY, HH:mm'
                                )}
                              </td>
                              <td className="text-black">
                                Реферал
                              </td>
                              <td>{q?.referal}</td>
                              <td className='text-green-500'>+ {formatNumber(q?.sum)}</td>
                            </tr>
                          )
                        })}
                        {bonuses?.bonuses?.sort((q, w) => q?.created < w?.created)?.map((q, i) => {
                          return (
                            <tr key={i} className="text">
                              <td className='whitespace-nowrap'>
                                {dayjs(q?.created).format(
                                  'DD.MM.YYYY, HH:mm'
                                )}
                              </td>
                              <td className="text-black">Бонус</td>
                              <td>-</td>
                              <td className='text-green-500'>+ {formatNumber(q?.sum)}</td>
                            </tr>
                          )
                        })}
                        {bonuses?.replenish?.map((q, i) => {
                          return (
                            <tr key={i} className="text">
                              <td className='whitespace-nowrap'>
                                {dayjs(q?.created).format(
                                  'DD.MM.YYYY, HH:mm'
                                )}
                              </td>
                              <td className="text-black">Пополнение</td>
                              <td>-</td>
                              <td className='text-green-500'>+ {formatNumber(q?.sum)}</td>
                            </tr>
                          )
                        })}
                        {bonuses?.withdraws?.map((q, i) => {
                          return (
                            <tr key={i} className="text">
                              <td className='whitespace-nowrap'>
                                {dayjs(q?.created).format(
                                  'DD.MM.YYYY, HH:mm'
                                )}
                              </td>
                              <td className="text-black">Вывод</td>
                              <td>-</td>
                              <td className='text-red-500'>- {formatNumber(q?.sum)}</td>
                            </tr>
                          )
                        })}
                        {bonuses?.services?.map((q, i) => {
                          return (
                            <tr key={i} className="text">
                              <td className='whitespace-nowrap'>
                                {dayjs(q?.created).format(
                                  'DD.MM.YYYY, HH:mm'
                                )}
                              </td>
                              <td className="text-black">Услуга</td>
                              <td>-</td>
                              <td className='text-red-500'>- {formatNumber(q?.sum)}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </div>
                </ScrollArea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        opened={viewModal.modal}
        onClose={() => setViewModal({services: [], modal: false})}
        centered
      >
        {viewModal.services?.map((service, i) => {
          return (
            <div 
              key={i}
              className='justify-between gap-6 border p-4 rounded-lg'
            >
              <div>
                <p className='text-lg'>{service.title}</p>
                <p className='text-sm'>{service.description}</p>
              </div>
              <div className='space-y-2'> 
                <p className='font-bold text-2xl'>{service.cost} тг</p>
              </div>
            </div>
          )
        })}
      </Modal>
      <Modal 
        opened={cancel.modal}
        onClose={() => setCancel({modal: false, bid: {}})}
        centered
        title='Отмена услуги'
      >
        <div>
          {cancel?.bid?.serv1ce?.map((service, i) => {
            return (
              <div 
                key={i}
                className='justify-between border p-4 rounded-lg mb-4'
              >
                <div>
                  <p className='text-lg'>{service.title}</p>
                </div>
                <div className='space-y-2'> 
                  <p className='font-bold text-2xl'>{service.cost} тг</p>
                </div>
              </div>
            )
          })}
          <p className='text text-sm'>
            При отмене услуги коммисия 5% от стоимости
          </p>
          {/* <p>
             {cancel?.bid?.total_cost}
          </p> */}
          <p className='flex gap-2 mt-4 text-lg'>
            <span>
              Сумма возврата:
            </span> 
            <span className='font-bold'>
              {(cancel?.bid?.total_cost)} тг
            </span>
          </p>
          <p className='flex gap-2 mt-1 text-lg'>
            <span>
              Карта:
            </span> 
            <span className='font-bold'>
              {(cancel?.bid?.costs?.card)} тг
            </span>
          </p>
          {cancel?.bid?.pay_bonuses && (
            <p className='flex gap-2 mt-1 text-lg'>
              <span>
                Бонусы:
              </span> 
              <span className='font-bold'>
                {(cancel?.bid?.costs?.bonuses)} тг
              </span>
            </p>
          )}
          <Radio.Group
            label="Выберите куда вернуть средства"
            withAsterisk
            value={refundType}
            onChange={e => setRefundType(e)}
            classNames={{
              label: '!text-base'
            }}
            className='mt-4'
          >
            <Group mt="xs">
              <Radio value="balance" label="Баланс" classNames={{label: `text-base`}} />
              <Radio value="card" label="Карта" classNames={{label: `text-base`}} />
            </Group>
          </Radio.Group>
          {refundType === 'card' && (
            <form className='mt-4'>
              <TextInput
                value={refund?.fio}
                placeholder="ФИО"
                label="Владелец счета"
                variant="filled"
                name="fio"
                onChange={q => setRefund({...refund, fio: q.currentTarget.value})}
              />
              <TextInput
                inputMode='numeric'
                value={refund?.iin ?? ''}
                onChange={q => setRefund({...refund, iin: q.currentTarget.value})}
                placeholder="030627129340"
                label="ИИН"
                variant="filled"
                name="iin"
                maxLength={12}
              /> 
              <TextInput
                value={refund?.iban}
                placeholder="KZ123456789123456789"
                label="Номер счета карты (IBAN)"
                variant="filled"
                name="iban"
                maxLength={20}
                onChange={q => setRefund({...refund, iban: q.currentTarget.value})}
              />
            </form>
          )}
          {refundType === 'balance' && (
            <div className='flex justify-center mt-4'>
              <Button 
                onClick={() => handleBalanceRefund(cancel?.bid, true, true)}
              >
                Подтвердить
              </Button>
            </div>
          )}
          {refundType === 'card' && (
            <div className='flex justify-center mt-4'>
              <Button 
                onClick={handleCardRefund}
                disabled={!((refund?.iban?.toString()?.length > 10) && (refund?.iin?.toString()?.length > 6))}
              >
                Подтвердить
              </Button>
            </div>
          )}
        </div>
      </Modal>
      <Modal
        opened={shitModal}
        onClose={() => setShitModal(false)}
        centered
        size="xl"
        fullScreen={matches ? false : true}
      >
        <img src={market} alt="" className="h-full" />
      </Modal>
    </MantineProvider>
  )
}