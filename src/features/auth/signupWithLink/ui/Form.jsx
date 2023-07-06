import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { signupSchema } from '../model/signupSchema'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Select, TextInput } from '@mantine/core'
import { cities } from 'shared/lib'
import { useSearchParams } from 'react-router-dom'

export const Form = () => {

  // const [searchParams] = useSearchParams()

  const { control, handleSubmit, formState: {errors} } = useForm({
    values: {
      email: '',
      password: ''
    },
    // resolver: yupResolver(signupSchema) 
  })

  function onSubmit (data) {
    console.log(data);
    // console.log(searchParams.get('id'));
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-sm mx-auto' 
    >
      <Controller
        name='email'
        control={control}
        render={({field}) => (
          <TextInput
            {...field}
            type='email'
            placeholder='Ваша почта'
            label='Почта'
            error={errors.email?.message}
          />
        )}
      />
      <Controller
        name='name'
        control={control}
        render={({field}) => (
          <TextInput
            {...field}
            placeholder='Ваше имя'
            label='Имя'
            error={errors.name?.message}
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
            label='Почта'
            error={errors.surname?.message}
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
            error={errors.city?.message}
          />
        )}
      />
      <Controller
        name='iin'
        control={control}
        render={({field}) => (
          <TextInput
            {...field}
            placeholder='Ваш ИИН'
            label='ИИН'
            error={errors.iin?.message}
          />
        )}
      />
      
      <Controller
        name='phone'
        control={control}
        render={({field}) => (
          <TextInput
            {...field}
            placeholder='Ваш номер'
            label='Номер телефона'
            error={errors.phone?.message}
          />
        )}
      />
      
      <Controller
        name='password'
        control={control}
        render={({field}) => (
          <TextInput
            {...field}
            placeholder='Ваш пароль'
            label='Пароль'
            error={errors.password?.message}
          />
        )}
      />

      <Button 
        className='mt-4' 
        type='submit'
      >
        Зарегистрироваться
      </Button>

    </form>
  )
}
