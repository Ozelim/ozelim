import React from 'react'
import { Button, PasswordInput, Select, TextInput } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { cities } from 'shared/lib'
import { useLocation } from 'react-router-dom'
import { useAuth } from 'shared/hooks'
import { Avatar } from './Avatar'

export const UserData = () => {

  const { pathname } = useLocation()

  const { user } = useAuth()
  
  const [values, setValues] = React.useState({
    fio: '',
    city: '',
    birthday: '',
    iin: '',
    email: '',
  })

  function handleValuesChange () {

  }

  return (
    <div className='w-full'>
      <div>
        <Avatar/>

        <div className="grid grid-cols-1 w-full gap-2 mt-5">
          <TextInput
            value={`${window.location.hostname}:3000/login?id=${user?.id}`}
            readOnly
            variant='filled'
          />
          <TextInput
            label='ФИО'
            variant='filled'
            value={values.fio}
            onChange={handleValuesChange}
          />
          <Select
            data={cities}
            label='Город'
            variant='filled'
            // value={values.city}
            onChange={handleValuesChange}
          />
          <DateTimePicker
            label='Дата рождения'
            variant='filled'
            value={values?.birthday}
            onChange={handleValuesChange}
          />
          <PasswordInput
            label='ИИН'
            variant='filled'
            value={values?.iin}
            onChange={handleValuesChange}
          />
          <TextInput
            label='Почта'
            variant='filled'
            value={values?.email}
            onChange={handleValuesChange}
          />
        </div>
        <div className='mt-4 flex justify-end'>
          <Button>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  )
}
