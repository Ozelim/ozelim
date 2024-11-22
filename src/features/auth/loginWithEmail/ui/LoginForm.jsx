import React from 'react'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { loginSchema } from '../model/loginSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginWithEmail } from '../model/login'
import { Link, useSearchParams } from 'react-router-dom'
import { pb } from 'shared/api'

export const LoginForm = ({auth, onComplete, fail}) => {

  const [loading, setLoading] = React.useState(false)

  const [params, setParams] = useSearchParams()

  const { control, handleSubmit, formState: {errors, isSubmitting, isLoading} } = useForm({
    values: {
      email: '',
      password: ''
    },
    resolver: yupResolver(loginSchema) 
  })

  const [error, setError] = React.useState('')

  const onSubmit = data => {
    setLoading(true)
    loginWithEmail(data)
    .then(res => {
      onComplete(res)
      console.log(res);
    })
    .catch(err => {
      setError('Неверные данные')
      console.log(err, 'asd');
    })
    .finally(() => {
      setLoading(false)
    })
  }

  function goToForgotPassword () {
    params.set(auth ? 'agent' : 'user', true)
    params.set('reset', true)
    setParams(params)
  }

  return (
    <div className='bg-white p-4 shadow-md rounded-primary'> 
      <h1 className='text-center font-head text-lg'>Вход</h1>
      <form 
        className='grid grid-cols-1 gap-2'
        onSubmit={handleSubmit(auth ? auth : onSubmit)}
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
        {fail && (
          <p className='text-red-500 text-sm mt-4'>{fail}</p>
        )}
        {error && (
          <p className='text-red-500 text-sm mt-4'>{error}</p>
        )}
        <p onClick={goToForgotPassword} className='underline text-gray-500 text-sm mt-4'>Восстановить пароль</p>
        <Button 
          className='mt-4' 
          type='submit'
          fullWidth
          loading={loading}
          color={auth ? 'orange' : 'teal'}
        >
          Войти
        </Button>
      </form>
    </div>
  )
}
