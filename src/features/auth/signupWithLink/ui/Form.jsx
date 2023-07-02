import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { signupSchema } from '../model/signupSchema'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Select, TextInput } from '@mantine/core'
import { cities } from 'shared/lib'

export const Form = () => {

  const { control, handleSubmit, formState: {errors} } = useForm({
    values: {
      email: '',
      password: ''
    },
    resolver: yupResolver(signupSchema) 
  })

  return (
    <div>
      <Controller
        name='name'
        control={control}
        render={({field}) => (
          <TextInput
            {...field}
            placeholder='Ваше имя'
            label='Имя'
            error={errors.name}
          />
        )}
      />
      
      <Controller
        name='surname'
        control={control}
        render={({field}) => (
          <TextInput
            {...field}
            placeholder='Ваша фамилия'
            label='Фамилия'
            error={errors.surname}
          />
        )}
      />
      <Controller
        name='city'
        control={control}
        render={({field}) => (
          <Select
            {...field}
            data={cities}
            placeholder='Ваш город'
            label='Город'
            error={errors.city}
          />
        )}
      />

      <Button>
        asdasd
      </Button>
      <button className='rounded-primary bg-black'>
        asdasd
      </button>
      
    </div>
  )
}
