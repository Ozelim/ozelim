import React from 'react'
import { Button, PasswordInput, TextInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { loginSchema } from '../model/loginSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginWithEmail } from '../model/login'

export const LoginForm = () => {

  const { control, handleSubmit, formState: {errors, isSubmitting} } = useForm({
    values: {
      email: '',
      password: ''
    },
    resolver: yupResolver(loginSchema) 
  })


  const onSubmit = data => {
    loginWithEmail(data)
    .then(res => {
      console.log(res);
    })
  }

  return (
    <div className='bg-white p-4 shadow-md rounded-primary'> 
      <h1 className='text-center font-head text-lg'>Вход</h1>
      <form 
        className='grid grid-cols-1 gap-2'
        onSubmit={handleSubmit(onSubmit)}
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
          <Button 
            className='mt-4' 
            type='submit'
            fullWidth
            loading={isSubmitting}
          >
            Войти
          </Button>
      </form>
    </div>
  )
}
