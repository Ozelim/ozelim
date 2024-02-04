import React from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Button, Group, LoadingOverlay, Modal, NumberInput, PinInput, Select, TextInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { pb } from 'shared/api'
import { openConfirmModal } from '@mantine/modals'
import { useAuth } from 'shared/hooks'
import { showNotification } from '@mantine/notifications'
import { Link } from 'react-router-dom'
import { arraysContainSameItemsById, totalCost } from 'shared/lib'
import { sha512 } from 'js-sha512'
import axios from 'axios'

async function getServices () {
  return await pb.collection('services').getFullList()
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
    pay: false
  })

  const [name, setName] = React.useState('')

  const [serviceLoading, setServiceLoading] = React.useState(false)

  function handleServiceAdd () {
    setModals({...modals, confirm: false, services: true})
  }

  function handleServiceClose () {
    setModals({...modals, confirm: false})
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
      total_cost: totalCost(addedServices) 
    })
    .then(async res => {
      await pb.collection('users').update(user.id, {
        'balance-': totalCost(addedServices)
      })
      .finally(() => {
        setServiceLoading(false)
        window.location.reload()
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
      await pb.collection('users').update(user?.id, {
        replenish: [
          {...user.replenish},
          {...data, P_SIGN: sign},
        ]
      })
      .then(() => {
        window.location.href = `https://jpay.jysanbank.kz/ecom/api?${searchParams}`;
      })
    })
  }

  async function checkReplenishStatus () {
    const token = import.meta.env.VITE_APP_SHARED_SECRET

    user?.replenish?.map(async (q , i) => {
      const string = `${q?.ORDER};${q?.MERCHANT}`
      const sign = sha512(token + string).toString()
      
      if (q?.MERCHANT && q?.ORDER && !q?.status === 'done') {
        await axios.post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/check`, {
          ORDER: q?.ORDER,
          MERCHANT: q?.MERCHANT,
          GETSTATUS: 1,
          P_SIGN: sign,
        })
        .then(async res => {
          console.log(res, 'response');
          console.log(res?.data?.includes('Обработано успешно'), 'res');
          if (res?.data?.includes('Обработано успешно')) {
            await pb.collection('replenish').create({
              user: user?.id,
              sum: q?.AMOUNT
            })
            .then(async res => {
              await pb.collection('users').update(user?.id, {
                'balance+': q?.AMOUNT,
                replenish: [...user?.replenish, {...q, status: 'done'}]
              })
            })
            // verifyUser(user?.id)
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
    })

  }

  React.useEffect(() => {
    // checkReplenishStatus()
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
        {/* <Button fullWidth onClick={() => setFill({...fill, modal: true})} className='mt-4'>
          Пополнение
        </Button> */}
        {/* <Button fullWidth onClick={() => setModals({...modals, confirm: true})}  className='mt-4'>
          Услуги
        </Button> */}
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
                  <p className='font-bold text-lg'>{service.title}</p>
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
          <Button onClick={() => setModals({...modals, services: false, confirm: true})}>Назад</Button>
        </div>
      </Modal>
      <Modal
        opened={modals.confirm}
        onClose={handleServiceClose}
        centered
      >
        <div>
          {addedServices.length !== 0 && <h2>Выбранные услуги</h2>} 
          {addedServices.map((service, i) => {
            return (
              <div 
                key={i}
                className='justify-between border p-4 rounded-lg mt-4'
              >
                <div>
                  <p className='font-bold text-lg'>{service.title}</p>
                </div>
                <div className='space-y-2'> 
                  <p className='font-bold text-2xl'>{service.cost} тг</p>
                </div>
              </div>
            )
          })}
          <div className='flex justify-center mt-5'>            
            <Button onClick={handleServiceAdd}>
              Добавить услугу
            </Button>
          </div>
          <TextInput 
            label='Фио'
            placeholder='Для кого вы приобретяете услугу'
            value={name}
            onChange={e => setName(e.currentTarget.value)}
            description='Обязательное поле'
          />
          <p className='mt-4'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ducimus optio numquam esse provident maxime unde eos. Voluptatum, delectus veniam!
          </p>
          <div className='flex justify-center w-full mt-5 gap-4'>
            <Button 
              onClick={buyServiceWithBalance}
              disabled={(totalCost(addedServices) > user.balance) || (name.length < 2)}
            >
              Баланс
            </Button>
            <Button
              disabled={name.length < 2}
            >
              Карта
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        opened={fill.modal}
        onClose={() => setFill({...fill, modal: false})}
        centered
        title='Пополнение'
      >
        <NumberInput
          value={fill.sum}
          onChange={e => setFill({...fill, sum: e})}
          hideControls
        />
        <div className='mt-5'>
          <Button
            onClick={replenish}
          >
            Пополнить
          </Button>
        </div>
      </Modal>
    </>
  )
}
