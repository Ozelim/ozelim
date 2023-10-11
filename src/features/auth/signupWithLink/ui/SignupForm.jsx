import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { signupSchema } from '../model/signupSchema'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, NumberInput, PasswordInput, Select, TextInput } from '@mantine/core'
import { cities } from 'shared/lib'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DateInput, DatePickerInput, DateTimePicker } from '@mantine/dates'
import { signupWithLink } from '../model/signup'
import { useUtils } from 'shared/hooks'
import { pb } from 'shared/api'

export const SignupForm = () => {

  const navigate = useNavigate() 

  const [searchParams] = useSearchParams()

  const {regions} = useUtils('')

  const [loading, setLoading] = React.useState(false)

  const { control, handleSubmit, setValue, setError, formState: { errors, isSubmitting}, clearErrors } = useForm({
    values: {
      name: '',
      surname: '',
      adress: '',
      region: '',
      // birthday: '',
      phone: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(signupSchema) 
  })

  const [err, setErr] = React.useState('')

  function onSubmit (data) {
    setLoading(true)
    signupWithLink({
      ...data, 
      sponsor: searchParams.get('id'),
      passwordConfirm: data.password,
    })
    .then(async res => {
      await pb.collection('users').authWithPassword(res?.email, data?.password)
      .then(() => {
        navigate('/')
        window.location.reload()
      })
    })
    .catch((err) => {
      setLoading(false)
      if(err?.data?.code === 404) {
        setErr('Данная ссылка недоступна для регистрации')
        return
      }
      if (err?.data?.data?.email?.code === 'validation_invalid_email') {
        setError('email', {message: 'Данная почту уже используется'})
        return
      } 
      if (err === 'unverified') {
        setErr('Данная ссылка недоступна для регистрации')
        return
      }
    })
  }

  function onChange (name, val) {
      setValue(name, val)
      clearErrors(name)
      setErr('')
  }

  return (
    <>
      <div
        className='bg-white p-4 shadow-md rounded-primary' 
      > 
        <h1 className='text-center font-head text-lg'>Регистрация</h1>
        <form 
          // onSubmit={handleSubmit(onSubmit)}
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
          <div className='grid grid-cols-2 gap-4'>
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
          </div>
          <Controller
            name='region'
            control={control}
            render={({field}) => (
              <Select
                {...field}
                data={regions}
                placeholder='Ваша область'
                label='Область'
                variant='filled'
                error={errors.region?.message}
                disabled={isSubmitting}
                onChange={(e) => onChange('region', e)}
              />
            )}
          />
          <Controller
            name='adress'
            control={control}
            render={({field}) => (
              <TextInput
                {...field}
                placeholder='г. Астана, Улы дала 3, 77'
              label='Адрес'
                variant='filled'
                error={errors.adress?.message}
                disabled={isSubmitting}
                onChange={(e) => onChange('adress', e.currentTarget.value)}
              />
            )}
          />
          {/* <Controller
            name='birthday'
            control={control}
            render={({field}) => (
              <DateInput
                {...field}
                placeholder='Ваша дата рождения'
                label='Дата рождения'
                variant='filled'
                error={errors.birthday?.message}
                disabled={isSubmitting}
                onChange={(e) => onChange('birthday', e)}
                locale='ru'
              />
            )}
          /> */}
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

          {err && (
            <p className='text-red-500 text-sm mt-4'>{err}</p>
          )}
          <Button 
            className='mt-4' 
            // type='submit'
            fullWidth
            onClick={handleSubmit(onSubmit)}
            loading={isSubmitting || loading}
          >
            Зарегистрироваться 
          </Button>
        </form>
      </div>
    </>
  )
}
