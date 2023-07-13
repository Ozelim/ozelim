import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { signupSchema } from '../model/signupSchema'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, NumberInput, PasswordInput, Select, TextInput } from '@mantine/core'
import { cities } from 'shared/lib'
import { useSearchParams } from 'react-router-dom'
import { DatePickerInput, DateTimePicker } from '@mantine/dates'
import { signupWithLink } from '../model/signup'

export const SignupForm = () => {

  const [searchParams] = useSearchParams()

  const { control, handleSubmit, formState: {errors, isSubmitting}, clearErrors } = useForm({
    values: {
      name: '',
      city: '',
      birthday: '',
      iin: '',
      phone: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(signupSchema) 
  })

  function onSubmit (data) {
    signupWithLink({
      ...data, 
      sponsor: searchParams.get('id'),
      passwordConfirm: data.password,
    })
    .then(res => {
      console.log(res, 'succ');
    })
  }

  return (
    <div
      className='bg-white p-4 shadow-md rounded-primary' 
    > 
      <h1 className='text-center font-head text-lg'>Регистрация</h1>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-1 gap-2'
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
              variant='filled'
              disabled={isSubmitting}
              // onChange={() => clearErrors('email')}
            />
          )}
        />
        <Controller
          name='name'
          control={control}
          render={({field}) => (
            <TextInput
              {...field}
              placeholder='Ваше ФИО'
              label='ФИО'
              error={errors.name?.message}
              variant='filled'
              disabled={isSubmitting}
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
              variant='filled'
              disabled={isSubmitting}
            />
          )}
        />
        <Controller
          name='iin'
          control={control}
          render={({field}) => (
            <NumberInput
              {...field}
              placeholder='Ваш ИИН'
              label='ИИН'
              variant='filled'
              disabled={isSubmitting}
              error={errors?.iin?.message}
              hideControls
            />
          )}
        />
        <Controller
          name='birthday'
          control={control}
          render={({field}) => (
            <DateTimePicker
              {...field}
              placeholder='Ваша дата рождения'
              label='Дата рождения'
              error={errors.iin?.message}
              variant='filled'
              disabled={isSubmitting}
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
              variant='filled'
              disabled={isSubmitting}
            />
          )}
        />
        
        <Controller
          name='password'
          control={control}
          render={({field}) => (
            <PasswordInput
              {...field}
              placeholder='Ваш пароль'
              label='Пароль'
              error={errors.password?.message}
              variant='filled'
              disabled={isSubmitting}
            />
          )}
        />
          <Button 
            className='mt-4' 
            type='submit'
            fullWidth
            loading={isSubmitting}
          >
            Зарегистрироваться
          </Button>
      </form>
    </div>
  )
}
