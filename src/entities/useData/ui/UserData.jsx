import React from 'react'
import { Button, PasswordInput, Select, TextInput } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { cities } from 'shared/lib'
import { useLocation } from 'react-router-dom'
import { useAuth } from 'shared/hooks'
import { Avatar } from './Avatar'

export const UserData = () => {

  const { pathname } = useLocation()

  console.log(window.location.hostname);

  const { user } = useAuth()

  return (
    <div className='w-full'>
      <div className="container">
        <div>
          <Avatar/>
          {/* {false 
            ? <img src="" alt="" /> 
            : <div className='aspect-square h-full bg-slate-300 rounded-primary'></div> 
          } */}
          <div className="grid grid-cols-1 w-full gap-2 mt-5">
            <TextInput
              value={`${window.location.hostname}/3000/signup?id=${user?.id}`}
              readOnly
            />
            <TextInput
              label='ФИО'
            />
            <Select
              data={cities}
              label='Город'
            />
            <DateTimePicker
              label='Дата рождения'
            />
            <PasswordInput
              label='ИИН'
            />
            <TextInput
              label='Почта'
            />
          </div>
          <div className='mt-4 flex justify-end'>
            <Button>
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
