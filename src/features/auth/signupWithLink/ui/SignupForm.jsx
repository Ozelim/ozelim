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

  const { control, handleSubmit, setValue, sformState: { errors, isSubmitting}, clearErrors } = useForm({
    values: {
      name: '',
      surname: '',
      city: '',
      birthday: '',
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

  function onChange (name, val) {
    setValue
  }

  return (
    <>
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
                variant='filled'
                disabled={isSubmitting}
                onChange={(e) => onChange('email', e.currentTarget.value)}
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
                variant='filled'
                error={errors.name?.message}
                disabled={isSubmitting}
                onChange={(e) => onChange('name', e.currentTarget.value)}
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
                variant='filled'
                error={errors.surname?.message}
                disabled={isSubmitting}
                onChange={(e) => onChange('surname', e.currentTarget.value)}
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
                variant='filled'
                error={errors.city?.message}
                disabled={isSubmitting}
                onChange={(e) => onChange('city', e)}
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
                variant='filled'
                error={errors.birthday?.message}
                disabled={isSubmitting}
                onChange={(e) => onChange('birthday', e)}
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
                variant='filled'
                error={errors.phone?.message}
                disabled={isSubmitting}
                onChange={(e) => onChange('phone', e.currentTarget.value)}
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
                variant='filled'
                error={errors.password?.message}
                disabled={isSubmitting}
                onChange={(e) => onChange('password', e.currentTarget.value)}
              />
            )}
          />
          {/* <Button 
            className='mt-4' 
            type='button'
            fullWidth
            onClick={handleSubmit(onSubmit)}
            // loading={isSubmitting}
          >
            Зарегистрироваться
          </Button> */}
        </form>
        <Button 
          className='mt-4' 
          type='button'
          fullWidth
          onClick={onSubmit}
          // loading={isSubmitting}
        >
          Зарегистрироваться
        </Button>
      </div>

    </>
  )
}
