import React from 'react'
import { useAuth } from 'shared/hooks'
import { Button, Group, Modal, Radio, ScrollArea, Table } from '@mantine/core'
import dayjs from 'dayjs'

import market from 'shared/assets/images/agent.png'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { openConfirmModal } from '@mantine/modals'
import { pb } from 'shared/api'

import { getImageUrl } from 'shared/lib'
import { useLangContext } from 'app/langContext'
import { FaUserGroup } from 'react-icons/fa6'
import { FaUsers } from 'react-icons/fa'
import { Avatar } from 'shared/ui'
import { DateInput } from '@mantine/dates'
import { showNotification } from '@mantine/notifications'
import axios from 'axios'

import { BiLogoTelegram } from "react-icons/bi";

export const AgentsList = ({ setCount }) => {
  
  const { kz } = useLangContext()

  const { user } = useAuth()

  const [shitModal, setShitModal] = React.useState(false)

  const [periodM, periodM_h] = useDisclosure()

  const [periodMLoading, periodMLoading_h] = useDisclosure(false)

  const matches = useMediaQuery(`(min-width: 767px)`)

  const secondLine = user?.expand?.creeps
    ?.map((q) => {
      return q?.expand?.creeps
    })
    ?.filter((w) => {
      return w != undefined
    })
    ?.flat(1)

  secondLine?.map(q => {
    if (q?.agent && !q?.agent_date) {
      return console.log(q, 'q');
    }
  })

  const thirdLine = secondLine
    ?.map((q) => {
      return q?.expand?.creeps
    })
    ?.filter((w) => {
      return w != undefined
    })
    ?.flat(1)

    thirdLine?.map(q => {
      if (q?.agent && !q?.agent_date) {
        return console.log(q, 'w');
      }
    })

  const [dates, setDates] = React.useState({
    from: new Date(),
    to: new Date()
  })

  const allLines = user?.expand?.creeps?.concat(secondLine, thirdLine)

  const firstLinePeriod = user?.expand?.creeps?.filter(q => {
    return (
      new Date(q?.agent_date)?.getTime() >= new Date(dates?.from)?.getTime() && 
      new Date(q?.agent_date)?.getTime() <= new Date(dates?.to)?.getTime())
  })
  
  const secondLinePeriod = secondLine?.filter(q => {
    return (
      new Date(q?.agent_date)?.getTime() >= new Date(dates?.from)?.getTime() && 
      new Date(q?.agent_date)?.getTime() <= new Date(dates?.to)?.getTime())
  })

  const thirdLinePeriod = thirdLine?.filter(q => {
    return (
      new Date(q?.agent_date)?.getTime() >= new Date(dates?.from)?.getTime() && 
      new Date(q?.agent_date)?.getTime() <= new Date(dates?.to)?.getTime())
  })

  const allLinesPeriod = firstLinePeriod?.concat(secondLinePeriod, thirdLinePeriod)

  async function checkOneYearSubsribtion () {
    if (!user?.verified_date) return
    if ((new Date(user?.verified_date).getTime() + 31556926667) <= new Date().getTime() ) {
      return await axios.post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/subsribtion`, user)
    }

    if ((new Date(user?.agent_date).getTime() + 31556926667) <= new Date().getTime()) {
      return await axios.post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/subsribtion-agent`, user)
    }
  }

  React.useEffect(() => {
    checkOneYearSubsribtion()
  }, [])

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between gap-3 ">
          <div>
            {/* <Button onClick={() => setShitModal(true)}>Вознаграждения</Button> */}
            <div className='flex gap-4'>
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

              <Button 
                rightIcon={<BiLogoTelegram size={20}/>}
                component='a'
                href='https://t.me/+HB5KDI15ajZlYzJi'
                target='_blank'
                color='cyan'
              >
                Телеграм чат
              </Button>
            </div>
            
            {user?.expand?.sponsor && (
              <div className="w-fit mt-4">
                <p className="text-sm ml-2">Агент-наставник:</p>
                <div className="flex mt-2">
                  <Avatar
                    src={user?.expand?.sponsor?.avatar}
                    className="aspect-square !w-16 !h-16 mx-auto"
                    radius="xl"
                    record={user?.expand?.sponsor}
                  />
                  <div className="flex flex-col justify-center ml-2">
                    <p className="text-lg font-head">{user?.expand?.sponsor?.fio}</p>
                    <p className="mt-1 text">
                      {dayjs(user?.expand?.sponsor?.created).format('DD.MM.YYYY')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end">
            <div className="flex gap-1 items-center border-b-2 whitespace-nowrap">
              <p className="text" onClick={() => setCount((q) => q + 1)}>
                Статистика:
              </p>
              <FaUsers size={20} color="green" />
              <p className='whitespace-nowrap'>
                ({allLines?.length ?? 0} /{' '}
                <span className="text-green-400">{allLines?.filter((q) => {return q?.agent})?.length ?? 0}</span>)
              </p>
            </div>
            <div className="flex gap-1 items-center border-b-2">
              <p className="text">1-линия:</p>
              <FaUserGroup size={20} color="green" />
              <p className="text-bold whitespace-nowrap" >
                ({user?.creeps?.length ?? 0} /{' '}
                <span className="text-green-400">
                  {user?.expand?.creeps?.filter((q) => q?.agent)?.length ?? 0}
                </span>
                ){' '}
              </p>
            </div>
            <div className="flex gap-1 items-center border-b-2">
              <p className="text">2-линия:</p>
              <FaUserGroup size={20} color="green" />
              <p className="text-bold whitespace-nowrap">
                ({secondLine?.length ?? 0} /{' '}
                <span className="text-green-400">
                  {secondLine?.filter((q) => q?.agent)?.length ?? 0}
                </span>
                ){' '}
              </p>
            </div>
            <div className="flex gap-1 items-center border-b-2">
              <p className="text">3-линия:</p>
              <FaUserGroup size={20} color="green" />
              <p className="text-bold whitespace-nowrap">
                ({thirdLine?.length ?? 0} /{' '}
                <span className="text-green-400">{thirdLine?.filter((q) => q?.agent)?.length ?? 0}</span>
                )
              </p>
            </div>
            <Button className="mt-2" compact variant="subtle" onClick={(e) => periodM_h.open()}>
              Отчет
            </Button>
          </div>
        </div>
      </div>
      <Modal 
        opened={periodM} 
        onClose={(e) => periodM_h.close()} 
        size='xl'
        title='Отчет'
        classNames={{
          title: '!text-xl'
        }}
      >
        <div className="gap-4 min-h-[400px]">
          <div className='flex flex-col md:flex-row items-center gap-4'>
            <p>За период </p>
            <div>
              <input 
                type='date'
                // maw={400} 
                // mx="auto" 
                // locale='ru' 
                // valueFormat='DD.MM.YYYY' 
                value={dates?.from} 
                onChange={e => setDates({...dates, from: e?.currentTarget?.value})}
                // variant='filled'
                disabled={periodMLoading}
              />
            </div>
            <p>до</p>
            <input 
              type='date'
              // maw={400} 
              // mx="auto" 
              // locale='ru' 
              // valueFormat='DD.MM.YYYY' 
              value={dates?.to} 
              onChange={e => setDates({...dates, to: e?.currentTarget?.value})}
              // variant='filled'
              disabled={periodMLoading}
            />
            {/* <Button 
              compact 
              variant='subtle'
              onClick={async () => {
                await pb.collection('agents').getFullList({
                  filter: `
                    agent_date >= '${dates?.from?.toISOString().split('T')[0]}' && 
                    agent_date <= '${dates?.to?.toISOString().split('T')[0]}' && 
                    `,
                  expand: 'sponsor, creeps.creeps.creeps'
                })
                .then(res => {
                  setUsers(res)
                  console.log(res, 'res');
                })
              }}
            >
              Подтвердить
            </Button> */}
          </div>
          <div className='flex gap-1 mt-2'>
            Общее: <span className='font-bold text-primary-500'>{allLinesPeriod?.length ?? 0}</span>
          </div>
          <div className='mt-3'>
            <Button
              compact
              disabled={allLinesPeriod?.length === 0}
              onClick={e => {
                periodM_h.close()
                openConfirmModal({
                  title: 'Отчет',
                  centered: true,
                  labels: {confirm: 'Подтвердить', cancel: 'Отмена'},
                  onConfirm: async () => {
                    periodMLoading_h.open()
                    await pb.collection('reports').create({
                      agent: user?.id,
                      data: {
                        ...dates, 
                        '1': firstLinePeriod,
                        '2': secondLinePeriod,
                        '3': thirdLinePeriod,
                      }
                    })
                    .then(res => {
                      showNotification({
                        title: 'Отчет',
                        color: 'green',
                        message: 'Отчет отправлен успешно!'
                      })
                      periodMLoading_h.close()
                      periodM_h.close()
                    })
                    .catch(err => {
                      showNotification({
                        title: 'Отчет',
                        color: 'color',
                        message: 'Не удалось отправить отчет, попробуйте еще раз позже'
                      })
                    })
                    .finally(res => {
                      periodMLoading_h.close()
                    })
                  },
                  onCancel: () => {
                    periodM_h.open()
                  },
                  children: 'Вы действительно хотите отправить отчет?',
                  confirmProps: {
                    color: 'green'
                  }
                })
              }}
              loading={periodMLoading}
            >
              Отправить отчет
            </Button>
          </div>

          <p className='text-sm text-center mt-4'>1-я линия: <span className='text-primary-500 font-bold'>{firstLinePeriod?.length ?? 0}</span></p>
          {firstLinePeriod?.length !== 0 && (
            <ScrollArea>
              <Table>
                <thead>
                  <tr>
                    <th className='!text-slate-500 !font-light'>ФИО</th>
                    <th className='!text-slate-500 !font-light'>ID</th>
                    <th className='!text-slate-500 !font-light'>ID спонсора</th>
                    <th className='!text-slate-500 !font-light'>Дата становления</th>
                  </tr>
                </thead>
                <tbody>
                  {firstLinePeriod?.map((q, i) => {
                    return (
                      <tr key={i}>

                        <td>{q?.fio}</td>
                        <td>{q?.id}</td>
                        <td>{q?.sponsor}</td>
                        <td>{dayjs(q?.agent_date).format('DD.MM.YYYY, HH:mm')}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </ScrollArea>
          )}
          <p className='mt-6 text-sm text-center '>2-я линия: <span className='text-primary-500 font-bold'>{secondLinePeriod?.length ?? 0}</span></p>
          {secondLinePeriod?.length !== 0 && (
            <ScrollArea>
              <Table>
                <thead>
                  <tr>
                    <th className='!text-slate-500 !font-light'>ФИО</th>
                    <th className='!text-slate-500 !font-light'>ID</th>
                    <th className='!text-slate-500 !font-light'>ID спонсора</th>
                    <th className='!text-slate-500 !font-light'>Дата становления</th>
                  </tr>
                </thead>
                <tbody>
                  {secondLinePeriod?.map((q, i) => {
                    return (
                      <tr key={i}>

                        <td>{q?.fio}</td>
                        <td>{q?.id}</td>
                        <td>{q?.sponsor}</td>
                        <td>{dayjs(q?.agent_date).format('DD.MM.YYYY, HH:mm')}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </ScrollArea>
          )}
          <p className='mt-6 text-sm text-center '>3-я линия: <span className='text-primary-500 font-bold'>{thirdLinePeriod?.length ?? 0}</span></p>
          {thirdLinePeriod?.length !== 0 && (
            <ScrollArea>
              <Table>
                <thead>
                  <tr>
                    <th className='!text-slate-500 !font-light'>ФИО</th>
                    <th className='!text-slate-500 !font-light'>ID</th>
                    <th className='!text-slate-500 !font-light'>ID спонсора</th>
                    <th className='!text-slate-500 !font-light'>Дата становления</th>
                  </tr>
                </thead>
                <tbody>
                  {thirdLinePeriod?.map((q, i) => {
                    return (
                      <tr key={i}>

                        <td>{q?.fio}</td>
                        <td>{q?.id}</td>
                        <td>{q?.sponsor}</td>
                        <td>{dayjs(q?.agent_date).format('DD.MM.YYYY, HH:mm')}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </ScrollArea>
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
    </>
  )
}