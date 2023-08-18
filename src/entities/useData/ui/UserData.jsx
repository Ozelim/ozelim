import React from 'react'
import {
  Button,
  Group,
  Modal,
  PasswordInput,
  Select,
  TextInput,
} from '@mantine/core'
import { DatePickerInput, DateTimePicker } from '@mantine/dates'
import { cities, formatNumber } from 'shared/lib'
import { useLocation } from 'react-router-dom'
import { useAuth } from 'shared/hooks'
import { UserAvatar } from './UserAvatar'
import { pb } from 'shared/api'
import { CopyBtn } from 'shared/ui'
import { Controller, useForm } from 'react-hook-form'

import { useDisclosure } from '@mantine/hooks'

export const UserData = () => {
  const { pathname } = useLocation()
  const [opened, { open, close }] = useDisclosure(false)
  const { user } = useAuth()
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

  function myRandom(from, to) {
    return Math.round(Math.random() * (to - from + 1) + from)
  }

  const [random1, setRandom1] = React.useState(myRandom(10, 50))
  const [random2, setRandom2] = React.useState(myRandom(1, 7))
  const [answer, setAnswer] = React.useState('?')
  const equal = random1 + random2

  const referal = `${window.location.hostname}:3000/login?id=${user?.id}`

  const [values, setValues] = React.useState({
    name: '',
    surname: '',
    city: '',
    birthday: '',
    iin: '',
    email: '',
  })

  React.useEffect(() => {
    if (user) {
      setValues({
        ...user,
        birthday: new Date(user.birthday),
      })
    }
    pb.collection('users').subscribe(user?.id, function ({ action, record }) {
      setValues({
        ...record,
        birthday: new Date(user.birthday),
      })
    })
  }, [])

  function handleValuesChange(e, name) {
    if (e?.currentTarget) {
      const { name, value } = e?.currentTarget
      setValues({ ...values, [name]: value })
      return
    }
    setValues({ ...values, [name]: e })
  }

  const onSubmit = async (data) => {
    return await pb.collection('transfers').create(data)
  }

  async function saveUser() {
    await pb
      .collection('users')
      .update(user?.id, values)
      .then((res) => {
        console.log(res, 'res')
      })
  }

  return (
    <div className="w-full">
      <UserAvatar />
      <div className="grid grid-cols-1 w-full gap-2 mt-5">
        <div className="border p-3 rounded-primary border-primary-500">
          <div className="flex gap-1 items-center">
            <p className="text text-lg">Баланс:</p>
            <p className="text-lg">{formatNumber(user?.balance)}</p>
            {/* <div className="space-y-2 mt-2">
              <Withdraw />
              <Modal centered opened={opened} onClose={close} title="Перевод">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-2"
                >
                  <Controller
                    name="id"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        placeholder="id"
                        label="Id пользавателя"
                        variant="filled"
                      />
                    )}
                  />
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        placeholder="сумма перевода"
                        label="Сумма"
                        variant="filled"
                      />
                    )}
                  />
                  <Capthca
                    random1={random1}
                    random2={random2}
                    answer={answer}
                    setAnswer={setAnswer}
                  />
                  <ConfirmModal
                    onSubmit={onSubmit}
                    equal={equal}
                    answer={answer}
                  />
                </form>
              </Modal>

              <Group position="center">
                <Button fullWidth variant="outline" onClick={open}>
                  Перевод
                </Button>
              </Group>
            </div> */}
          </div>
          <TextInput
            value={referal}
            readOnly
            variant="filled"
            label="Реферальная ссылка"
            rightSection={<CopyBtn value={referal} />}
          />
          <TextInput
            label="ID"
            variant="filled"
            value={values.id ?? ''}
            onChange={handleValuesChange}
            readOnly
            rightSection={<CopyBtn value={values?.id} />}
          />
          <TextInput
            label="Имя"
            variant="filled"
            value={values.name ?? ''}
            name="name"
            onChange={handleValuesChange}
          />
          <TextInput
            label="Фамилия"
            variant="filled"
            value={values.surname ?? ''}
            name="surname"
            onChange={handleValuesChange}
          />
          <TextInput
            label="Почта"
            variant="filled"
            value={values?.email ?? ''}
            name="email"
            onChange={handleValuesChange}
          />
          <Select
            data={cities}
            label="Город"
            variant="filled"
            value={values.city ?? ''}
            onChange={handleValuesChange}
          />
          <DatePickerInput
            label="Дата рождения"
            variant="filled"
            value={values?.birthday ?? ''}
            onChange={handleValuesChange}
            locale="ru"
          />
          <PasswordInput
            label="ИИН"
            variant="filled"
            value={values?.iin ?? ''}
            onChange={handleValuesChange}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={saveUser}>Сохранить</Button>
        </div>
      </div>
      /
    </div>
  )
}
