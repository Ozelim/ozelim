import React from 'react'
import { Button, Group, Loader, Modal, PasswordInput, Select, TextInput } from '@mantine/core'
import { DatePickerInput, DateTimePicker } from '@mantine/dates'
import { cities, formatNumber } from 'shared/lib'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { useAuth, useUtils } from 'shared/hooks'
import { UserAvatar } from './UserAvatar'
import { pb } from 'shared/api'
import { CopyBtn, Capthca, Withdraw } from 'shared/ui'
import { Controller, useForm } from 'react-hook-form'
import { useDisclosure } from '@mantine/hooks'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useLangContext } from 'app/langContext'
import coursesImg from 'shared/assets/images/courses-img.svg'

export const UserData = ({count, setCount, balance, bonuses}) => {

  const {kz} = useLangContext()

  const navigate = useNavigate()

  const { pathname } = useLocation()

  const { user } = useAuth()

  const {regions} = useUtils()

  const referal = `https://oz-elim.kz/login?id=${user?.id}`

  const [opened, { open, close }] = useDisclosure(false)

  function myRandom(from, to) {
    return Math.round(Math.random() * (to - from + 1) + from)
  }

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
    name: '',
    surname: '',
    city: '',
    birthday: '',
    region: '',
    adress: '',
    email: '',
  })

  React.useEffect(() => {
    if (user) {
      setValues({
        ...user,
        birthday: new Date(user.birthday)
      })
    }
    pb.collection('users').subscribe(user?.id, function({action, record}) {
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
    await pb.collection('users').update(user?.id, values)
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

  return (
    <>
      <div className="w-full">
        <div>
          <UserAvatar />
          <TextInput
            label="ID"
            variant="filled"
            value={values.id ?? ''}
            onChange={handleValuesChange}
            readOnly
            rightSection={<CopyBtn value={values?.id} />}
          />
          <TextInput
            value={referal}
            readOnly
            variant="filled"
            label={kz ? `Рефералдық сілтеме` : `Реферальная ссылка`}
            rightSection={<CopyBtn value={referal} />}
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
                    {/* <ConfirmModal
                      onSubmit={onSubmit}
                      equal={equal}
                      answer={answer}
                    /> */}
                    <Button
                      // onClick={}
                      disabled={!disabled}
                      onClick={confirm}
                    >
                      Перевести
                    </Button>
                  </div>
                </Modal>

                {/* <Group position="center">
                  <Button fullWidth variant="outline" onClick={open}>
                    Перевод
                  </Button>
                </Group> */}
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
              label={kz ? `Аты` : `Имя`}
              variant="filled"
              value={values.name ?? ''}
              name="name"
              onChange={handleValuesChange}
              readOnly
            />

            <TextInput
              label={kz ? `Тегі` : `Фамилия`}
              variant="filled"
              value={values.surname ?? ''}
              name="surname"
              onChange={handleValuesChange}
              readOnly
            />
            <TextInput
              label="Телефон"
              variant="filled"
              value={values.phone ?? ''}
              name="phone"
              onChange={handleValuesChange}
            />
            <TextInput
              label="Почта"
              variant="filled"
              value={values?.email ?? ''}
              name="email"
              onChange={handleValuesChange}
              readOnly
            />

            <Select
              label={kz ? `Облыс` : `Область`}
              data={regions}
              variant="filled"
              value={values.region ?? ''}
              onChange={(e) => handleValuesChange(e, 'region')}
            />
            <TextInput
              label={kz ? `Мекен-жайы` : `Адрес`}
              variant="filled"
              value={values?.adress ?? ''}
              name="adress"
              onChange={handleValuesChange}
            />
            {/* <DatePickerInput
              label="Дата рождения"
              variant="filled"
              value={values?.birthday ?? new Date()}
              onChange={handleValuesChange}
              locale="ru"
            /> */}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Button compact variant="outline" color="red" onClick={signout}>
              {kz ? 'Шығу' : 'Выйти'}
            </Button>
            <Button onClick={saveUser}>
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
    </>
  )
}
