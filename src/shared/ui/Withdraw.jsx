import React from 'react'
import { useDisclosure } from '@mantine/hooks'
import {
  Button,
  Checkbox,
  LoadingOverlay,
  Modal,
  NumberInput,
  Popover,
  Select,
  Tabs,
  TextInput,
  Textarea,
} from '@mantine/core'
import { pb } from 'shared/api'
import { openConfirmModal } from '@mantine/modals'
import { useAuth } from 'shared/hooks'
import { showNotification } from '@mantine/notifications'
import { arraysContainSameItemsById, formatNumber, totalCost } from 'shared/lib'
import { sha512 } from 'js-sha512'
import axios from 'axios'

import cardImg from 'shared/assets/images/card.png'
import { useLangContext } from 'app/langContext'
import { Link } from 'react-router-dom'

async function getServices() {
  return await pb.collection('services').getFullList()
}

async function getReplenishes(id) {
  if (!id) return
  return await pb
    .collection('replenish')
    .getFullList({ filter: `(user = '${id}' || agent = '${id}') && status = 'created'` })
}

async function getWaitingServices(id) {
  return await pb
    .collection('service_bids')
    .getFullList({ filter: `(user = '${id}' || agent = '${id}') && status = 'waiting'` })
}

async function getDogs() {
  return await pb.collection('dogs').getFullList()
}

export const Withdraw = ({ bonuses }) => {
  const [dogs, setDogs] = React.useState([])

  React.useEffect(() => {
    getDogs().then((res) => {
      setDogs(res)
    })
  }, [])

  const { user } = useAuth()

  const { kz } = useLangContext()

  const [opened, { open, close }] = useDisclosure(false)

  const [loading, setLoading] = React.useState(false)

  const banks = [
    'Народный банк Казахстана',
    'Kaspi Bank',
    'Банк ЦентрКредит',
    'Forte Bank',
    'Евразийский банк',
    'First Heartland Jusan Bank',
    'Bank RBK',
    'Bereke Bank',
    'Банк Фридом Финанс Казахстан',
    'Ситибанк Казахстан',
    'Home Credit Bank Kazakhstan',
    'Нурбанк',
  ]

  const [withdraw, setWithdraw] = React.useState({
    sum: '',
    owner: user?.fio ?? '',
    bank: user?.bank ?? '',
    iban: user?.card || '',
    iin: user?.iin ?? '',
  })

  const [dWithdraw, setDwithdraw] = React.useState({
    sum: '',
    phone: user?.phone ?? '',
    city: user?.village ?? '',
    fio: user?.fio ?? '',
    dog: '',
  })

  const [card, setCard] = React.useState('')

  async function confirmWithdraw() {
    setLoading(true)
    await pb
      .collection('withdraws')
      .create({
        ...withdraw,
        card: card,
        ...(user?.collectionName === 'agents' ? { agent: user?.id } : { user: user?.id }),
        status: 'created',
      })
      .then(async (res) => {
        await pb
          .collection(user?.collectionName)
          .update(user?.id, {
            balance: user?.balance - Number(withdraw?.sum),
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
      .catch((err) => {
        setLoading(false)
      })
  }

  async function confirmWithdrawD() {
    setLoading(true)
    await pb
      .collection('withdraws')
      .create({
        dog: dWithdraw?.dog,
        ...dWithdraw,
        ...(user?.collectionName === 'agents' ? { agent: user?.id } : { user: user?.id }),
        status: 'created',
      })
      .then(async (res) => {
        await pb
          .collection(user?.collectionName)
          .update(user?.id, {
            balance: user?.balance - Number(withdraw?.sum),
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
      .catch((err) => {
        setLoading(false)
      })
  }

  const confirm = () => {
    close()
    openConfirmModal({
      title: 'Подвердить действие',
      centered: true,
      labels: { confirm: 'Да', cancel: 'Нет' },
      children: <>Вы действительно хотите вывести средства?</>,
      confirmProps: {
        color: 'green',
      },
      onConfirm: () => confirmWithdraw(),
    })
  }

  const confirmD = () => {
    close()
    openConfirmModal({
      title: 'Подвердить действие',
      centered: true,
      labels: { confirm: 'Да', cancel: 'Нет' },
      children: <>Вы действительно хотите вывести средства?</>,
      confirmProps: {
        color: 'green',
      },
      onConfirm: () => confirmWithdrawD(),
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
          setWithdraw({ ...withdraw, sum: value })
        }
        return
      }
      return
    }
    if (name === 'sum') {
      if (/^\d*$/.test(e)) {
        setWithdraw({ ...withdraw, [name]: e })
        return
      }
    }
    setWithdraw({ ...withdraw, [name]: e })
  }

  const disabled =
    withdraw?.owner?.length > 3 &&
    Number(withdraw?.sum) >= 100 &&
    Number(withdraw?.sum) <= user?.balance &&
    // card.length == 19
    withdraw?.iban?.toString()?.length > 10 &&
    withdraw?.iin?.toString()?.length > 6

  const [services, setServices] = React.useState([])
  const [addedServices, setAddedServices] = React.useState([])

  function addService(service) {
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

  const [payBonuses, payBonuses_h] = useDisclosure()

  function handleServiceAdd() {
    setModals({ ...modals, confirm: false, services: true })
  }

  function handleServiceClose() {
    setModals({ ...modals, confirm: false })
    setAddedServices([])
    payBonuses_h.close()
  }

  React.useEffect(() => {
    getServices().then((res) => {
      setServices(res)
    })
  }, [])

  async function buyServiceWithBalance() {
    setServiceLoading(true)
    await pb
      .collection('service_bids')
      .create({
        services: [...addedServices.map((q) => q.id)],
        serv1ce: [...addedServices],
        ...(user?.collectionName === 'agents' ? { agent: user?.id } : { user: user?.id }),
        name,
        comment,
        status: 'created',
        total_cost: totalCost(addedServices),
        pay: null,
        costs: {
          bonuses: payBonuses ? user?.bonuses : 0,
          balance: payBonuses ? totalCost(addedServices) - user?.bonuses : totalCost(addedServices),
          total_cost: totalCost(addedServices),
        },
        pay_bonuses: payBonuses,
      })
      .then(async (res) => {
        await pb
          .collection(user?.collectionName)
          .update(user.id, {
            'balance-': payBonuses
              ? totalCost(addedServices) - user?.bonuses
              : totalCost(addedServices),
            'bonuses-': payBonuses ? user?.bonuses : 0,
          })
          .then(() => {
            setServiceLoading(false)
            window.location.reload()
          })
          .catch(() => {
            console.log(err, 'balance err')
            setServiceLoading(false)
          })
      })
      .catch((err) => {
        setServiceLoading(false)
        console.log(err, 'creation err')

        // window.location.reload()
      })
  }

  const [fill, setFill] = React.useState({
    modal: false,
    sum: '',
  })

  const [comment, setComment] = React.useState('')

  async function replenish(e) {
    e.preventDefault()
    setServiceLoading(true)
    const randomNumber = Math.floor(Math.random() * 100000000)
    const token = import.meta.env.VITE_APP_SHARED_SECRET

    const data = {
      ORDER: randomNumber,
      AMOUNT: user?.email == 'kurama.zxc@mail.ru' ? 5 : fill.sum,
      CURRENCY: 'KZT',
      MERCHANT: '110-R-113431490',
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

    await axios
      .post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/pay`, {
        ...data,
        P_SIGN: sign,
      })
      .then(async (res) => {
        console.log(res, 'res')
        const searchParams = new URLSearchParams(JSON.parse(res?.config?.data))
        await pb
          .collection('replenish')
          .create({
            ...(user?.collectionName === 'agents' ? { agent: user?.id } : { user: user?.id }),
            sum: user?.email == 'kurama.zxc@mail.ru' ? 5 : fill.sum,
            status: 'created',
            pay: {
              ...data,
              P_SIGN: sign,
            },
          })
          .then(() => {
            setServiceLoading(false)
            window.location.href = `https://jpay.jysanbank.kz/ecom/api?${searchParams}`
          })
          .catch(() => {
            setServiceLoading(false)
          })
      })
      .catch(() => {
        setServiceLoading(false)
      })
  }

  async function checkReplenishStatus(replenish) {
    setServiceLoading(true)
    const token = import.meta.env.VITE_APP_SHARED_SECRET

    const string = `${replenish?.pay?.ORDER};${replenish?.pay?.MERCHANT}`
    const sign = sha512(token + string).toString()

    if (replenish?.pay?.MERCHANT && replenish?.pay?.ORDER) {
      await axios
        .post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/check`, {
          ORDER: replenish?.pay?.ORDER,
          MERCHANT: replenish?.pay?.MERCHANT,
          GETSTATUS: 1,
          P_SIGN: sign,
        })
        .then(async (res) => {
          console.log(res, 'response')
          console.log(res?.data?.includes('Обработано успешно'), 'res')
          if (res?.data?.includes('Обработано успешно')) {
            await pb
              .collection('replenish')
              .update(replenish?.id, {
                status: 'paid',
              })
              .then(async (res) => {
                await pb
                  .collection(user?.collectionName)
                  .update(user?.id, {
                    'balance+': Number(replenish?.pay?.AMOUNT),
                  })
                  .then(async (res) => {
                    console.log(res, 'balance updated')
                    await pb.collection('user_bonuses').update(user?.id, {
                      replenish: [
                        ...(bonuses?.replenish ?? []),
                        {
                          created: new Date(),
                          id: crypto.randomUUID(),
                          referal: user?.id,
                          sum: Number(replenish?.pay?.AMOUNT),
                        },
                      ],
                    })
                  })
              })
              .finally(() => {
                setServiceLoading(false)
              })
            // verifyUser(user?.id)
          }
        })
        .catch((err) => {
          setServiceLoading(false)
          console.log(err)
        })
    } else {
      setServiceLoading(false)
    }
  }

  async function buyServicesWithCard(e) {
    e.preventDefault()
    setServiceLoading(true)
    const randomNumber = Math.floor(Math.random() * 100000000)
    const token = import.meta.env.VITE_APP_SHARED_SECRET

    const AMOUNT = payBonuses ? totalCost(addedServices) - user?.bonuses : totalCost(addedServices)

    const data = {
      ORDER: randomNumber,
      AMOUNT: AMOUNT,
      CURRENCY: 'KZT',
      MERCHANT: '110-R-113431490',
      TERMINAL: '11371491',
      NONCE: randomNumber + 107,
      DESC: 'Покупка услуги Ozelim (агент)',
      CLIENT_ID: user?.id,
      DESC_ORDER: 'Покупка услуги',
      EMAIL: user?.email,
      BACKREF:
        user?.collectionName === 'agents'
          ? `https://oz-elim.kz/aprofile`
          : `https://oz-elim.kz/profile`,
      Ucaf_Flag: '',
      Ucaf_Authentication_Data: '',
    }

    const dataString = `${data?.ORDER};${data?.AMOUNT};${data?.CURRENCY};${data?.MERCHANT};${data?.TERMINAL};${data?.NONCE};${data?.CLIENT_ID};${data?.DESC};${data?.DESC_ORDER};${data?.EMAIL};${data?.BACKREF};${data?.Ucaf_Flag};${data?.Ucaf_Authentication_Data};`

    const all = token + dataString
    const sign = sha512(all).toString()

    await axios
      .post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/pay`, {
        ...data,
        P_SIGN: sign,
      })
      .then(async (res) => {
        console.log(res, 'res')
        console.log(res?.data, 'res data')
        const searchParams = new URLSearchParams(JSON.parse(res?.config?.data))
        await pb
          .collection('service_bids')
          .create({
            serv1ce: [...addedServices],
            service: [...addedServices.map((q) => q.id)],
            comment,
            name,
            ...(user?.collectionName === 'agents' ? { agent: user?.id } : { user: user?.id }),
            total_cost: totalCost(addedServices),
            costs: {
              bonuses: payBonuses ? user?.bonuses : 0,
              card: totalCost(addedServices) - user?.bonuses,
            },
            pay_bonuses: payBonuses,
            status: 'waiting',
            pay: {
              ...data,
              P_SIGN: sign,
              pay_url: `https://jpay.jysanbank.kz/ecom/api?${searchParams}`,
            },
          })
          .then(async () => {
            await pb
              .collection(user?.collectionName)
              .update(user?.id, {
                bonuses: 0,
              })
              .then(() => {
                setServiceLoading(false)
                window.location.href = `https://jpay.jysanbank.kz/ecom/api?${searchParams}`
              })
          })
          .catch(() => {
            setServiceLoading(false)
          })
      })
      .catch(() => {
        setServiceLoading(false)
      })
  }

  async function buyServiceWithCardContinue(e) {
    e.preventDefault()
    window.location.href = bids?.[0]?.pay?.pay_url
  }

  async function checkBids(bid) {
    setServiceLoading(true)
    const token = import.meta.env.VITE_APP_SHARED_SECRET

    const pay = bid?.[0]?.pay

    const string = `${pay?.ORDER};${pay?.MERCHANT}`
    const sign = sha512(token + string).toString()
    if (pay?.MERCHANT && pay?.ORDER) {
      await axios
        .post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/check`, {
          ORDER: pay?.ORDER,
          MERCHANT: pay?.MERCHANT,
          GETSTATUS: 1,
          P_SIGN: sign,
        })
        .then(async (res) => {
          console.log(res, 'response')
          console.log(res?.data?.includes('Обработано успешно'), 'res')
          if (res?.data?.includes('Обработано успешно')) {
            await pb
              .collection('service_bids')
              .update(bid?.[0]?.id, {
                status: 'created',
              })
              .then((res) => {
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
    .then((res) => {
      console.log(res, 'replenish res')
      if (res.length === 0) return
      res.map(async (q, i) => {
        await checkReplenishStatus(q)
      })
    })
    getWaitingServices(user?.id).then((res) => {
      setBids(res)
      checkBids(res)
    })

    pb.collection('service_bids').subscribe('*', () =>
      getWaitingServices(user?.id).then((res) => {
        setBids(res)
        checkBids(res)
      })
    )

    setTimeout(() => {
      setServiceLoading(false)
    }, 3000)

    return () => {
      pb.collection('service_bids').unsubscribe('*')
    }
  }, [])

  async function buyServicesWithBonuses() {
    console.log(addedServices, 'addedServices')

    setServiceLoading(true)
    await pb
      .collection('service_bids')
      .create({
        services: [...addedServices.map((q) => q.id)],
        comment,
        ...(user?.collectionName === 'agents' ? { agent: user?.id } : { user: user?.id }),
        serv1ce: [...addedServices],
        name,
        status: 'created',
        total_cost: totalCost(addedServices),
        pay: null,
        bonuses: true,
        costs: {
          bonuses: totalCost(addedServices),
          balance: 0,
          total_cost: totalCost(addedServices),
        },
      })
      .then(async (res) => {
        await pb
          .collection(user?.collectionName)
          .update(user.id, {
            'bonuses-': totalCost(addedServices),
          })
          .then(() => {
            setServiceLoading(false)
            window.location.reload()
          })
          .catch(() => {
            setServiceLoading(false)
          })
      })
      .catch((err) => {
        setServiceLoading(false)
        console.log(err, 'creation error')
        // window.location.reload()
      })
  }

  return (
    <>
      <div className="w-full h-full">
        <LoadingOverlay visible={loading || serviceLoading} />
        <div className="space-y-2 mt-2">
          <Modal centered opened={opened} onClose={close} title="Вывод">
            <Tabs defaultValue="card">
              <Tabs.List grow>
                <Tabs.Tab value="card">Банковская карта</Tabs.Tab>
                <Tabs.Tab value="dir">Региональный директор</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="card" pt={16}>
                <div className="flex flex-col gap-2">
                  <NumberInput
                    description="Минимально 100 тг (все цифры слитно без пробелов)"
                    placeholder="500"
                    label="Сумма"
                    variant="filled"
                    name="sum"
                    value={withdraw?.sum}
                    onChange={(e) => handleWithdrawChange(e, 'sum')}
                    hideControls
                  />
                  <Select
                    data={banks}
                    label="Банк:"
                    value={withdraw?.bank}
                    onChange={(e) => setWithdraw({ ...withdraw, bank: e })}
                    placeholder="Выберите банк"
                    variant="filled"
                  />
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
                  <TextInput
                    value={withdraw?.iin}
                    placeholder="030627129340"
                    label="ИИН"
                    variant="filled"
                    name="iin"
                    maxLength={12}
                    onChange={(e) => handleWithdrawChange(e, 'iin')}
                  />
                  <div className="mt-4">
                    <Button fullWidth onClick={confirm} disabled={!disabled}>
                      Подтвердить
                    </Button>
                  </div>
                </div>
              </Tabs.Panel>
              <Tabs.Panel value="dir" pt={16}>
                <div className="flex flex-col gap-2">
                  <Select
                    data={dogs?.map((q) => {
                      return { label: q?.name, value: q?.id }
                    })}
                    onChange={(e) => setDwithdraw({ ...dWithdraw, dog: e })}
                    label="Региональный директор"
                    placeholder="Выберите регионального директора"
                    // variant='filled'
                  />
                  <TextInput
                    value={dogs?.filter((q) => q?.id == dWithdraw?.dog)?.[0]?.iban}
                    placeholder="KZ123456789123456789"
                    label="Номер счета карты (IBAN)"
                    variant="filled"
                    name="iban"
                    maxLength={20}
                    readOnly
                  />
                  <TextInput
                    value={dogs?.filter((q) => q?.id == dWithdraw?.dog)?.[0]?.name}
                    placeholder="ФИО"
                    label="Владелец счета"
                    variant="filled"
                    name="owner"
                    readOnly
                  />
                  <TextInput
                    value={dogs?.filter((q) => q?.id == dWithdraw?.dog)?.[0]?.iin}
                    placeholder="030627129340"
                    label="ИИН"
                    variant="filled"
                    name="iin"
                    maxLength={12}
                    readOnly
                  />
                  <NumberInput
                    description="Минимально 100 тг (все цифры слитно без пробелов)"
                    placeholder="500"
                    label="Сумма"
                    // variant="filled"
                    name="sum"
                    value={dWithdraw?.sum ?? ''}
                    onChange={(e) => setDwithdraw({ ...dWithdraw, sum: e })}
                    hideControls
                  />
                  <div className="mt-4">
                    <Button
                      fullWidth
                      onClick={confirmD}
                      disabled={!dWithdraw?.dog || !dWithdraw?.sum}
                    >
                      Подтвердить
                    </Button>
                  </div>
                </div>
              </Tabs.Panel>
            </Tabs>
          </Modal>
          <Button fullWidth onClick={open}>
            {kz ? `шығару` : `Вывод`}
          </Button>
        </div>
        <Button className="mt-3" fullWidth onClick={() => setFill({ ...fill, modal: true })}>
          {kz ? `Толықтыру` : `Пополнение`}
        </Button>
        <Button
          className="mt-3"
          fullWidth
          onClick={
            bids.length === 0
              ? () => setModals({ ...modals, confirm: true })
              : () => setModals({ ...modals, waiting: true })
          }
          // onClick={() => setModals({...modals, confirm: true})}
        >
          {kz ? 'Қызметтер' : 'Услуги'}
        </Button>
        <Button className='mt-3' component={Link} to='/tours' fullWidth>
          Туры с OzElim
        </Button>
      </div>
      <Modal
        opened={modals.services}
        onClose={() => setModals({ ...modals, services: false, confirm: true })}
        title="Услуги"
        centered
        className="relative"
      >
        <div className="space-y-4">
          {services.map((service, i) => {
            return (
              <div key={i} className="justify-between gap-6 border p-4 rounded-lg">
                <div>
                  <p className="text-lg">{service.title}</p>
                  <p className="text-sm">{service.description}</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-2xl">{service.cost} тг</p>
                  <Button
                    size="sm"
                    onClick={() => addService(service)}
                    disabled={arraysContainSameItemsById(services, addedServices).some(
                      (q) => q.id === service.id
                    )}
                  >
                    Выбрать
                  </Button>
                </div>
              </div>
            )
          })}
          <div className="absolute top-10 right-10"></div>
        </div>
        <div className="sticky inline bottom-12 left-3/4">
          <Button onClick={() => setModals({ ...modals, services: false, confirm: true })}>
            Далее
          </Button>
        </div>
      </Modal>
      <Modal opened={modals.confirm} onClose={handleServiceClose} centered>
        <div>
          {addedServices.length !== 0 && <h2 className="mb-4">Выбранные услуги</h2>}
          {addedServices.map((service, i) => {
            return (
              <div key={i} className="justify-between border p-4 rounded-lg mb-4">
                <div>
                  <p className="text-lg">{service.title}</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-2xl">{service.cost} тг</p>
                </div>
              </div>
            )
          })}
          <div className="flex justify-center mb-4">
            <Button onClick={handleServiceAdd} fullWidth>
              Добавить услугу
            </Button>
          </div>
          <TextInput
            label="ФИО"
            placeholder="Для кого вы приобретаете услугу"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            description="Обязательное поле"
          />
          <div className="flex gap-3 items-center mt-4 justify-between">
            <p>
              {' '}
              <span className="text-gray-500 text-sm">Общая стоимость:</span>{' '}
              {formatNumber(totalCost(addedServices))} тг
            </p>
            {user?.bonuses < totalCost(addedServices) && (
              <div className="flex gap-2">
                <Checkbox
                  id="c"
                  name="c"
                  checked={payBonuses}
                  onChange={() => payBonuses_h.toggle()}
                />
                <label
                  onClick={() => payBonuses_h.toggle()}
                  htmlFor="ccc"
                  className="text-gray-500 text-sm"
                >
                  потратить бонусы
                </label>
              </div>
            )}
          </div>
          {payBonuses && (
            <>
              <p className="flex gap-3 items-center mt-1">
                <span className="text-gray-500 text-sm">Потрачено бонусов:</span> -{' '}
                {formatNumber(user?.bonuses)} тг
              </p>
              <p>
                <span className="text-gray-500 text-sm">К оплате</span>:{' '}
                {formatNumber(
                  payBonuses ? totalCost(addedServices) - user?.bonuses : totalCost(addedServices)
                )}{' '}
                тг
              </p>
            </>
          )}

          <Textarea
            className="mt-4"
            label="Комментарий"
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3  justify-center w-full mt-5 gap-4">
            <div className="p-2 flex flex-col  border rounded-primary shadow-md bg-white max-w-xs w-full text-center">
              {/* <p className='text'>Онлайн оплата с помощью баланса в профиле</p> */}
              <p className="text-lg font-bold mt-2 grow">
                Баланс: <br className="md:block hidden" />
                <span className="font-normal">{formatNumber(user?.balance)}</span>
              </p>
              <Button
                className="mt-4 flex-shrink"
                onClick={buyServiceWithBalance}
                disabled={
                  totalCost(addedServices) - (payBonuses ? user?.bonuses : 0) > user?.balance ||
                  name.length < 2 ||
                  addedServices.length === 0 ||
                  bids?.length == 1
                }
              >
                Оплатить
              </Button>
            </div>
            <div className="p-2 flex flex-col  border rounded-primary shadow-md bg-white max-w-xs w-full text-center">
              <p className="text-lg font-bold mt-2 grow">
                Бонусы: <br className="md:block hidden" />{' '}
                <span className="font-normal">{formatNumber(payBonuses ? 0 : user?.bonuses)}</span>
              </p>
              <Button
                className="mt-4 flex-shrink"
                disabled={
                  user?.bonuses < totalCost(addedServices) ||
                  name.length < 2 ||
                  addedServices.length === 0 ||
                  bids?.length !== 0
                }
                onClick={buyServicesWithBonuses}
              >
                Оплатить
              </Button>
            </div>
            <div className="p-2 flex flex-col  border rounded-primary shadow-md bg-white max-w-xs w-full text-center">
              {/* <p className='text'>Онлайн оплата с помощью банковской карты</p> */}
              <p className="text-lg font-bold mt-2 grow">Visa MasterCard</p>
              <Button
                className="mt-4 flex-shrink"
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
        onClose={() => setFill({ ...fill, modal: false })}
        centered
        title="Пополнение баланса"
        classNames={{
          title: '!text-lg',
        }}
      >
        <div className="border p-4 inline-block border-primary-500 rounded-primary">
          <div>
            <img src={cardImg} alt="" className="w-20" />
            <p className="text-xl mt-3">Банковская карта</p>
          </div>
          <p className="text text-base">Коммисия 0%</p>
        </div>
        <TextInput
          value={fill.sum}
          inputMode="numeric"
          pattern="[0-9]"
          onChange={(e) => setFill({ ...fill, sum: e.currentTarget.value })}
          label="Введите сумму пополнение"
          description="от 500 T до 1 000 000 T"
          placeholder="500"
          className="mt-4"
          classNames={{
            label: '!text-lg',
            input: '!mt-3',
          }}
        />
        <div className="mt-5">
          <Button
            onClick={replenish}
            fullWidth
            // disabled={(fill.sum < 5) || isNaN(fill.sum)}
          >
            Пополнить
          </Button>
        </div>
      </Modal>
      <Modal
        opened={modals.waiting}
        onClose={() => setModals({ ...modals, waiting: false })}
        centered
        title="Услуги"
      >
        <div>
          {bids?.map((bid, i) => {
            return bid?.serv1ce?.map((service, index) => {
              return (
                <div key={service.id} className="justify-between border p-4 rounded-lg mt-4">
                  <div>
                    <p className="text-lg">{service.title}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-2xl">{service.cost} тг</p>
                  </div>
                </div>
              )
            })
          })}
          <p className="mt-4">Общая стоиомсть: {formatNumber(totalCost(bids, 'total_cost'))} тг</p>
          {bids?.[0]?.pay_bonuses && (
            <>
              <p className="mt-1">
                Потрачено бонусов: {formatNumber(bids?.[0]?.costs?.bonuses)} тг
              </p>
              <p className="mt-1">К оплате: {formatNumber(bids?.[0]?.costs?.card)} тг</p>
            </>
          )}
          <div className="flex mt-5 gap-4 justify-center">
            <Popover position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button color="red" variant="outline">
                  Отменить
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Button
                  onClick={async () => {
                    await pb
                      .collection('service_bids')
                      .delete(bids?.[0]?.id)
                      .then((res) => {
                        setModals({ ...modals, waiting: false })
                        setBids([])
                      })
                  }}
                >
                  Да
                </Button>
              </Popover.Dropdown>
            </Popover>
            <Button onClick={buyServiceWithCardContinue}>Перейти к оплате</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
