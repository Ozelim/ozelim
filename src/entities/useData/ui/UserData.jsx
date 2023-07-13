import React from 'react'
import { Button, PasswordInput, Select, TextInput } from '@mantine/core'
import { DatePickerInput, DateTimePicker } from '@mantine/dates'
import { cities } from 'shared/lib'
import { useLocation } from 'react-router-dom'
import { useAuth } from 'shared/hooks'
import { UserAvatar } from './UserAvatar'
import { pb } from 'shared/api'
import { CopyBtn } from 'shared/ui'

export const UserData = () => {

  const { pathname } = useLocation()

  const { user } = useAuth()

  const referal = `${window.location.hostname}:3000/login?id=${user?.id}`

  const [values, setValues] = React.useState({
    name: '',
    city: '',
    birthday: '',
    iin: '',
    email: '',
  })

  React.useEffect(() => {
    if (user) {
      setValues({
        ...user,
        birthday: new Date(user.birthday)
      })
    }
    pb.collection('users').subscribe(user.id, function({action, record}) {
      setValues({
        ...record,
        birthday: new Date(user.birthday)
      })
    })
  }, [])

  function handleValuesChange () {

  }

  return (
    <div className='w-full'>
      <div>
        <UserAvatar/>
        <div className="grid grid-cols-1 w-full gap-2 mt-5">
          <TextInput
            value={referal}
            readOnly
            variant='filled'
            label='Реферальная ссылка'
            rightSection={(
              <CopyBtn value={referal}/>
            )}
          />
          <TextInput
            label='ФИО'
            variant='filled'
            value={values.name ?? ''}
            onChange={handleValuesChange}
          />
          <TextInput
            label='Почта'
            variant='filled'
            value={values?.email ?? ''}
            onChange={handleValuesChange}
          />
          <Select
            data={cities}
            label='Город'
            variant='filled'
            value={values.city ?? ''}
            onChange={handleValuesChange}
          />
          <DatePickerInput
            label='Дата рождения'
            variant='filled'
            value={values?.birthday ?? ''}
            onChange={handleValuesChange}
            locale='ru'
          />
          <PasswordInput
            label='ИИН'
            variant='filled'
            value={values?.iin ?? ''}
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
