import React from 'react'
import { Badge, Button, Checkbox, Group, Loader, Modal, PasswordInput, Select, Tabs, TextInput } from '@mantine/core'
import { DatePickerInput, DateTimePicker } from '@mantine/dates'
import { cities, formatNumber } from 'shared/lib'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { useAuth, useUtils } from 'shared/hooks'
import { pb } from 'shared/api'
import { CopyBtn, Capthca, Withdraw } from 'shared/ui'
import { Controller, useForm } from 'react-hook-form'
import { useDisclosure } from '@mantine/hooks'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useLangContext } from 'app/langContext'
import coursesImg from 'shared/assets/images/courses-img.svg'
import { AgentsAvatar } from './AgentsAvatar'
import { sha512 } from 'js-sha512'
import axios from 'axios'
import { HiDocumentCheck } from 'react-icons/hi2'

import market from 'shared/assets/images/agent.pdf'

async function getAgentBid (id) {
  return (await pb.collection('agents_bids').getFullList({filter: `bid_id = '${id}'`}))?.[0]
}

export const AgentsData = ({count, setCount, balance, bonuses}) => {

  const {kz} = useLangContext()

  const {user} = useAuth()

  const [bid, setBid] = React.useState({
    status: 'waiting'
  })

  React.useEffect(() => {
    if (user?.bid_id) {
      getAgentBid(user?.bid_id)
      .then(res => {
        setBid(res)
        pb.collection('agents_bids').subscribe(res?.id, ({record}) => {
          setBid(record)
        })
      })
    } 
  }, [])

  const navigate = useNavigate()

  const {regions} = useUtils()

  const referal = `https://oz-elim.kz/login?signup=true&agent=${user?.id}`

  const [opened, { open, close }] = useDisclosure(false)
  const [opened1, handlers] = useDisclosure(false)
  const [opened2, handlers2] = useDisclosure(false)
  const [paymentLoading, handlers3] = useDisclosure(false)

  const [rModal, rModal_h] = useDisclosure(false)
  const [rModalLoading, rModalLoading_h] = useDisclosure(false)

  const [check, setCheck] = React.useState(false)

  const [d, setD] = React.useState({
    fio: bid?.data?.fio ?? user?.fio ?? '',
    iin: bid?.data?.iin ?? user?.iin ?? '',
    phone: bid?.data?.phone ?? user?.phone ?? '',
  })

  function myRandom(from, to) {
    return Math.round(Math.random() * (to - from + 1) + from)
  }

  const [cardNumber, setCardNumber] = React.useState("")

  const handleInputChange = (e) => {
    let value = e.currentTarget.value.replace(/\D/g, "")

    // Limit to 16 digits
    if (value.length > 16) {
      value = value.slice(0, 16)
    }

    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ")

    setCardNumber(formattedValue)
  }

  React.useEffect(() => {
    setCardNumber(user?.card)
  }, [user])

  const [random1] = React.useState(myRandom(10, 50))
  const [random2] = React.useState(myRandom(1, 9))
  const [answer, setAnswer] = React.useState('?')
  const equal = random1 + random2

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    values: {
      id: '',
      amount: '',
    },
  })

  const onSubmit = async (data) => {
    return await pb.collection('transfers').create(data)
  }

  React.useEffect(() => { 
    if (count === 3) {
      open()
      setCount(0)
    }
  }, [count])

  const [values, setValues] = React.useState({
    fio: '',
    iin: '',
    phone: '',
    region: '',
    village: '',
    birthday: '',
  })

  React.useEffect(() => {
    if (user) {
      setValues({
        ...user,
        birthday: new Date(user.birthday)
      })
    }
    pb.collection('agents').subscribe(user?.id, function({action, record}) {
      console.log(record, 'record');
      setValues({
        ...record,
        birthday: new Date(user.birthday)
      })
    })
  }, [])

  function handleValuesChange (e, name) {
    if (e?.currentTarget) {
      const { name, value } = e?.currentTarget
      setValues({...values, [name]: value})
      return
    }
    setValues({...values, [name]: e})
  }

  async function saveUser() {
    await pb.collection('agents').update(user?.id, {
      ...values, 
    })
    .then((res) => {
      console.log(res, 'res');
    })
  }

  const [transfer, setTransfer] = React.useState({
    id: '',
    sum: ''
  })

  function handleTransferChange (e) {
    const { value, name } = e.currentTarget
    setTransfer({ ...transfer, [name]: value })
  }

  const disabled =
    transfer?.id?.length > 10 &&
    (Number(transfer?.sum) >= 100 &&
    Number(transfer?.sum) <= user?.balance) &&
    (answer == (random1 + random2)) && 
    user?.id !== transfer?.id

  const [loading, setLoading] = React.useState(false)

  async function confirmTransfer() {

    setLoading(true)

    if (isNaN(transfer?.sum)) {
      console.log('nan');
      setLoading(false)
      return
    }

    try {
      const taker = await pb.collection('users').getOne(transfer?.id)
      if (taker) {
        await pb
          .collection('users')
          .update(taker?.id, {
            balance: taker?.balance + Number(transfer?.sum),
          })
          .then(async (res) => {
            await pb.collection('users').update(user?.id, {
              balance: user?.balance - Number(transfer?.sum),
            })
            .then(async res => {
              await pb
                .collection('transfers')
                .create({
                  user: user?.id,
                  taker: transfer?.id,
                  sum: transfer?.sum
                })
                .then((res) => {
                  showNotification({
                    title: 'Уведомление',
                    message: 'Перевод успешно совершен',
                    color: 'green',
                  })
                  setLoading(false)
                  console.log(res, 'res')
                })
            })
          })
        return
      } 
    } catch (err) { 
      setLoading(false)
      console.log('invalid taker');
    }
  }

  async function checkPaymentStatus () {
    
    const u = await pb.collection('agents').getOne(user.id)
    const token = import.meta.env.VITE_APP_SHARED_SECRET
    const string = `${u?.agents_pay?.ORDER};${u?.agents_pay?.MERCHANT}`
    const sign = sha512(token + string).toString()
    if (u?.agents_pay?.MERCHANT && u?.agents_pay?.ORDER) {
      await axios.post(`${import.meta.env.VITE_APP_PAYMENT_DEV}/api/check`, {
        ORDER: u?.agents_pay?.ORDER,
        MERCHANT: u?.agents_pay?.MERCHANT,
        GETSTATUS: 1,
        P_SIGN: sign,
      })
      .then(async res => {
        console.log(res, 'res');
        console.log(res?.data?.includes('Обработано успешно'), 'res');
        if (res?.data?.includes('Обработано успешно')) {

          const bid = (await pb.collection('agents_bids').getFullList({filter: `bid_id = '${user?.bid_id}'`}))?.[0] 

          if (bid?.status === 'waiting') {
            await pb.collection('agents_bids').update(bid?.id, {
              status: 'paid'
            })
          }
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

  const confirm = () => {
    close()
    openConfirmModal({
      title: 'Подвердить действие',
      centered: true,
      labels: { confirm: 'Да', cancel: 'Нет' },
      confirmProps: {
        loading: loading
      },
      onConfirm: () => confirmTransfer(),
      children: (
        <>Вы действительно хотите совершить перевод средств?</>
      )
    })
  }

  function signout () {
    pb.authStore.clear()
    window.location.reload()
  }

  const handleCourseClick = () => {
    navigate('/profile-courses')
  }

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

  return (
    <>
      <div className="w-full">
        <div>
          <AgentsAvatar/>
          <TextInput
            label="ID"
            variant="filled"
            defaultValue={values.id ?? ''}
            onChange={handleValuesChange}
            readOnly
            rightSection={<CopyBtn value={values?.id} />}
          />

          {user?.agent ? (
            <div className='text-center my-4'>
              <Badge
                size="xl"
                radius='md'
                variant="gradient"
                gradient={{from: 'teal.7', to: 'green.4'}}
                leftSection={<HiDocumentCheck size={20}/>}
                fullWidth
                aria-hidden={true}
              >
                <span className='text-xs'>
                  Агент по туризму
                </span>
              </Badge>
            </div>
          ) : (
            <>
              {bid?.status === 'paid' && (
                <Button
                  fullWidth
                  mt={16}
                  mb={10}
                  aria-hidden={true}
                >
                  Заявка отправлена
                </Button>
              )}
              {bid?.status === 'rejected' && (
                <Button
                  fullWidth
                  mt={16}
                  mb={10}
                  onClick={() => rModal_h.open()}
                  color=''
                  aria-hidden={true}
                >
                  Отказано
                </Button>
              )}
              {bid?.status === 'waiting' && (
                <Button
                  fullWidth
                  mt={16}
                  mb={10}
                  onClick={() => handlers.open()}
                  color={user?.agent ? 'green.6' : 'orange'}
                  aria-hidden={true}
                >
                  Агент по туризму
                </Button>
              )}
            </>
          )}
            <TextInput
              defaultValue={referal}
              variant="filled"
              label={kz ? `Рефералдық сілтеме` : `Реферальная ссылка`}
              // rightSection={<CopyBtn value={referal} disabled={true} />}
              disabled={!user?.agent}
              classNames={{
                description: !user?.agent ? '!text-red-500' : '!text-green-500'
              }}
              description={!user?.agent ? 'Не активна' : 'Активна'}
            />
          <div className="grid grid-cols-1 w-full gap-2 mt-5">
            <div className="border p-3  rounded-primary border-primary-500">
              <div className="flex gap-1 items-center ">
                <p className="text">Баланс:</p>
                <p>{formatNumber(user?.balance)}</p>
                <p className="text  ml-auto">Бонусы:</p>
                <p>{formatNumber(user?.bonuses)}</p>
              </div>
              <div className="space-y-2 mt-2">
                <Withdraw balance={balance} bonuses={bonuses}/>
              </div>
            </div>
            <div 
              onClick={handleCourseClick}
              className='rounded-lg cursor-pointer mt-2 border border-primary-500 p-4 flex flex-col justify-center items-center '
            >
              <img src={coursesImg} className='max-w-[150px] h-full' alt="" />
              <p className='mt-2 text-lg font-head'>
                Онлайн курсы
              </p>
            </div>
            <TextInput
              label={`ИИН`}
              variant="filled"
              defaultValue={values.iin ?? ''}
              name="iin"
              // onChange={handleValuesChange}
              readOnly
            />
            <TextInput
              label={kz ? `Тегі` : `ФИО`}
              variant="filled"
              defaultValue={values.fio ?? ''}
              name="fio"
              // onChange={handleValuesChange}
              readOnly
            />
            <TextInput
              label="Телефон"
              variant="filled"
              defaultValue={values.phone ?? ''}
              name="phone"
              // onChange={handleValuesChange}
              readOnly
            />

            <TextInput
              label={kz ? `Облыс` : `Область`}
              data={regions}
              variant="filled"
              defaultValue={values.region ?? ''}
              // onChange={(e) => handleValuesChange(e, 'region')}
              readOnly
            />
            <TextInput
              label={`Населенный пункт`}
              data={regions}
              variant="filled"
              defaultValue={values.village ?? ''}
              // onChange={(e) => handleValuesChange(e, 'village')}
              readOnly
            />
            <TextInput
              label="Почта"
              variant="filled"
              defaultValue={values?.email ?? ''}
              name="email"
              // onChange={handleValuesChange}
              readOnly
            />
            <TextInput
              label='IBAN счета'
              value={values?.iban ?? ''}
              name='iban'
              onChange={handleValuesChange}
              variant='filled'
              maxLength="19" 
            />
            <Select
              data={banks}
              label='Название банка'
              value={values?.bank}
              onChange={(e) => setValues({...values, bank: e})}
              variant='filled'
            />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Button compact variant="outline" color="red" onClick={signout}>
              {kz ? 'Шығу' : 'Выйти'}
            </Button>
            <Button onClick={saveUser} >
              {kz ? 'Сақтау' : 'Сохранить'}
            </Button>
          </div>

        </div>
      </div>
      <Modal 
        opened={loading}   
        onClose={() => setLoading(false)}
        centered
      >
        <div className='flex flex-col justify-center h-24 items-center'>
          <Loader size='lg'/>
          <p className='mt-4'>
            {kz ? `Сұранысты өңдеуде...`: `Обработка запроса...`}
          </p>
        </div>
      </Modal>
      <Modal
        opened={opened1}
        onClose={() => handlers.close()}
        centered
        title='Агент по туризму'
        size='40%'
      >
      <iframe src={market} width='100%' height={700} />
      <Checkbox
        label='Ознакомлен(а)'
        checked={check}
        onChange={e => setCheck(e.currentTarget.checked)}
        className='mt-4'
      />
      <div className='mt-4 flex justify-center items-center'>
        <Button 
          disabled={!check} 
          onClick={() => {
            handlers.close()
            handlers2.open()
          }}
        >
          Далее
        </Button>
      </div>
      </Modal>

      <Modal
        opened={rModal}
        centered
        onClose={() => rModal_h.close()}
        title='Агент по туризму'
      >
        <p className='text-center text-gray-500'>Причина отказа:</p>
        <p className='text-center'>
          {bid?.comment}
        </p>

        <TextInput
          label='ФИО'
          value={d?.fio}
          onChange={e => setD({...d, fio: e?.currentTarget?.value})}
          variant='filled'
        />
        <TextInput
          label='ИИН'
          value={d?.iin}
          onChange={e => setD({...d, iin: e?.currentTarget?.value})}
          variant='filled'
        />
        <TextInput
          label='Номер телефона'
          value={d?.phone}
          onChange={e => setD({...d, phone: e?.currentTarget?.value})}
          variant='filled'
          description='Укажите ваш номер из БМГ (База мобильных граждан)'
        />

        <div className='flex justify-center mt-4'>
          <Button
            loading={rModalLoading}
            onClick={async () => {
              rModalLoading_h.open()
              await pb.collection('agents_bids').update(bid?.id, {
                data: d,
                status: 'paid'
              })
              .then(() => {
                rModalLoading_h.close()
                rModal_h.close()
                showNotification({
                  title: 'Агент по туризму',
                  message: 'Заявка отправлена',
                  color: 'green'
                })
              })
              .finally(() => {
                rModalLoading_h.close()
              })
            }}
          >
            Отправить заявку
          </Button>
        </div>
      </Modal>
      
      <Modal 
        opened={opened2}
        onClose={() => {
          handlers2.close()
          handlers.open()
        }}
        centered
        title='Агент по туризму'
      >
        <TextInput
          label='ФИО'
          value={d?.fio}
          onChange={e => setD({...d, fio: e?.currentTarget?.value})}
          variant='filled'
        />
        <TextInput
          label='ИИН'
          value={d?.iin}
          onChange={e => setD({...d, iin: e?.currentTarget?.value})}
          variant='filled'
        />
        <TextInput
          label='Номер телефона'
          value={d?.phone}
          onChange={e => setD({...d, phone: e?.currentTarget?.value})}
          variant='filled'
          description='Укажите ваш номер из БМГ (База мобильных граждан)'
        />
        <p className='text-sm mt-3 text-gray-500'>
          Сумма: <span className='text-black'>15 000</span> тг
        </p>
        <div className='flex justify-center mt-4'>
          <Button
            loading={paymentLoading}
            onClick={async (e) => {
              try {
                handlers3.open()
                e.preventDefault()
                const randomNumber = Math.floor(Math.random() * 100000000)
                const token = import.meta.env.VITE_APP_SHARED_SECRET
          
                const data = {
                  ORDER: randomNumber,
                  AMOUNT: user?.email === `spinner_g@mail.ru` ? 5 : 15000,
                  // AMOUNT: 30000,
                  CURRENCY: 'KZT',
                  MERCHANT:'110-R-113431490',
                  TERMINAL: '11371491',
                  NONCE: randomNumber + 107,
                  DESC: 'Оплата',
                  CLIENT_ID: user?.id,
                  DESC_ORDER: 'Агент по туризму',
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

                  const bids = await pb.collection('agents_bids').getFullList({fields: `inc`})

                  const num = crypto.randomUUID()

                  await pb.collection('agents_bids').create({
                    inc: bids?.length + 1,
                    agent_pay: {
                      ...JSON.parse(res?.config?.data),
                      SHARED_KEY: token,
                    },
                    status: 'waiting',
                    agent: user?.id,
                    ...d,
                    data: d,
                    bid_id: num
                  })
                  await pb.collection('agents').update(user?.id, {
                    agents_pay: {
                      ...JSON.parse(res?.config?.data),
                      SHARED_KEY: token,
                    },
                    bid_id: num
                  })
                  .then(() => {
                    handlers3.close()
                    handlers2.close()
                    showNotification({
                      title: 'Агент по туризму',
                      message: 'Переходим к оплате',
                      color: 'green'
                    })
                    window.location.href = `https://jpay.jysanbank.kz/ecom/api?${searchParams}`;
                  })
                })
                .finally(() => {
                  handlers3.close()
                })
          
              } catch (err) {
                handlers3.close()
                console.log(err, 'err');
              }
            }}
          >
            Оплатить
          </Button>
        </div>
      </Modal>
      <Modal centered opened={opened} onClose={close} title="Перевод">
        <div className="flex flex-col gap-2">
          <TextInput
            placeholder="111222333111222333"
            label="ID-получателя"
            variant="filled"
            name="id"
            value={transfer?.id}
            onChange={handleTransferChange}
          />
          <TextInput
            placeholder="сумма перевода"
            label="Сумма"
            variant="filled"
            name="sum"
            value={transfer?.sum}
            onChange={handleTransferChange}
          />
          <Capthca
            random1={random1}
            random2={random2}
            answer={answer}
            setAnswer={setAnswer}
          />
          <Button
            // onClick={}
            disabled={!disabled}
            onClick={confirm}
          >
            Перевести
          </Button>
        </div>
      </Modal>
    </>
  )
}