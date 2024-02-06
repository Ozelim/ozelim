import React from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Button, Group, LoadingOverlay, Modal, NumberInput, PinInput, Popover, Select, TextInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { pb } from 'shared/api'
import { openConfirmModal } from '@mantine/modals'
import { useAuth } from 'shared/hooks'
import { showNotification } from '@mantine/notifications'
import { Link } from 'react-router-dom'
import { arraysContainSameItemsById, totalCost } from 'shared/lib'
import { sha512 } from 'js-sha512'
import axios from 'axios'

import cardImg from 'shared/assets/images/card.png'
import { isNumber } from '@tiptap/react'

async function getServices () {
  return await pb.collection('services').getFullList()
}

async function getReplenishes (id) {
  if (!id) return
  return await pb.collection('replenish').getFullList({filter: `user = '${id}' && status = 'created'`})
}

async function getWaitingServices (id) {
  return await pb.collection('service_bids').getFullList({filter: `user = '${id}' && status = 'waiting'`})
}

export const Withdraw = () => {

  const {user} = useAuth()

  const [opened, { open, close }] = useDisclosure(false)

  const [loading, setLoading] = React.useState(false)

  const banks = [
    "Народный банк Казахстана",
    "Kaspi Bank",
    "Банк ЦентрКредит",
    "Forte Bank",
    "Евразийский банк",
    "First Heartland Jusan Bank",
    "Bank RBK",
    "Bereke Bank",
    "Банк Фридом Финанс Казахстан",
    "Ситибанк Казахстан",
    "Home Credit Bank Kazakhstan",
    "Нурбанк"
  ]

  const [withdraw, setWithdraw] = React.useState({
    sum: '',
    owner: '',
    bank: null,
    iban: '',
    iin: ''
  })

  const [card, setCard] = React.useState('')

  async function confirmWithdraw () {
    setLoading(true)
    await pb.collection('withdraws').create({
      ...withdraw,
      card: card,
      user: user?.id,
      status: 'created',
    })
    .then(async res => {
      await pb.collection('users').update(user?.id, {
        balance: user?.balance - Number(withdraw?.sum)
      })
      .then(() => {
        showNotification({
          title: 'Уведомление',
          message: 'Заявка на вывод подана',
          color: 'green',
        })
        window.location.reload()
      })
    })
    .catch(err => {
      setLoading(false)
    })
  }

  const confirm = () => {
    close()
    openConfirmModal({
      title: 'Подвердить действие',
      centered: true,
      labels: { confirm: 'Да', cancel: 'Нет' },
      children: (
        <>Вы действительно хотите вывести средства?</>
      ),
      onConfirm: () => confirmWithdraw(),
    })
  }

  const handleCardDisplay = () => {
    const rawText = [...card?.split(' ').join('')] // Remove old space
    const creditCard = [] // Create card as array
    rawText.forEach((t, i) => {
      if (i % 4 === 0 && i !== 0) creditCard.push(' ') // Add space
      creditCard.push(t)
    })

    return creditCard.join('') // Transform card array to string
  }

  function handleWithdrawChange(e, name) {
    if (e.currentTarget) {
      const { value, name } = e.currentTarget
      setWithdraw({ ...withdraw, [name]: value })
      if (name === 'sum') {
        if (/^[0-9\b]+$/.test(value) || value === '') {
          setWithdraw({ ...withdraw, sum: value})
        }
        return
      }
      return
    }
    setWithdraw({ ...withdraw, [name]: e })
  }

  const disabled =
    withdraw?.bank && (withdraw?.owner?.length > 3) &&
    (Number(withdraw?.sum) >= 100 && Number(withdraw?.sum) <= user?.balance) &&
    // card.length == 19
    ((withdraw?.iban?.toString()?.length > 10) && (withdraw?.iin?.toString()?.length > 6))

  const [services, setServices] = React.useState([])
  const [addedServices, setAddedServices] = React.useState([])

  function addService (service) {
    setAddedServices([...addedServices, service])
  }
 
  const [modals, setModals] = React.useState({
    services: false,
    confirm: false,
    pay: false,
    waiting: false,
  })

  const [name, setName] = React.useState('')

  const [serviceLoading, setServiceLoading] = React.useState(false)

  function handleServiceAdd () {
    setModals({...modals, confirm: false, services: true})
  }

  function handleServiceClose () {
    setModals({...modals, confirm: false})
    setAddedServices([])
  }

  React.useEffect(() => {
    getServices()
    .then(res => {
      setServices(res)
    })
  }, [])

  async function buyServiceWithBalance () {
    setServiceLoading(true)
    await pb.collection('service_bids').create({
      services: [...addedServices.map(q => q.id)],
      serv1ce: [...addedServices],      
      user: user.id,
      name,
      status: 'created',
      total_cost: totalCost(addedServices),
      pay: null,
    })
    .then(async res => {
      await pb.collection('users').update(user.id, {
        'balance-': totalCost(addedServices)
      })
      .then(() => {
        setServiceLoading(false)
        window.location.reload()
      })
      .catch(() => {
        setServiceLoading(false)
      })
    })
    .catch(() => {
      setServiceLoading(false)
      window.location.reload()
    })
  }

  const [fill, setFill] = React.useState({
    modal: false,
    sum: ''
  })

  async function replenish (e) {
    e.preventDefault()
    setServiceLoading(true)
    const randomNumber = Math.floor(Math.random() * 100000000)
    const token = import.meta.env.VITE_APP_SHARED_SECRET

    const data = {
      ORDER: randomNumber,
      AMOUNT: fill.sum,
      CURRENCY: 'KZT',
      MERCHANT:'110-R-113431490',
      TERMINAL: '11371491',
      NONCE: randomNumber + 107,
      DESC: 'Пополнение баланса Ozelim',
      CLIENT_ID: user?.id,
      DESC_ORDER: 'Пополнение',
      EMAIL: user?.email,
      BACKREF: `https://oz-elim.kz/profile`,
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
      console.log(res, 'res');
      console.log(res?.data, 'res data');
      const searchParams = new URLSearchParams(JSON.parse(res?.config?.data));
      await pb.collection('replenish').create({
        user: user?.id,
        sum: fill.sum,
        status: 'created',
        pay: {
          ...data,
          P_SIGN: sign
        }
      })
      .then(() => {
        setServiceLoading(false)
        window.location.href = `https://jpay.jysanbank.kz/ecom/api?${searchParams}`;
      })
      .catch(() => {
        setServiceLoading(false)
      })
    })
    .catch(() => {
      setServiceLoading(false)
    })
  }

  async function checkReplenishStatus (replenish) {
    setServiceLoading(true)
    const token = import.meta.env.VITE_APP_SHARED_SECRET

    const string = `${replenish?.pay?.ORDER};${replenish?.pay?.MERCHANT}`
    const sign = sha512(token + string).toString()
    
    if (replenish?.pay?.MERCHANT && replenish?.pay?.ORDER) {
      await axios.post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/check`, {
        ORDER: replenish?.pay?.ORDER,
        MERCHANT: replenish?.pay?.MERCHANT,
        GETSTATUS: 1,
        P_SIGN: sign,
      })
      .then(async res => {
        console.log(res, 'response');
        console.log(res?.data?.includes('Обработано успешно'), 'res');
        if (res?.data?.includes('Обработано успешно')) {
          await pb.collection('replenish').update(replenish?.id, {
            status: 'paid'
          })
          .then(async res => {
            await pb.collection('users').update(user?.id, {
              'balance+': replenish?.pay?.AMOUNT,
            })
          })
          .finally(() => {
            setServiceLoading(false)
          })
          // verifyUser(user?.id)
        }
      })
      .catch(err => {
        setServiceLoading(false)
        console.log(err);
      })
    }
  }

  async function buyServicesWithCard (e) {
    e.preventDefault()
    setServiceLoading(true)
    const randomNumber = Math.floor(Math.random() * 100000000)
    const token = import.meta.env.VITE_APP_SHARED_SECRET

    const data = {
      ORDER: randomNumber,
      AMOUNT: totalCost(addedServices),
      CURRENCY: 'KZT',
      MERCHANT:'110-R-113431490',
      TERMINAL: '11371491',
      NONCE: randomNumber + 107,
      DESC: 'Пополнение баланса Ozelim',
      CLIENT_ID: user?.id,
      DESC_ORDER: 'Пополнение',
      EMAIL: user?.email,
      BACKREF: `https://oz-elim.kz/profile`,
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
      console.log(res, 'res');
      console.log(res?.data, 'res data');
      const searchParams = new URLSearchParams(JSON.parse(res?.config?.data));
      await pb.collection('service_bids').create({
        serv1ce: [...addedServices],
        service: [...addedServices.map(q => q.id)],
        name,
        user: user?.id,
        total_cost: data?.AMOUNT,
        status: 'waiting',
        pay: {
          ...data,
          P_SIGN: sign
        }
      })
      .then(() => {
        setServiceLoading(false)
        window.location.href = `https://jpay.jysanbank.kz/ecom/api?${searchParams}`;
      })
      .catch(() => {
        setServiceLoading(false)
      })
    })
    .catch(() => {
      setServiceLoading(false)
    })
  }

  async function buyServiceWithCardContinue (e) {
    e.preventDefault()
    setServiceLoading(true)
    const randomNumber = Math.floor(Math.random() * 100000000)
    const token = import.meta.env.VITE_APP_SHARED_SECRET

    const data = {
      ORDER: randomNumber,
      AMOUNT: totalCost(bids, 'total_cost'),
      CURRENCY: 'KZT',
      MERCHANT:'110-R-113431490',
      TERMINAL: '11371491',
      NONCE: randomNumber + 107,
      DESC: 'Пополнение баланса Ozelim',
      CLIENT_ID: user?.id,
      DESC_ORDER: 'Пополнение',
      EMAIL: user?.email,
      BACKREF: `https://oz-elim.kz/profile`,
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
      console.log(res, 'res');
      console.log(res?.data, 'res data');
      const searchParams = new URLSearchParams(JSON.parse(res?.config?.data));
      setServiceLoading(false)
      window.location.href = `https://jpay.jysanbank.kz/ecom/api?${searchParams}`;
    })
    .catch(() => {
      setServiceLoading(false)
    })
  }

  async function checkBids (bid) {
    setServiceLoading(true)
    const token = import.meta.env.VITE_APP_SHARED_SECRET

    const pay = bid?.[0]?.pay

    const string = `${pay?.ORDER};${pay?.MERCHANT}`
    const sign = sha512(token + string).toString()
    if (pay?.MERCHANT && pay?.ORDER) {
      await axios.post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/check`, {
        ORDER: pay?.ORDER,
        MERCHANT: pay?.MERCHANT,
        GETSTATUS: 1,
        P_SIGN: sign,
      })
      .then(async res => {
        console.log(res, 'response');
        console.log(res?.data?.includes('Обработано успешно'), 'res');
        if (res?.data?.includes('Обработано успешно')) {
          await pb.collection('service_bids').update(bid?.[0]?.id, {
            status: 'created',
          })
          .then(res => {
            setBids([])
            setServiceLoading(false)
          })
          .finally(() => {
            setServiceLoading(false)
          })
        }
        setServiceLoading(false)
      })
      .catch(() => {
        setServiceLoading(false)
      })
    } else {
      setServiceLoading(false)
    }
  }

  const [bids, setBids] = React.useState([])

  React.useEffect(() => {
    getReplenishes(user?.id)
    .then(res => {
      if (res.length === 0) return
      res.map(async (q, i) => {
        await checkReplenishStatus(q)
      })
    }) 
    getWaitingServices(user?.id)
    .then(res => {
      setBids(res)
      checkBids(res)
    })
  }, [])

  return (
    <>
      <div className='w-full h-full'>
        <LoadingOverlay visible={loading || serviceLoading} />
        <div className="space-y-2 mt-2">
          <Modal centered opened={opened} onClose={close} title="Вывод">
            <div className="flex flex-col gap-2">
              <TextInput
                description='Минимально 100'
                placeholder="500"
                label="Сумма"
                variant="filled"
                name="sum"
                value={withdraw?.sum}
                onChange={handleWithdrawChange}
              />
              <Select
                data={banks}
                label='Банк:'
                value={withdraw?.bank}
                onChange={(e) => setWithdraw({...withdraw, bank: e})}
              />
              {/* <TextInput
                value={handleCardDisplay()}
                onChange={(e) => setCard(e.currentTarget.value)}
                maxLength={19}
                placeholder="8888 8888 8888 8888"
                label="Номер счета карты (IBAN)"
                variant="filled"
              /> */}
              <TextInput
                value={withdraw?.iban}
                placeholder="KZ123456789123456789"
                label="Номер счета карты (IBAN)"
                variant="filled"
                name="iban"
                maxLength={20}
                onChange={handleWithdrawChange}
              />
              <TextInput
                value={withdraw?.owner}
                placeholder="ФИО"
                label="Владелец счета"
                variant="filled"
                name="owner"
                onChange={handleWithdrawChange}
              />
              <NumberInput
                value={withdraw?.iin}
                placeholder="030627129340"
                label="ИИН"
                variant="filled"
                name="iin"
                maxLength={12}
                onChange={(e) => handleWithdrawChange(e, 'iin')}
                hideControls
              /> 
              <div className="mt-4">
                <Button 
                  fullWidth 
                  onClick={confirm} 
                  disabled={!disabled}
                >
                  Подтвердить
                </Button>
              </div>
            </div>
          </Modal>
          <Button fullWidth onClick={open}>
            Вывод
          </Button>
        </div>
        <Button 
          className='mt-3'
          fullWidth 
          onClick={() => setFill({...fill, modal: true})} 
        >
          Пополнение
        </Button>
        <Button 
          className='mt-3'
          fullWidth
          onClick={
            bids.length === 0 
              ? () => setModals({...modals, confirm: true})
              : () => setModals({...modals, waiting: true})
            }  
        >
          Услуги
        </Button>
      </div>
      <Modal
        opened={modals.services}
        onClose={() => setModals({...modals, services: false, confirm: true})}
        title='Услуги'
        centered
        className='relative'
      >
        <div className='space-y-4'>
          {services.map((service, i) => {
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
                  <Button 
                    size='sm' onClick={() => addService(service)}
                    disabled={arraysContainSameItemsById(services, addedServices).some(q => q.id === service.id)}
                  >
                    Выбрать
                  </Button>
                </div>
              </div>
            )
          })}
          <div className='absolute top-10 right-10'>
          </div>
        </div>
        <div className='sticky inline bottom-12 left-3/4'>
          <Button onClick={() => setModals({...modals, services: false, confirm: true})}>Далее</Button>
        </div>
      </Modal>
      <Modal
        opened={modals.confirm}
        onClose={handleServiceClose}
        centered
      >
        <div>
          {addedServices.length !== 0 && <h2 className='mb-4'>Выбранные услуги</h2>} 
          {addedServices.map((service, i) => {
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
          <div className='flex justify-center'>            
            <Button onClick={handleServiceAdd}>
              Добавить услугу
            </Button>
          </div>
          <TextInput 
            label='ФИО'
            placeholder='Для кого вы приобретяете услугу'
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            description='Обязательное поле'
          />
          <p className='mt-4'>Общая стоиомсть: {totalCost(addedServices)}</p>
          <div className='flex justify-center w-full mt-5 gap-4'>
            <div className='p-4 border rounded-primary shadow-md bg-white max-w-xs w-full text-center'>
              <p className='text'>Онлайн оплата с помощью баланса в профиле</p>
              <p className='text-xl font-bold mt-2'>
                Баланс: <span className='font-normal'>{user?.balance}</span> 
              </p>
              <Button 
                className='mt-4'
                onClick={buyServiceWithBalance}
                disabled={(totalCost(addedServices) > user.balance) || (name.length < 2) || addedServices.length === 0}
              >
                Оплатить
              </Button>
            </div>
            <div className='p-4 border rounded-primary shadow-md bg-white max-w-xs w-full text-center'>
              <p className='text'>Онлайн оплата с помощью банковской карты</p>
              <p className='text-xl font-bold mt-2'>
                Visa/MasterCard
              </p>
              <Button 
                className='mt-4' 
                onClick={buyServicesWithCard}
                disabled={name.length < 2 || addedServices.length === 0}
              >
                Оплатить
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        opened={fill.modal}
        onClose={() => setFill({...fill, modal: false})}
        centered
        title='Пополнение баланса'
        classNames={{
          title: '!text-lg'
        }}
      >
        <div className='border p-4 inline-block border-primary-500 rounded-primary'>
          <p>
            <img src={cardImg} alt="" className='w-20'/>
            <p className='text-xl mt-3'>Банковская карта</p>
          </p>
          <p className='text text-base'>
            Коммисия 0%
          </p>
        </div>
        <TextInput
          value={fill.sum}
          inputMode='numeric'
          pattern="[0-9]"
          onChange={e => setFill({...fill, sum: e.currentTarget.value})}
          hideControls
          label='Введите сумму пополнение'
          description='от 500 T до 1 000 000 T'
          placeholder='500'
          className='mt-4'
          classNames={{
            label: '!text-lg',
            input: '!mt-3'
          }}
        />
        <div className='mt-5'>
          <Button
            onClick={replenish}
            fullWidth
            disabled={(fill.sum < 500) || isNaN(fill.sum)}
          >
            Пополнить
          </Button>
        </div>
      </Modal>
      <Modal
        opened={modals.waiting}
        onClose={() => setModals({...modals, waiting: false})}
        centered
      >
        <div>
          {bids.map((bid, i) => {
            return bid?.serv1ce?.map((service, index) => {
              return ( 
                <div 
                  key={service.id}
                  className='justify-between border p-4 rounded-lg mt-4'
                >
                  <div>
                    <p className='text-lg'>{service.title}
                    </p>
                  </div>
                  <div className='space-y-2'> 
                    <p className='font-bold text-2xl'>{service.cost} тг</p>
                  </div>
                </div>
              )            
            })
          })}
          <p className='mt-4'>Общая стоиомсть: {totalCost(bids, 'total_cost')}</p>
          <div className='flex mt-5 gap-4 justify-center'>
            <Popover position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button color='red' variant='outline'>Отменить</Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Button onClick={async () => {
                  await pb.collection('service_bids').delete(bids?.[0]?.id)
                  .then(res => {
                    setModals({...modals, waiting: false})
                    setBids([])
                  })}}
                >
                  Да
                </Button>
              </Popover.Dropdown>
            </Popover>
            <Button onClick={buyServiceWithCardContinue}>
              Перейти к оплате
            </Button>

          </div>
        </div>
      </Modal>
    </>
  )
}
